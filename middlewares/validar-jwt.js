const {response,request} = require('express')
const jwt = require('jsonwebtoken');

const validarJWT = (req=request,res=response,next)=>{
    
    
    console.log(req.socket.remoteAddress)
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'No hay token en la validacion'
        })
    }

    try {
        const {uid,name} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        req.uid=uid;
        req.name =name;
        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg: 'Token no valido.'
        })
        
    }

    next()


}


module.exports = {
    validarJWT
}