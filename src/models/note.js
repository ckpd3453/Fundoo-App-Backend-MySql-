'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  note.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      colour: DataTypes.STRING,
      archive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      trash: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      userId: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'note'
    }
  );
  return note;
};
