const sequelize = require("../db/client");
const { hash, compare } = require("bcrypt");
const { DataTypes, Model } = require("sequelize");
const Bet = require('./Bet')

class User extends Model {
  async validatePass(formPassword) {
    const is_valid = await compare(formPassword, this.password);
    return is_valid;
  }
  async getUserBets() {
    try {
      const user = await User.findByPk(this.id, {
        include: { model: Bet },
      });
      const bets = []
      if (!user.bets.length) {
        return bets
      }
        user.bets.map(async (betObj) => {
          const bet = await Bet.findByPk(betObj.id);
         
          let net = 'Pending'
          if (bet.resolved) {
            const user = await User.findByPk(betObj.user_id);
            net = parseFloat(bet.payout)-parseFloat(bet.amount) 
            
          } 
          const betItem = {
            id: bet.id,
            event_id: bet.event_id,
            name: bet.name,
            odds: bet.odds,
            amount: bet.amount,
            payout: bet.payout,
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
      type: DataTypes.DECIMAL,
      defaultValue: 1000.0,
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
