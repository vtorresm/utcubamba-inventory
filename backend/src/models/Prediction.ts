import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Medication from './Medication';

class Prediction extends Model {
  public id!: number;
  public medicationId!: number;
  public predictedDate!: Date;
  public predictedAmount!: number;
  public currentStock!: number;
  public riskLevel!: 'Bajo' | 'Moderado' | 'Alto';
}

Prediction.init({
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
  predictedDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  predictedAmount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  currentStock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  riskLevel: {
    type: DataTypes.ENUM('Bajo', 'Moderado', 'Alto'),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Prediction',
});

Prediction.belongsTo(Medication);

export default Prediction;