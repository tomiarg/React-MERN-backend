
const {response} = require('express')
const Evento = require('../models/Eventos')

const getEventos = async (req,res = response) => {
    const eventos= await Evento.find()
                            .populate("user","name");
                               
    res.json({
        ok :true,
        eventos
    })
    
};



const crearEvento = async (req,res = response) => {
    //verificar si tengo el evento
    const evento = new Evento(req.body)

    try{
        evento.user = req.uid
        const eventoDB = await evento.save()
        res.json({
            ok:true,
            evento: eventoDB
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
    res.json({
        ok :true,
        msg : 'crearventos'
    })
    
};

const refreshEvento = async (req,res = response) => {
    const eventoId  = req.params.id 
    const uid = req.uid

    try {
        const evento = await Evento.findById(eventoId);
        if(!evento){
           return res.status(404).json({
                ok:false,
                msg:"evento no existe por ese id"
            })
        }

        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:"no tiene privilegio de editar este evento"
                
                
            })

        }

        const nuevoEvento = {
            ...req.body,
            user:uid
        }
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new:true});
        res.json({
            ok:true,
            evento:eventoActualizado
        })
            
    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok:false,
            msg:"hable con el administrador"
        })
        
    }

    
    res.json({
        ok :true,
       eventoId
    })
    
};


const deleteEvento= async (req,res = response)=>{

    const eventoId  = req.params.id 
    const uid = req.uid

    try {
        const evento = await Evento.findById(eventoId);
        if(!evento){
            return res.status(404).json({
                ok:false,
                msg:"evento no existe por ese id"
            })
        }

        if(evento.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:"no tiene privilegio de editar este evento"
                
                
            })

        }

       
        await Evento.findByIdAndDelete(eventoId);
        res.json({ok:true })
            
    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok:false,
            msg:"hable con el administrador"
        })
        
    }

    
    res.json({
        ok :true,
       eventoId
    })
    
}

module.exports = {
    crearEvento,
    getEventos,
    refreshEvento,
    deleteEvento
}