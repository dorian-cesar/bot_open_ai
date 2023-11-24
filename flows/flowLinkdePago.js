const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')




const flowLinkdePago = addKeyword(['1', '2', '3','pago', 'link de pago'])
      .addAnswer(
        [
            'Gracias, te dejo un link de pago para que puedas comprar tu Oferta',
            'https://link.pago.cl'

        ],
        null,
        null,
        []
    )

    module.exports={flowLinkdePago}