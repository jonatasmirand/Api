
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    id_code: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true
    },

    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 255]
      }
    },

    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true
      }
    },

    phone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },

    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: false
    },

    password: {
      type: DataTypes.VIRTUAL,
      set(value) {
        this.setDataValue('password_hash', value);
      }
    },

    role: {
      type: DataTypes.ENUM(
        'master',
        'admin',
        'manager',
        'volunteer',
        'people'
      ),
      allowNull: false,
      defaultValue: 'people'
    },

    google_id: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },

    google_uid: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },

    avatar_url: {
      type: DataTypes.STRING,
      allowNull: true
    },

    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },

    address_street: {
      type: DataTypes.STRING,
      allowNull: true
    },

    address_number: {
      type: DataTypes.STRING(20),
      allowNull: true
    },

    address_complement: {
      type: DataTypes.STRING,
      allowNull: true
    },

    address_neighborhood: {
      type: DataTypes.STRING,
      allowNull: true
    },

    address_city: {
      type: DataTypes.STRING,
      allowNull: true
    },

    address_state: {
      type: DataTypes.STRING(2),
      allowNull: true
    },

    address_zip_code: {
      type: DataTypes.STRING(10),
      allowNull: true
    },

    email_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },

    status: {
      type: DataTypes.ENUM(
        'active',
        'inactive',
        'pending_verification',
        'banned'
      ),
      allowNull: false,
      defaultValue: 'active'
    },

    plan_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'plans',
        key: 'id'
      }
    },

    plan_start: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },

    plan_end: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  },
  {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,

    hooks: {
      beforeCreate: async (user) => {
        if (user.email && typeof user.email === 'string') {
          user.email = user.email.trim().toLowerCase();
        }

        if (user.password_hash) {
          user.password_hash = await bcrypt.hash(
            user.password_hash,
            12
          );
        }

        if (!user.id_code) {
          user.id_code = uuidv4();
        }
      },

      beforeUpdate: async (user) => {
        if (user.email && typeof user.email === 'string') {
          user.email = user.email.trim().toLowerCase();
        }

        if (user.changed('password_hash')) {
          user.password_hash = await bcrypt.hash(
            user.password_hash,
            12
          );
        }
      },

      beforeBulkCreate: (users) => {
        if (Array.isArray(users)) {
          for (const user of users) {
            if (user.email && typeof user.email === 'string') {
              user.email = user.email.trim().toLowerCase();
            }

            if (!user.id_code) {
              user.id_code = uuidv4();
            }
          }
        }
      },

      beforeBulkUpdate: (options) => {
        if (
          options &&
          options.attributes &&
          typeof options.attributes.email === 'string'
        ) {
          options.attributes.email =
            options.attributes.email.trim().toLowerCase();
        }
      }
    }
  }
);

// Métodos de instância
User.prototype.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password_hash);
};

User.prototype.toJSON = function() {
  const values = Object.assign({}, this.get());

  delete values.id;
  delete values.password_hash;
  delete values.password;

  return values;
};

// Métodos estáticos
User.findByEmail = function(email) {
  return User.findOne({
    where: {
      email: email.trim().toLowerCase()
    }
  });
};

User.findByRole = function(role) {
  return User.findAll({
    where: {
      role: role
    }
  });
};

module.exports = User;
