import req from "request"

function request(options) {
  
  return new Promise((resolve, reject) => {
    req(options, (error, response, body) => {
      if (!error) return resolve(response)
      console.log(error)
      return reject(null)
      
    })
  })
}

export default request