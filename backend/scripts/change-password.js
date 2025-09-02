const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const changePassword = async () => {
  const [email, newPassword] = process.argv.slice(2);

  if (!email || !newPassword) {
    console.error('Por favor, forneça o email do usuário e a nova senha.');
    console.log('Exemplo: npm run user:password -- seu@email.com novaSenhaSuperForte');
    process.exit(1);
  }

  try {
    if (!process.env.MONGO_URI) throw new Error('MONGO_URI não definida no .env');
    await mongoose.connect(process.env.MONGO_URI);

    const user = await User.findOne({ email });
    if (!user) {
      console.error(`Usuário com o email "${email}" não encontrado.`);
      mongoose.connection.close();
      process.exit(1);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    user.password = hashedPassword;
    await user.save();
    console.log(`✅ Senha do usuário "${email}" alterada com sucesso!`);

  } catch (error) {
    console.error('❌ Erro ao alterar a senha:', error.message);
  } finally {
    mongoose.connection.close();
  } 
};

changePassword();
// Uso: node backend/scripts/editadmin.js "email@exemplo.com" "novaSenhaSuperForte"