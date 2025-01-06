const express = require('express')
const bcrypt = require('bcryptjs')
const Usuario = require('../models/Usuarios')
const {generarJWt} = require('../helpers/jwt')

const createUser = async (req, res = express.response )=>{

   const {email, password} = req.body

    try {

        let usuario = await Usuario.findOne({email});
        console.log(usuario);

        if(usuario){
            return res.status(400).json ({
                ok:false,
                msg:'el usuario ya existe'
            })
        }

       usuario = new Usuario(req.body)

       // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        
        await usuario.save();

        // Generar JWT 
        const token = await generarJWt(usuario.id, usuario.name)
    
        res.status(201).json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            token
    
        })

    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'por favor hable con el administrador'
        })
    }


}

const loginUser = async (req, res = express.response)=>{

    const {email, password} = req.body

    try {
        const usuario = await Usuario.findOne({email});
        console.log(usuario);

        if(!usuario){
            return res.status(400).json ({
                ok:false,
                msg:'el usuario no existe con ese email'
            })
        }
        //confimrar password
        const validPassword = bcrypt.compareSync(password, usuario.password)
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'password incorrecto'
            })
        }
      
        // Generar JWT 
        const token = await generarJWt(usuario.id, usuario.name)

        res.status(201).json({
            ok:true,
            uid: usuario.id,
            name: usuario.name,
            token   
    
        })


    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'por favor hable con el administrador'
        })
    }


    res.status(201).json({
        ok:true,
        msg: 'login',
        email,
        password
    })

}

const revalidToken = async (req, res= express.response)=>{
    const uid = req.uid;
    const name = req.name

    const token = await generarJWt(uid, name)


    res.json({
        ok:true,
        uid,
        name,
        token
    })

}

module.exports = {
    createUser,
    loginUser,
    revalidToken
}