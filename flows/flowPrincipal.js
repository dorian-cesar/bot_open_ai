const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const {flowOpenai}= require ('./flowOpenai')
const {flowOfertas}= require ('./flowOfertas')
const {flowFotos}= require ('./flowFotos')
const {flowLinkdePago}= require ('./flowLinkdePago')

const flowPrincipal = addKeyword(['hola', 'ola', 'alo','menu'])
    .addAnswer('🙌 Hola bienvenido soy tu asistente virtual')
   
    .addAnswer(
        [
            'te comparto la siguiente informacion del  proyecto',
            '👉 *1* ¿Que es RingRing?',
            '👉 *2* Ofertas',
            '👉 *3* Consultas varias',
            '👉 *4* Fotos',

        ],
        null,
        null,
        [flowOpenai,flowOfertas,flowFotos,flowLinkdePago]
    )

    module.exports={flowPrincipal}