const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const mongoose = require('mongoose');
const User = require('../models/User');

const deleteUser = async () => {
  const [email] = process.argv.slice(2);

  if (!email) {
    console.error('Por favor, forneça o email do usuário a ser deletado.');
    console.log('Exemplo: npm run user:delete -- email.para.deletar@exemplo.com');
    process.exit(1);
  }

  try {
    if (!process.env.MONGO_URI) throw new Error('MONGO_URI não definida no .env');
    await mongoose.connect(process.env.MONGO_URI);

    const result = await User.deleteOne({ email });
    if (result.deletedCount === 0) {
      console.warn(`⚠️ Usuário com o email "${email}" não encontrado.`);
    } else {
      console.log(`✅ Usuário "${email}" deletado com sucesso!`);
    }

  } catch (error) {
    console.error('❌ Erro ao deletar usuário:', error.message);
  } finally {
    mongoose.connection.close();
  }
};

deleteUser();
// Uso: node backend/scripts/deleteadmin.js "email@exemplo.com"