const path = require('path');
const readline = require('readline');

// Carrega as variáveis de ambiente a partir da raiz do backend
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const { sequelize, User } = require('../src/models');

/**
 * Interface interativa via terminal
 */
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => {
  return new Promise((resolve) => rl.question(query, (ans) => resolve(ans.trim())));
};

// Parser simples para argumentos CLI (suporta --email=..., --password=... e posicionais)
function parseArgs() {
  const args = process.argv.slice(2);
  const result = {};

  for (const arg of args) {
    if (arg.startsWith('--email=')) result.email = arg.split('=')[1];
    else if (arg.startsWith('--password=')) result.password = arg.split('=')[1];
    else if (arg.startsWith('--name=')) result.name = arg.split('=')[1];
    else if (arg.startsWith('--role=')) result.role = arg.split('=')[1];
  }

  // Se não vierem flags nomeadas, tenta posicionais
  if (!result.email && args[0] && !args[0].startsWith('--')) {
    // Se o primeiro argumento tem @, é email
    if (args[0].includes('@')) {
      result.email = args[0];
      result.password = args[1];
      result.name = args[2];
      result.role = args[3];
    } else {
      // Se não, o primeiro é o nome
      result.name = args[0];
      result.email = args[1];
      result.password = args[2];
      result.role = args[3];
    }
  }

  // Limpeza de aspas residuais comuns no Windows
  if (result.name) result.name = result.name.replace(/['"\\]/g, '').trim();
  if (result.email) result.email = result.email.replace(/['"\\]/g, '').trim().toLowerCase();
  if (result.password) result.password = result.password.replace(/['"\\]/g, '').trim();
  if (result.role) result.role = result.role.replace(/['"\\]/g, '').trim().toLowerCase();

  return result;
}

async function main() {
  console.log('\n=========================================');
  console.log('   FinGestão / VNW - Criador de Admin    ');
  console.log('=========================================\n');

  try {
    // 1. Testa a conexão com o banco
    await sequelize.authenticate();
    console.log(' Conexão com o banco de dados estabelecida com sucesso.\n');

    const cliArgs = parseArgs();
    let email = cliArgs.email;
    let password = cliArgs.password;
    let name = cliArgs.name;
    let role = cliArgs.role || 'admin';

    // Se não passou email, pergunta interativamente
    if (!email) {
      email = await askQuestion('📧 Digite o e-mail do administrador: ');
    }

    if (!email || !email.includes('@')) {
      console.error('❌ E-mail inválido.');
      process.exit(1);
    }

    email = email.trim().toLowerCase();

    // 2. Verifica se o usuário já existe no banco
    const existingUser = await User.findByEmail(email);

    if (existingUser) {
      console.log(`\nℹ️ Usuário já cadastrado encontrado: "${existingUser.name}"`);
      console.log(`   Perfil atual: [${existingUser.role}]`);

      let confirmUpdate = 's';
      if (!cliArgs.role) {
        confirmUpdate = await askQuestion(`\nDeseja promover este usuário para "${role}"? (S/n): `);
      }

      if (confirmUpdate.toLowerCase() === 'n') {
        console.log('Operação cancelada.');
        process.exit(0);
      }

      let updatePassword = false;
      if (!password && !cliArgs.password) {
        const changePass = await askQuestion('Deseja redefinir a senha também? (s/N): ');
        if (changePass.toLowerCase() === 's') {
          password = await askQuestion('🔑 Digite a nova senha (mínimo 6 caracteres): ');
          updatePassword = true;
        }
      } else if (password) {
        updatePassword = true;
      }

      // Aplica a promoção e atualização
      existingUser.role = role;
      if (updatePassword && password) {
        if (password.length < 6) {
          console.error('❌ A senha deve conter no mínimo 6 caracteres.');
          process.exit(1);
        }
        existingUser.password = password;
      }

      await existingUser.save();

      console.log('\n Usuário promovido com sucesso!');
      console.log('-----------------------------------------');
      console.log(`Nome:  ${existingUser.name}`);
      console.log(`Email: ${existingUser.email}`);
      console.log(`Role:  ${existingUser.role}`);
      console.log(`UUID:  ${existingUser.id_code}`);
      console.log('-----------------------------------------\n');
      process.exit(0);
    }

    // 3. Criação de novo usuário
    if (!name) {
      name = await askQuestion('👤 Digite o nome completo: ');
    }

    if (!name || name.trim().length < 2) {
      name = 'Administrador do Sistema';
    }

    name = name.trim();

    if (!password) {
      password = await askQuestion('🔑 Digite a senha (mínimo 6 caracteres): ');
    }

    if (!password || password.length < 6) {
      console.error('❌ A senha deve conter no mínimo 6 caracteres.');
      process.exit(1);
    }

    if (!cliArgs.role) {
      const chosenRole = await askQuestion('🛡️ Escolha o perfil: [1] admin | [2] master (Padrão: 1): ');
      if (chosenRole === '2' || chosenRole.toLowerCase() === 'master') {
        role = 'master';
      } else {
        role = 'admin';
      }
    }

    console.log(`\n⏳ Criando usuário com perfil "${role}"...`);

    const newUser = await User.create({
      name,
      email,
      password,
      role,
      status: 'active',
      email_verified: true
    });

    console.log('\n Administrador criado com sucesso!');
    console.log('-----------------------------------------');
    console.log(`Nome:  ${newUser.name}`);
    console.log(`Email: ${newUser.email}`);
    console.log(`Role:  ${newUser.role}`);
    console.log(`UUID:  ${newUser.id_code}`);
    console.log('-----------------------------------------');
    console.log('Pronto! Agora você já pode fazer login na aplicação com este e-mail e senha.\n');

  } catch (error) {
    console.error('\n❌ Erro ao criar/atualizar administrador:', error.message);
    if (error.errors) {
      error.errors.forEach(e => console.error(` - ${e.path}: ${e.message}`));
    }
  } finally {
    rl.close();
    await sequelize.close();
    process.exit(0);
  }
}

main();
