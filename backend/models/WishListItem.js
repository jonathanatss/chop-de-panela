const mongoose = require('mongoose');

const WishlistItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  purchased: { type: Boolean, default: false },
  purchasedBy: { type: String, default: '' },
  purchaseDate: { type: Date },
});

WishlistItemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('WishlistItem', WishlistItemSchema);