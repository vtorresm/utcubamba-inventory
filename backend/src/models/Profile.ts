import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db'

interface ProfileAttributes {
  id: number;
  profileName: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProfileCreationAttributes extends Optional<ProfileAttributes, 'id'> {}

class Profile extends Model<ProfileAttributes, ProfileCreationAttributes> implements ProfileAttributes {
  public id!: number;
  public profileName!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Profile.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    profileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'profiles',
    timestamps: true,
  }
);

export default Profile;