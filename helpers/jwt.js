const jwt = require('jsonwebtoken');

const generarJWt = (uid, name) =>{

    return new Promise((resolve, reject)=>{
            const payload = {
                uid,
                name
            }
            jwt.sign(payload, process.env.SECRET_JWT_SEED,{
                expiresIn:'2h'
            },(err,token)=>{
                if(err){
                    console.log(err)
                    reject('no se pudo generar el JWT')
                }
                resolve(token)
            })
    })
}

module.exports= {
    generarJWt
}