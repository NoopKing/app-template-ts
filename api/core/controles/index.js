import request from "../models/index.js"
import ultilsCC from "../Ultils/index.js"
import Rede1 from "../checkers/rede1.js"
import {
  searchData,
  ccIsValidAndResult
} from "../Ultils/functions.js"



const functionalities = {

  "rede1": async function (checker, cc) {
    return {
      sla: ultilsCC
    }
    const dataBinAndResult = await ccIsValidAndResult({
      cc: cc,
      ultilsCC: ultilsCC,
      request: request
    })
    return dataBinAndResult
console.log(ultilsCC)
// return {
//   sla: String(ultilsCC)
// }
    cc = ultilsCC?.["destructCC"](cc)
    if (!cc) return {
      success: false,
      result: "algo de errado com a cc"
    }
    if (!dataBinAndResult.success) return dataBinAndResult
   const {body} = await request({
     method: "POST",
     url:"https://www.4devs.com.br/ferramentas_online.php",
     form:"acao=gerar_pessoa&sexo=I&pontuacao=S&idade=0&cep_estado=&txt_qtde=1&cep_cidade="
   }) 
  
    return Rede1({
      "searchData": searchData,
      "request": request,
      "dataBin": dataBinAndResult.result,
      "cc": cc,
      "checker": checker["data-Requests"],
      "dataPeople": body,
    })
  }
}

async function execCheckes({nameChecker, checkerRequisitado, cc}) {
  return await functionalities[nameChecker](checkerRequisitado[nameChecker], cc)

}


export {
  execCheckes
}