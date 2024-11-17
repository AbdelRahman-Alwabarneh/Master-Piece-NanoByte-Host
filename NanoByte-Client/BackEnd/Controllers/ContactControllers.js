const Contact = require('../Models/ContactModels'); // استيراد السكيما

exports.createContact = async (req, res) => {
  try {
    const { name, email, description } = req.body;

    // التحقق من الحقول المطلوبة
    if (!name || !email || !description) {
      return res.status(400).json({
        message: "Name, email, and description are required",
      });
    }

    // إنشاء مستند جديد
    const newContact = await Contact.create({
      name,
      email,
      description,
    });

    res.status(201).json({
      message: "Contact created successfully",
      contact: newContact,
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({
      message: "Failed to create contact",
      error: error.message,
    });
  }
};
