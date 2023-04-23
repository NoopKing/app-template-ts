import api from 'lambda-api'
import {execCheckes} from "./controles/index.js"
const server = api()

const dataCHecker = {
    "rede1": {
      "data-Requests": {
        "headers": {
          "scheme": "https",
          "accept": "application/json, text/javascript, */*; q=0.01",
  
          "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
  
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
  
  
          "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13F69 MicroMessenger/6.6.1 NetType/4G Language/zh_CN",
  
          "x-requested-with": "XMLHttpRequest"
        },
        "form": "product_id=7768&product_sku=4491&quantity=1",
      },
      "data-client": {
        "name":"rede1",
        "status": "online",
        "online": true,
        "value":"16,00",
        "about": "checker rede legalzinho",
        "type":"rede"
      }
    }
   }

// Define a route that handles POST requests
server.get('/', async (req, res) => {
  // Access dynamic values from the request body
   let result
       try {
          result = await execCheckes({
      nameChecker:"rede1",
      checkerRequisitado:dataCHecker,
      cc: "5162921881334213|11|2030|521"
    })
       } catch (e) {
         result = {
           success:false,
           error: e.message,
           e,
           result:"erro interno"
         }
       }
  return { result };
});

// Declare your Lambda handler
export async function handler (event, context)  {
  // Run the request
  return await server.run(event, context);
};

