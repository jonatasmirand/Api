
require('dotenv').config();

const { Sequelize } = require('sequelize');
const { requestContext } = require('../utils/requestContext');

// Configuração do banco de dados
const databaseUrl = process.env.DATABASE_URL;

const dialect =
  process.env.DB_DIALECT ||
  (databaseUrl || process.env.DB_PORT === '5432'
    ? 'postgres'
    : 'mysql');

const isPostgres = dialect === 'postgres';
const postgresDialectOptions =
  isPostgres && process.env.DB_SSL === 'true'
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: process.env.DB_SSL_REJECT_UNAUTHORIZED !== 'false'
        }
      }
    : {};

const commonOptions = {
  dialect: isPostgres ? 'postgres' : dialect,

  logging:
    process.env.DB_LOGGING === 'true'
      ? console.log
      : false,

  pool: {
    max: parseInt(process.env.DB_POOL_MAX, 10) || 15,
    min: parseInt(process.env.DB_POOL_MIN, 10) || 2,
    acquire: 60000,
    idle: 10000
  },

  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: true
  },

  dialectOptions: isPostgres
    ? postgresDialectOptions
    : {
      charset: 'utf8mb4'
      }
};

// Criar conexão
let sequelize;

if (databaseUrl) {
  // Quando DATABASE_URL estiver configurada,
  // o host e a porta são extraídos dessa URL.
  try {
    const parsedUrl = new URL(databaseUrl);

    if (!parsedUrl.hostname) {
      throw new Error('Host ausente na DATABASE_URL.');
    }

    if (parsedUrl.port && !/^\d+$/.test(parsedUrl.port)) {
      throw new Error('Porta inválida na DATABASE_URL.');
    }

    console.log('Banco configurado via DATABASE_URL.');
    console.log('Host detectado:', parsedUrl.hostname);
    console.log(
      'Porta detectada:',
      parsedUrl.port || '(porta padrão do driver)'
    );
  } catch (error) {
    throw new Error(
      `DATABASE_URL inválida: ${error.message}`
    );
  }

  sequelize = new Sequelize(databaseUrl, commonOptions);
} else {
  const host = process.env.DB_HOST || 'localhost';
  const port = Number(process.env.DB_PORT || 3306);

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('DB_PORT deve ser uma porta válida.');
  }

  if (host.includes('://')) {
    throw new Error(
      'DB_HOST deve conter somente o hostname ou IP, sem protocolo.'
    );
  }

  console.log('Host do banco:', host);
  console.log('Porta do banco:', port);
  console.log('Dialeto:', dialect);

  sequelize = new Sequelize(
    process.env.DB_NAME || 'beerclub',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
      host,
      port,
      ...commonOptions
    }
  );
}

// Contador global de consultas
sequelize.dbQueries = 0;

// Contabilizar consultas
sequelize.addHook('beforeQuery', () => {
  sequelize.dbQueries++;

  const context = requestContext.getStore();

  if (context) {
    context.dbQueries++;
  }
});

// Testar conexão
const testConnection = async () => {
  try {
    await sequelize.authenticate();

    console.log(
      '✅ Database connection has been established successfully.'
    );

    return true;
  } catch (error) {
    console.error(
      '❌ Unable to connect to the database:',
      error.message
    );

    return false;
  }
};

module.exports = {
  sequelize,
  testConnection
};
