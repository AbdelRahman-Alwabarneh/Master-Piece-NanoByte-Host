const nodemailer = require('nodemailer');
const Contacts = require("../Models/ContactModels");


exports.GetContacts = async (req, res) => {
    try {
        // الحصول على الصفحة والحد الافتراضي
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        // حساب العدد المراد تخطيه بناءً على الصفحة الحالية والحد
        const skip = (page - 1) * limit;

        // حساب العدد الإجمالي والبيانات مع الباجينيشن
        const totalCount = await Contacts.countDocuments();
        const contactsData = await Contacts.find()
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            contactsData,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
            totalItems: totalCount,
            totalCount,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// كنترولر لتعديل الرد وإرسال البريد الإلكتروني
exports.updateAdminReplyAndSendEmail = async (req, res) => {
  const { adminReply, emailSubject } = req.body;
  const contactId = req.params.messageId
  try {
    // التحقق من البيانات المرسلة
    if (!adminReply || !emailSubject || !contactId) {
      return res.status(400).json({ message: 'يرجى إرسال جميع البيانات المطلوبة' });
    }

    // تحديث الرد وحالة الرسالة
    const updatedContact = await Contacts.findByIdAndUpdate(
      contactId,
      {
        adminReply,
        status: 'تم الرد',
      },
      { new: true } // لإرجاع الوثيقة المحدثة
    );

    if (!updatedContact) {
      return res.status(404).json({ message: 'التواصل غير موجود' });
    }

    // إعداد nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // أو أي خدمة بريد تستخدمها
      auth: {
        user: 'nanobytehost@gmail.com', // ضع بريدك الإلكتروني هنا
        pass: process.env.PASSWORD_SEND_EMAIL, // ضع كلمة مرور بريدك الإلكتروني هنا
      },
    });

    // رسالة البريد الإلكتروني
    const mailOptions = {
      from: 'nanobytehost@gmail.com', // بريد المرسل
      to: updatedContact.email, // بريد المستخدم
      subject: emailSubject, // عنوان الرسالة
      text: adminReply, // محتوى الرسالة
    };

    // إرسال البريد الإلكتروني
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: 'تم تحديث الرد وإرسال البريد الإلكتروني بنجاح',
      updatedContact,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'حدث خطأ أثناء العملية' });
  }
};

