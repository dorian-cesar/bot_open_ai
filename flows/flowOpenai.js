const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const {botOpenai}= require ('../openai/botOpenai')

const flowOpenai = addKeyword(['3'])

.addAnswer(' Que desaeas saber?:', {capture :true}, async (ctx, {fallBack,flowDynamic,endFlow}) => {
    
    if(ctx.body=="STOP"){
      await flowDynamic ('Digite *menu* para volver al menu')
      return endFlow({body: 'menu' })
      
    }else{

    const  res= await botOpenai(ctx.body)
    await flowDynamic(res)
    console.log('msje:', res)

    return fallBack()
    }

  }) 



    module.exports={flowOpenai}

