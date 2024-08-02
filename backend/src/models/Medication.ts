import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Medication extends Model {
  public id!: number;
  public name!: string;
  public category!: string;
  public administrationRoute!: string;
  public medicalCondition!: string;
  public currentStock!: number;
  public minStock!: number;
  public price!: number;
  public location!: string;
  public expirationDate!: Date;
}

Medication.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  administrationRoute: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  medicalCondition: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  currentStock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  minStock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expirationDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Medication',
});

export default Medication;