const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const flowAdios = addKeyword(['gracias', 'adios', 'chao'])
   
    .addAnswer(
        [
            'Gracias, por visistarnos y no dudes en hablarnos , si tienes alguna inquetud',
            '👍 nos vemos luego!!'

        ],
        null,
        null,
        []
    )

    module.exports={flowAdios}