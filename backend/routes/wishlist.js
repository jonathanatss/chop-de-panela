const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const WishlistItem = require('../models/WishlistItem');
const nodemailer = require("nodemailer");

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

router.post('/contribution/send-confirm-email', async (req, res) => {
  const contributorName = req.body.contributorName;
  const contributionAmount = req.body.contributionAmount;
  const wishListItem = req.body.wishListItem;

  const result = await sendConfirmEmail(contributorName, contributionAmount, wishListItem);

  if (result){
    res.json({ message: "E-mail enviado com sucesso" });
  }else{
    res.status(500).json({ error: "Erro ao enviar e-mail" });
  }
});

const sendConfirmEmail = async (contributorName, contributionAmount, wishListItem) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Chá de Panela" <${process.env.EMAIL_USER}>`,
      to: "cayobe6166@lespedia.com",
      subject: "Nova contribuição recebida 🎁",
      text: `O convidado ${contributorName} contribuiu com R$${contributionAmount} para o item: ${wishListItem.name}.`,
    });

    return true;
  } catch (error) {
    return false;
  }
}

module.exports = router;