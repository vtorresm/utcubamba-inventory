import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Medication from './Medication';

class InventoryMovement extends Model {
  public id!: number;
  public medicationId!: number;
  public type!: 'entrada' | 'salida';
  public quantity!: number;
  public reason!: string;
  public responsiblePerson!: string;
  public date!: Date;
}

InventoryMovement.init({
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
    type: DataTypes.ENUM('entrada', 'salida'),
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  responsiblePerson: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize,
  modelName: 'InventoryMovement',
});

InventoryMovement.belongsTo(Medication);

export default InventoryMovement;