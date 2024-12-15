import User from "../models/userModel.js";
import Order from "../models/orderModel.js";


const getMonthlyUserRegistrations = async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          year: '$_id.year',
          month: '$_id.month',
          count: '$count',
        },
      },
      {
        $sort: {
          year: 1,
          month: 1,
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
    throw error;
  }
};

const getMonthlyOrderRegistrations = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          year: '$_id.year',
          month: '$_id.month',
          count: '$count',
        },
      },
      {
        $sort: {
          year: 1,
          month: 1,
        },
      },
    ]);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
    throw error;
  }
};

export {
    getMonthlyUserRegistrations,
    getMonthlyOrderRegistrations
};

// // Example usage
// getMonthlyUserRegistrations()
//   .then((result) => {
//     console.log('Monthly user registrations:', result);
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });
