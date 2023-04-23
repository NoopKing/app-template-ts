export function searchData(regex, body, index) {
  const cookie = body.match(regex)
  return cookie?.[index] ? cookie[index]: null
}
export async function ccIsValidAndResult( {
  cc,
  ultilsCC,
  request
}) {

  return {
    s:"(8",
    sla: String(request),
  l:JSON.stringify(request),
  a:request
}
  console.log( "acessed ./ult.../functions.js")
  console.log(ultilsCC?.validate)
  // return {
  //   sla: JSON.stringify(ultilsCC?.validate)
  // }
  // if (!cc || !await ultilsCC["validate"](cc)) return {
  //   success: false,
  //   result: "cc invalida"
  // }

  const bin = await request({
    method: "GET",
    url: "https://lookup.binlist.net/"+cc.slice(0, 6)
  })

  if (!bin.body) return {
    success: false,
    result: "bin invalida "
  }

  const binCC = JSON.parse(bin.body)

  if (!ultilsCC["validateBin"]({
    permitted: [
      "visa",
      "mastercard",
      "discover",
      "elo",
      "amex"
    ],
    bin: binCC.scheme
  })) return {
    success: false,
    result: "esse checker n aceita essa bin"
  }

  return {
    success: true,
    result: binCC
  }
}