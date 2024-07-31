import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db';

interface TokenAttributes {
  id: number;
  token: string;
  user: number;
  expiresAt: Date;
}

interface TokenCreationAttributes extends Optional<TokenAttributes, 'id'> {}

class Token extends Model<TokenAttributes, TokenCreationAttributes> implements TokenAttributes {
  public id!: number;
  public token!: string;
  public user!: number;
  public expiresAt!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Token.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'tokens',
    timestamps: true,
  }
);

export default Token;