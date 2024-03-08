const { Product } = require("../../models");
const { HttpError } = require("../../helpers");
const getAllProducts = require("./getAllProducts");

const filteredProducts = async (req, res) => {
  try {
    const { keyword, category, recommended } = req.query;
    const userBloodType = req.user.blood;

    const baseQuery = {};

    if (!baseQuery) {
      getAllProducts();
    }

    if (keyword) {
      baseQuery.$text = { $search: keyword };
    }
    if (category) {
      baseQuery.category = category;
    }
    if (recommended !== undefined) {
      baseQuery[`groupBloodNotAllowed.${userBloodType}`] =
        recommended === "true";
    }

    const products = await Product.find(baseQuery);

    res.status(200).json({
      products,
    });
  } catch (error) {
    throw HttpError(500, "Internal Server Error");
  }
};

module.exports = filteredProducts;

// const filteredProducts = async (req, res) => {
//   const { category, search, recommended } = req.query;
//   const where = {};

//   if (category) {
//     where.category = category;
//   }
//   if (search) {
//     where.title = { $regex: search, $options: "i" };
//   }

//   if (recommended) {
//     const { user: id } = req;
//     const user = await User.findById(id);
//     const bloodType = user.bodyParams.blood;
//     if (!bloodType) {
//       throw HttpError(404);
//     }

//     if (recommended === "true") {
//       where[`groupBloodNotAllowed.${bloodType}`] = true;
//     } else {
//       where[`groupBloodNotAllowed.${bloodType}`] = false;
//     }
//   }
//   const { page = 1, limit = 100 } = req.query;
//   const total = await Product.find(where).count();
//   const products = await Product.find(where)
//     .limit(limit)
//     .skip(limit * (page - 1));
//   if (!products) {
//     throw HttpError(400);
//   }
//   res.json({
//     total,
//     page,
//     limit,
//     products,
//   });
// };

// // module.exports = filteredProducts;

// const filteredProducts = async (req, res) => {
//   try {
//     const userBloodType = req.user.blood;

//     const recommendedProducts = await Product.find({
//       $or: [
//         { [`groupBloodNotAllowed.${userBloodType}`]: { $exists: false } },
//         { [`groupBloodNotAllowed.${userBloodType}`]: false },
//       ],
//     });

//     const notRecommendedProducts = await Product.find({
//       [`groupBloodNotAllowed.${userBloodType}`]: true,
//     });

//     res.status(200).json({
//       recommendedProducts,
//       notRecommendedProducts,
//     });
//   } catch (error) {
//     throw HttpError(500, "Internal Server Error");
//   }
// };

// module.exports = filteredProducts;

// const filteredProducts = async (req, res) => {
//   try {
//     const userBloodType = req.user.blood;
//     const keyWord = req.query.keyword;

//     const recommendedProducts = await Product.find({
//       $and: [
//         { name: { $regex: keyWord, $options: "i" } },
//         {
//           $or: [
//             { [`groupBloodNotAllowed.${userBloodType}`]: { $exists: false } },
//             { [`groupBloodNotAllowed.${userBloodType}`]: false },
//           ],
//         },
//       ],
//     });

//     const notRecommendedProducts = await Product.find({
//       $and: [
//         { name: { $regex: keyWord, $options: "i" } },
//         { [`groupBloodNotAllowed.${userBloodType}`]: true },
//       ],
//     });

//     res.status(200).json({
//       recommendedProducts,
//       notRecommendedProducts,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };

// module.exports = filteredProducts;
