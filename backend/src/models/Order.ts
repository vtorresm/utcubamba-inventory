import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './User';
import Medication from './Medication';

class Order extends Model {
  public id!: number;
  public userId!: number;
  public status!: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  public totalAmount!: number;
}

class OrderItem extends Model {
  public id!: number;
  public orderId!: number;
  public medicationId!: number;
  public quantity!: number;
  public price!: number;
}

Order.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  status: {
    type: DataTypes.ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled'),
    defaultValue: 'pending',
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
}, {
  sequelize,
  modelName: 'Order',
});

OrderItem.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Order,
      key: 'id',
    },
  },
  medicationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Medication,
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
}, {
  sequelize,
  modelName: 'OrderItem',
});

Order.belongsTo(User);
Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);
OrderItem.belongsTo(Medication);

export { Order, OrderItem };