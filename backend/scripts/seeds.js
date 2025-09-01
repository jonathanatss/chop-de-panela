const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Settings = require('../models/Settings');
const WishlistItem = require('../models/WishlistItem'); // Nome do modelo corrigido

const initialEventInfo = {
    brideNames: 'Jonathan & Sara',
    eventDate: '2025-06-15',
    eventTime: '15:00',
    eventLocation: 'Green Club III - Salão de Festas',
    eventAddress: 'Avenida das Américas, 500',
    pixKey: '84999935383',
    pixName: 'JONATHAN ALBERTO TOLEDO SILVA',
    aboutText: 'Estamos muito felizes em compartilhar este momento especial com vocês! Nosso chá de panela será um momento de celebração e união antes do grande dia.',
    heroImage: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1280&fit=crop'
};

const initialWishlist = [
    { name: 'Jogo de Panelas Antiaderente', description: 'Conjunto com 5 panelas de alta qualidade', price: 299.90, image: 'https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'Cozinha', contributors: [] },
    { name: 'Liquidificador Premium', description: 'Liquidificador de alta potência com 12 velocidades', price: 189.90, image: 'https://images.pexels.com/photos/7937472/pexels-photo-7937472.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'Eletrodomésticos', contributors: [{name: "Maria Silva", amount: 189.90}] },
    { name: 'Jogo de Toalhas de Banho', description: 'Kit com 4 toalhas 100% algodão', price: 149.90, image: 'https://images.pexels.com/photos/6086473/pexels-photo-6086473.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'Casa de Banho', contributors: [] },
];

const seedDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('A variável MONGO_URI não foi definida no arquivo .env');
        }
        await mongoose.connect(process.env.MONGO_URI);

        console.log('Limpando dados antigos...');
        await User.deleteMany({});
        await Settings.deleteMany({});
        await WishlistItem.deleteMany({});

        console.log('Criando usuário admin...');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);
        await User.create({
            name: 'Administrador',
            email: 'admin@chadepanela.com',
            password: hashedPassword
        });

        console.log('Criando configurações iniciais...');
        await Settings.create(initialEventInfo);

        console.log('Criando lista de desejos inicial...');
        await WishlistItem.insertMany(initialWishlist);

        console.log('Banco de dados populado com sucesso!');
    } catch (error) {
        console.error('Erro ao popular o banco de dados:', error);
    } finally {
        mongoose.connection.close();
    }
};

seedDB();
