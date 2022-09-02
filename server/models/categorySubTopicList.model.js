const mongoose = require('mongoose');

// const categorySubTopicListSProductchema = new mongoose.Schema({
//   pName: String,
//   id: Number,
// });

const categorySubTopicListSchema = new mongoose.Schema({
  categoryName: String,
  categorySubTopicList: {
    type: Array,
    default: [{ pName: String, id: Number }],
  },
  products: {
    type: Array,
    default: [
      {
        pName: String,
        pDesc: String,
        pWeight: String,
        price: Number,
        rating: Number,
        discount: String,
        img: String,
        id: Number,
        quantity: Number,
        addedToCart: Boolean,
        addedToWishlist: Boolean,
      },
    ],
  },
});

module.exports = mongoose.model(
  'categorySubTopicList',
  categorySubTopicListSchema
);
