//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const axios = require('axios');
const { conn ,Type } = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: false}).then(async() => {

  //Precargar los tipos
  const verificacion = await Type.findAll()

  if(verificacion.length < 1){

       
    const pedido = await axios.get('https://pokeapi.co/api/v2/type')

    const formateo = pedido.data.results?.map(type =>{
      return{
      
        name:type.name,
        url:type.url
        
      }
    })

    //console.log(formateo)
    //bulkCreate --- > recibe un arreglo de objetos y crea una fila con cada uno 
    
     await Type.bulkCreate(formateo)
     console.log("se cargaron los tipos de pokemon exitosamente!")
  }



  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
