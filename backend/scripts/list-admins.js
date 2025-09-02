const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const mongoose = require('mongoose');
const User = require('../models/User');

const listUsers = async () => {
  try {
    if (!process.env.MONGO_URI) throw new Error('MONGO_URI não definida no .env');
    await mongoose.connect(process.env.MONGO_URI);

    // Busca todos os usuários, selecionando apenas os campos 'name' e 'email'
    const users = await User.find({}, 'name email');

    if (users.length === 0) {
      console.log('Nenhum usuário administrador encontrado no banco de dados.');
      return;
    }

    console.log('--- Lista de Administradores ---');
    users.forEach(user => {
      console.log(`Nome: ${user.name}, Email: ${user.email}`);
    });
    console.log('---------------------------------');

  } catch (error) {
    console.error('❌ Erro ao listar usuários:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

listUsers();