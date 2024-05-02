const sequelize = require('../db/client')
const { hash, compare } = require('bcrypt')
const { DataTypes, Model } = require('sequelize')

class User extends Model {
    async validatePass(formPassword) {
        const is_valid = await compare(formPassword, this.password)
        return is_valid
    }
 }

User.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: 6
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: {
                args: true,
                msg: 'user with email already exists'},
            validate: {
                isEmail: true
            },
            allowNull: false
        },
        balance: {
            type: DataTypes.DECIMAL,
            defaultValue: 1000.00
        }
    },
    {
        sequelize,
        paranoid: true,
        hooks: {
            async beforeCreate(user) {
                user.password = await hash(user.password, 10)
            }
        },
        modelName: 'user',
        scopes: {
            withoutPassword: {
              attributes: { exclude: ['password'] },
            }
          }  
    }
)

module.exports = User