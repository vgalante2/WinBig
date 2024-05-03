const sequelize = require("../db/client");
const { hash, compare } = require("bcrypt");
const { DataTypes, Model } = require("sequelize");
const Bet = require('./Bet')

class User extends Model {
  async validatePass(formPassword) {
    const is_valid = await compare(formPassword, this.password);
    return is_valid;
  }
  async getUserBets(num) {
    try {
      const user = await User.findByPk(this.id, {
        include: [{
          model: Bet,
          order: [['createdAt', 'DESC']], 
          limit: num
        }]
      })
      let bets = []
      if (!user.bets.length) {
        return bets
      }
        user.bets.forEach((bet) => {
          let net = 'Pending'
          if (bet.resolved) {
            net = parseFloat(bet.payout).toFixed(2)-parseFloat(bet.amount).toFixed(2) 
            
          } 
          const betItem = {
            id: bet.id,
            event_id: bet.event_id,
            name: bet.bet_name,
            odds: bet.odds,
            amount: parseFloat(bet.amount).toFixed(2),
            payout: parseFloat(bet.payout).toFixed(2),
            net: net
          } 
          bets.push(betItem)

        }) 
        return bets
    } catch (err) {
      console.log(err);
    }
  }
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: 6,
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "user with email already exists",
      },
      validate: {
        isEmail: true,
      },
      allowNull: false,
    },
    balance: {
      type: DataTypes.DECIMAL(10,2),
      defaultValue: 1000.00,
    },
  },
  {
    sequelize,
    hooks: {
      async beforeCreate(user) {
        user.password = await hash(user.password, 10);
      },
    },
    modelName: "user",
    scopes: {
      withoutPassword: {
        attributes: { exclude: ["password"] },
      },
    },
  }
);


module.exports = User;