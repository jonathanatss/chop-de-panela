const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const WishlistItem = require('../models/WishlistItem');

// ROTA PÚBLICA: Listar todos os itens
router.get('/', async (req, res) => {
  try {
    const items = await WishlistItem.find();
    const sortedItems = items.sort((a, b) => a.isFullyFunded - b.isFullyFunded);
    res.json(sortedItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});


// --- ROTAS PRIVADAS (ADMIN) ---

// ROTA ADICIONADA: Para o admin registrar uma contribuição manualmente
router.post('/:id/add-manual-contribution', auth, async (req, res) => {
  try {
    const { name, amount } = req.body;
    const contributionAmount = parseFloat(amount);

    if (!name || !amount) {
      return res.status(400).json({ msg: 'Nome e valor são obrigatórios.' });
    }

    const item = await WishlistItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ msg: 'Item não encontrado.' });
    }

    item.contributors.push({ name, amount: contributionAmount });
    
    // Atualiza o status se o item foi totalmente financiado
    if (item.amountContributed >= item.price) {
        item.purchased = true;
        item.purchaseDate = new Date();
        // Agrega o nome do contribuinte ao campo 'purchasedBy'
        item.purchasedBy = item.purchasedBy ? `${item.purchasedBy}, ${name}` : name;
    }

    await item.save();
    res.json(item);

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});


router.post('/', auth, async (req, res) => {
  try {
    const newItemData = { ...req.body, contributors: [] };
    const newItem = new WishlistItem(newItemData);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Erro no servidor' });
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
    console.error(err.message);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await WishlistItem.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Item removido' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Erro no servidor' });
  }
});

module.exports = router;