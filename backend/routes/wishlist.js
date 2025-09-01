const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const WishlistItem = require('../models/WishListItem');

// ROTAS PÚBLICAS
router.get('/', async (req, res) => {
  try {
    const items = await WishlistItem.find().sort({ purchased: 1, price: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
});

router.patch('/purchase/:id', async (req, res) => {
    try {
        const { buyerName } = req.body;
        if (!buyerName) {
            return res.status(400).json({ msg: 'O nome do comprador é obrigatório.' });
        }
        const item = await WishlistItem.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ msg: 'Item não encontrado.' });
        }
        if (item.purchased) {
            return res.status(400).json({ msg: 'Este item já foi presenteado.' });
        }
        item.purchased = true;
        item.purchasedBy = buyerName;
        item.purchaseDate = new Date();
        await item.save();
        res.json(item);
    } catch (err) {
        res.status(500).send('Erro no servidor');
    }
});

// ROTAS PRIVADAS (ADMIN)
router.post('/', auth, async (req, res) => {
  try {
    const newItem = new WishlistItem({ ...req.body });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const item = await WishlistItem.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(item);
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await WishlistItem.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Item removido' });
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
});

module.exports = router;