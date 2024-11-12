import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Medication from './Medication';

class Alert extends Model {
  public id!: number;
  public medicationId!: number;
  public type!: 'lowStock' | 'expiringSoon' | 'overstock';
  public threshold!: number;
  public message!: string;
  public isActive!: boolean;
}

Alert.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  medicationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Medication,
      key: 'id',
    },
  },
  type: {
    type: DataTypes.ENUM('lowStock', 'expiringSoon', 'overstock'),
    allowNull: false,
  },
  threshold: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  sequelize,
  modelName: 'Alert',
});

Alert.belongsTo(Medication);

export default Alert;