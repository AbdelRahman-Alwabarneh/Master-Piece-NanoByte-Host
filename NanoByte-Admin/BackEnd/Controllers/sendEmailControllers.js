const nodemailer = require('nodemailer');
const EmailTemplate = require('../Models/emailTemplate');
const UsersData = require('../Models/usersModels');
const emailLog = require('../Models/emailLogModels');

exports.sendEmail = async (req, res) => {
    try {
        const { id, serviceData, userId } = req.body;

        // جلب قالب البريد الإلكتروني
        const template = await EmailTemplate.findById(id);
        if (!template) return res.status(404).json({ message: "Template not found" });

        const userdata = await UsersData.findById(userId);

        // دالة لمعالجة النص واستبدال المتغيرات
        const processTemplate = (text, data) =>
            text.replace(/\{\$([\w.]+)\}/g, (_, path) => {
                const value = path.split('.').reduce((acc, key) => acc?.[key], data);
                return value != null && value !== '' ? value : ''; // ترجع فارغ إذا لم تكن القيمة متاحة أو فارغة
            });

        // دمج البيانات المتاحة ومعالجة نص البريد الإلكتروني
        const processedEmailBody = processTemplate(template.emailBody, { serviceData, userdata, ...req.body });
        const processedEmailSubject = processTemplate(template.emailSubject, { serviceData, userdata, ...req.body });

        // إضافة CSS مع دعم كل الاتجاهات والمحاذاة
        const emailContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                /* Reset styles */
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }
                /* Container styles */
                .email-container {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 5px;
                }
                /* Quill specific alignments */
                .ql-align-right { 
                    text-align: right !important;
                    direction: rtl !important;
                }
                .ql-align-left { 
                    text-align: left !important;
                    direction: ltr !important;
                }
                .ql-align-center { 
                    text-align: center !important;
                }
                .ql-direction-rtl {
                    direction: rtl !important;
                }
                /* Default paragraph styling */
                p {
                    margin-bottom: 1em;
                    white-space: pre-wrap;
                    text-align: inherit;
                    direction: inherit;
                }
                /* Preserve RTL/LTR formatting */
                [dir="rtl"] {
                    direction: rtl !important;
                    text-align: right !important;
                }
                [dir="ltr"] {
                    direction: ltr !important;
                    text-align: left !important;
                }
                /* Additional text formatting */
                strong { font-weight: bold; }
                /* Table alignments */
                table {
                    direction: inherit;
                    text-align: inherit;
                }
                /* Lists alignment */
                ul, ol {
                    text-align: inherit;
                    direction: inherit;
                    padding-left: 20px;
                    padding-right: 20px;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                ${processedEmailBody}
            </div>
        </body>
        </html>
        `;

        // إعدادات النقل باستخدام nodemailer
        // const transporter = nodemailer.createTransport({
        //     host: 'smtp.mailtrap.io', 
        //     port: 587, 
        //     secure: false,
        //     debug: true, 
        //     auth: {
        //         user: '4a0de4f047b4fa', 
        //         pass: 'ab1cec9204d7ca'
        //     }
        // });
        const transporter = nodemailer.createTransport({
            service: 'gmail', // أو أي خدمة بريد تستخدمها
            auth: {
              user: 'nanobytehost@gmail.com', // ضع بريدك الإلكتروني هنا
              pass: process.env.PASSWORD_SEND_EMAIL, // ضع كلمة مرور بريدك الإلكتروني هنا
            },
          });
        // إعداد بيانات الإيميل
        const mailOptions = {
            from: `"${template.senderName}" <${template.senderEmail}>`,
            to: userdata.email,
            subject: processedEmailSubject,
            html: emailContent,
            headers: {
                'Content-Type': 'text/html; charset=UTF-8'
            }
        };

        // إرسال الإيميل
        const info = await transporter.sendMail(mailOptions);

        // إنشاء السجل
        const newEmailLog = await emailLog.create({
            userId,
            emailSubject: processedEmailSubject,
            emailBody: emailContent,
            senderName: template.senderName,
            senderEmail: template.senderEmail
        });

        res.status(200).json({
            success: true,
            message: 'Email sent successfully',
            info: info.response,
            EmailLog: newEmailLog._id,
            template: { ...template.toObject(), emailBody: processedEmailBody, emailSubject: processedEmailSubject }
        });

    } catch (error) {
        console.error('Error processing email template:', error);
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};