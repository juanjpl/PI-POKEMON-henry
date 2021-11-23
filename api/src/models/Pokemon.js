const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

/*
[ ] Pokemon con las siguientes propiedades:
ID (Número de Pokemon) * : No puede ser un ID de un pokemon ya existente en la API pokeapi
Nombre *
Vida
Fuerza
Defensa
Velocidad
Altura
Peso
*/
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{
      type:DataTypes.UUID,
      allowNull:false,
      unique:true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      unique:true,
      allowNull: false,
    },
    height:{
      type:DataTypes.NUMBER,
      allowNull:true,
      defaultValue:0
    },
    weight:{
      type:DataTypes.NUMBER,
      allowNull:true,
      defaultValue:0
    },
    types:{
      type: DataTypes.ARRAY[DataTypes.STRING],
      allowNull:true
    },
    sprites:{
      type:DataTypes.STRING,
      defaultValue:"https://2.bp.blogspot.com/-Va_nTr_dKSA/XNbCScGn0SI/AAAAAAAAHwE/FMKyp5FfDqseO7IUVPl04I38x7SyKtHwwCLcBGAs/s1600/PokeBall%2BPokemon%2BLogo%2B%255Bwww.blogovector.com%255D.png"
    },
    moves:{
      type:DataTypes.ARRAY[DataTypes.STRING]
    }
   

  });
};
