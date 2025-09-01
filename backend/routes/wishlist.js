const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
// CORREÇÃO: Alterado de 'WishListItem' para 'WishlistItem' para corresponder ao nome do ficheiro
const WishlistItem = require('../models/WishlistItem');
const { qrcodePix } = require('qrcode-pix');

// ROTA PÚBLICA: Listar todos os itens
router.get('/', async (req, res) => {
  try {
    const items = await WishlistItem.find();
    const sortedItems = items.sort((a, b) => a.isFullyFunded - b.isFullyFunded);
    res.json(sortedItems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

// ROTA PÚBLICA: Adicionar uma contribuição (cota) a um item
router.post('/:id/contribute', async (req, res) => {
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

        const amountRemaining = item.amountRemaining;
        if (contributionAmount > amountRemaining) {
            return res.status(400).json({ msg: `O valor da contribuição não pode exceder o valor restante de ${amountRemaining.toFixed(2)} €.` });
        }
        
        const minContribution = item.price * 0.10;
        if (contributionAmount < minContribution && contributionAmount < amountRemaining) {
             return res.status(400).json({ msg: `A contribuição mínima é de 10% (${minContribution.toFixed(2)} €).` });
        }

        item.contributors.push({ name, amount: contributionAmount });
        await item.save();

        const pixPayload = qrcodePix({
            version: '01',
            key: process.env.PIX_KEY || 'sua-chave-pix-aqui',
            name: process.env.PIX_NAME || 'Nome do Beneficiário',
            city: process.env.PIX_CITY || 'CIDADE',
            transactionId: item.id.slice(-25), // ID da transação para o PIX
            message: `Presente para ${process.env.BRIDE_NAMES || 'o casal'}`,
            value: contributionAmount,
        });

        res.json({
            updatedItem: item,
            pixPayload: pixPayload
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
});

// --- ROTAS PRIVADAS (ADMIN) ---

router.post('/', auth, async (req, res) => {
  try {
    const newItemData = { ...req.body, contributors: [] };
    const newItem = new WishlistItem(newItemData);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error(err.message);
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
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await WishlistItem.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Item removido' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
});

module.exports = router;

