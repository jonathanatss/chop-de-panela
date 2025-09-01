const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Message = require('../models/Message');

// Rota pública para criar mensagem
router.post('/', async (req, res) => {
  try {
    const newMessage = new Message({ ...req.body });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
});

// Rotas privadas para gerenciar mensagens
router.get('/', auth, async (req, res) => {
  try {
    const messages = await Message.find().sort({ date: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
});

router.patch('/read/:id', auth, async (req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (!message) {
            return res.status(404).json({ msg: 'Mensagem não encontrada' });
        }
        message.read = true;
        await message.save();
        res.json(message);
    } catch (err) {
        res.status(500).send('Erro no servidor');
    }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Mensagem removida' });
  } catch (err) {
    res.status(500).send('Erro no servidor');
  }
});

module.exports = router;