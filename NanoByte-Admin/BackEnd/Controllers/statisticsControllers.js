const Order = require("../Models/ordersModels");
const Users = require("../Models/usersModels");
const Contacts = require("../Models/ContactModels");

exports.getStatistics = async (req, res) => {
  try {
    const [pendingCount, usersCount, contactsCount] = await Promise.all([
      Order.countDocuments({ orderStatus: "Pending" }),
      Users.countDocuments(),
      Contacts.countDocuments({ status: "قيد الانتظار" }),
    ]);

    res.status(200).json({
      allStatistics: { pendingCount, usersCount, contactsCount },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error occurred while retrieving statistics.",
      error: error.message,
    });
  }
};
