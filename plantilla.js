const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const axios =require('axios')

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])

const flowDocs = addKeyword(['doc', 'documentacion', 'documentación']).addAnswer(
    [
        '📄 Aquí encontras las documentación recuerda que puedes mejorarla, si puedes!!',
        'https://bot-whatsapp.netlify.app/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowApii = addKeyword('categorias')
    .addAnswer('Estas son las categorías disponibles:', null, async (ctx, {flowDynamic}) => {
        await flowDynamic('Enviar un mensaje text')

        const listaDeArticulos = await menuApi()

        console.log(listaDeArticulos)

       const mapeoDeLista =  listaDeArticulos.data.map((item) => item.nombre + ', edad: '+ item.edad) //Item 1, Item 2, Item 3
       //console.log(mapeoDeLista)

        await flowDynamic(mapeoDeLista)


      })
const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowGracias = addKeyword(['gracias', 'grac']).addAnswer(
    [
        '🚀 Puedes aportar tu granito de arena a este proyecto',
        '[*opencollective*] https://opencollective.com/bot-whatsapp',
        '[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez',
        '[*patreon*] https://www.patreon.com/leifermendez',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowDiscord = addKeyword(['discord']).addAnswer(
    ['🤪 Únete al discord', 'https://link.codigoencasa.com/DISCORD', '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
)

const flujoImagen= addKeyword(['img','imagen']).addAnswer(
    'te envvio una imagen',
    {media:'img/auto.jpg'}
).addAnswer (
    'hola ',
     {media:'img/auto2.jpg'}
     )


    
const flujoBotones = addKeyword('botones').addAnswer(
    'estos  son los botones',
    {buttons:[
        {body:'imagen'},
        {body: 'videos'},
        {body:'canciones'}
    ]
}
)

async function menuApi(){

  try {
    const response = await axios.get('http://localhost/test_json/nombres.php'); 
    //console.log(response)
   return response
  }
  catch (error){
    console.log(error)
  }
}





const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola bienvenido a este *Chatbot*')
    .addAnswer('¿Cual es tu email?',{capture :true},(ctx, {fallBack})=>{

        if(!ctx.body.includes('@')){
            return fallBack()
        }
        console.log ('mensaje entrante:',ctx.body)
    })
    .addAnswer(
        [
            'te comparto los siguientes links de interes sobre el proyecto',
            '👉 *doc* para ver la documentación',
            '👉 *gracias*  para ver la lista de videos',
            '👉 *discord* unirte al discord ',
        ],
        null,
        null,
        [flowDocs, flowGracias, flowTuto, flowDiscord]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal,flowGracias,flujoImagen,flujoBotones,flowApii])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
