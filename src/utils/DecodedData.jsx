const { jwtDecode } = require("jwt-decode")

export const DecodedData = (token)=>{
    const decoded = jwtDecode(token)
    return decoded
}


