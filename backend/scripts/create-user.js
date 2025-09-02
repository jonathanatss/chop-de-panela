const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createUser = async () => {
  const [name, email, password] = process.argv.slice(2);

  if (!name || !email || !password) {
    console.error('Por favor, forneça nome, email e senha.');
    console.log('Exemplo: npm run user:create -- "Seu Nome" seu@email.com senha123');
    process.exit(1);
  }

  try {
    if (!process.env.MONGO_URI) throw new Error('MONGO_URI não definida no .env');
    await mongoose.connect(process.env.MONGO_URI);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.error(`O usuário com o email "${email}" já existe.`);
      mongoose.connection.close();
      process.exit(1);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    await User.create({ name, email, password: hashedPassword });
    console.log(`✅ Usuário "${name}" criado com sucesso!`);

  } catch (error) {
    console.error('❌ Erro ao criar usuário:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

createUser();
