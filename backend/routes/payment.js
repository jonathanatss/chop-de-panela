const express = require('express');
const router = express.Router();
const { MercadoPagoConfig, Preference } = require('mercadopago');
const WishlistItem = require('../models/WishlistItem');

router.post('/create-preference', async (req, res) => {
  try {
    // Validação crucial para garantir que o token foi carregado do .env
    if (!process.env.MERCADO_PAGO_TOKEN || process.env.MERCADO_PAGO_TOKEN === 'SEU_ACCESS_TOKEN_AQUI') {
      console.error('ERRO FATAL: MERCADO_PAGO_TOKEN não está configurado corretamente no arquivo backend/.env');
      return res.status(500).json({ msg: 'O servidor não está configurado para processar pagamentos.' });
    }

    // Inicializa o cliente DENTRO da rota para garantir que o token mais recente seja usado
    const client = new MercadoPagoConfig({ accessToken: process.env.MERCADO_PAGO_TOKEN });

    const { itemId, amount, contributorName } = req.body;

    const item = await WishlistItem.findById(itemId);
    if (!item) {
      return res.status(404).json({ msg: 'Item da lista não encontrado.' });
    }

    const preferenceBody = {
      items: [
        {
          id: item.id,
          title: `Contribuição para: ${item.name}`,
          description: `Presente de ${contributorName} para o Chá de Panela.`,
          quantity: 1,
          unit_price: Number(amount),
          currency_id: 'BRL',
        },
      ],
      back_urls: {
        // URLs para onde o usuário será redirecionado após o pagamento
        success: 'http://localhost:5173', // Altere para a URL do seu site em produção
        failure: 'http://localhost:5173',
        pending: 'http://localhost:5173',
      },
      // auto_return foi removido para maior compatibilidade em desenvolvimento.
      // O usuário será redirecionado para a tela de sucesso do Mercado Pago e poderá voltar manualmente.
    };

    const preference = new Preference(client);
    const result = await preference.create({ body: preferenceBody });

    res.json({
      preferenceId: result.id,
      init_point: result.init_point, // A URL de checkout que usaremos no frontend
    });

  } catch (error) {
    console.error('Erro ao criar preferência de pagamento:', error);
    // Retorna uma mensagem de erro mais clara para o frontend
    const errorMessage = error.cause ? error.cause.message : 'Falha ao se comunicar com o gateway de pagamento.';
    res.status(500).json({ msg: errorMessage });
  }
});

module.exports = router;