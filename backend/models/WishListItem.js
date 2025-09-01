const mongoose = require('mongoose');

const ContributionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

const WishlistItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  contributors: [ContributionSchema] // Campo alterado
});

WishlistItemSchema.set('toJSON', {
  virtuals: true, // Garante que os campos virtuais sejam incluídos no JSON
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

// Campo virtual para calcular o total já contribuído
WishlistItemSchema.virtual('amountContributed').get(function() {
  return this.contributors.reduce((total, contributor) => total + contributor.amount, 0);
});

// Campo virtual para calcular o valor restante
WishlistItemSchema.virtual('amountRemaining').get(function() {
  return this.price - this.amountContributed;
});

// Campo virtual para saber se o item foi totalmente presenteado
WishlistItemSchema.virtual('isFullyFunded').get(function() {
  return this.amountRemaining <= 0;
});

module.exports = mongoose.model('WishlistItem', WishlistItemSchema);