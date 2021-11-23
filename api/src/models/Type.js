const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

/*
[ ] Tipo con las siguientes propiedades:
ID
Nombre
*/


module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
      id:{
          type:DataTypes.UUID,
          unique: true,
          allowNull: false,
          defaultValue: DataTypes.UUIDV4
      },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
