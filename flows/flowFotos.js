const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')


const flowFotos= addKeyword(['img','imagen','4'])
.addAnswer
(
    'te envvio una imagen',
   {media:'https://i.imgur.com/0HpzsEm.png'}
)


    module.exports={flowFotos}