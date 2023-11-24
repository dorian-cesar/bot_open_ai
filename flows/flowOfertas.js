const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')
const axios =require('axios')

const {flowLinkdePago}= require ('./flowLinkdePago')

const flowOfertas = addKeyword(['2','ofertas', 'oferta'])
.addAnswer('¿Cual es tu email?',{capture :true},(ctx, {fallBack})=>{

  if(!ctx.body.includes('@')){
      return fallBack()
  }
  console.log ('mensaje entrante de:',ctx.body,ctx.from)
})
    .addAnswer(' 🎁Estas son las Ofertas disponibles:', null, async (ctx, {flowDynamic}) => {
        await flowDynamic('Aprovecha es por poco tiempo')

        const listaOfertas = await menuApi()

       // console.log(listaOfertas)

       const mapeoDeLista =  listaOfertas.data.map((item) => item.oferta + ', '+ item.precio +': '+ item.detalle) //Item 1, Item 2, Item 3
       //console.log(mapeoDeLista)

        await flowDynamic(mapeoDeLista)


      })
      .addAnswer(
        [
            '🛒Si te interesa alguna oferta digita su numero de lo contrario digita "*menu*"',
       
        ],
        null,
        null,
        [flowLinkdePago]
    )

async function menuApi(){

    try {
      const response = await axios.get('http://localhost/test_json/ofertas.php'); 
      //console.log(response)
     return response
    }
    catch (error){
      console.log(error)
    }
  }
  menuApi()

  module.exports={flowOfertas}