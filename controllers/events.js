
const {response} = require('express')
const Evento = require('../models/Events')
const getEventos = async (req, res = response )=>{
    
    const eventos = await Evento.find().populate('user','name')


    res.status(201).json({
        ok:true,
        eventos:eventos
    })    


}

const crearEvento = async (req, res = response )=>{

    
    const evento = new Evento (req.body);

    try {
        evento.user = req.uid
        const nuevoEvento= await evento.save()

        res.status(201).json({
            ok:true,
            evento: nuevoEvento
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el Administrador DB',

        })
        
    }


}

const actualizarEvento = async (req, res = response )=>{
   
    const eventoId = req.params.id;
    const uid =req.uid;
    
    try {
        
        const evento = await Evento.findById(eventoId)
        
        if (!evento){
            return res.status(404).json({
                ok:false,
                msg:'evento inexistente.',
            })    
        }
        
        if (evento.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'El Usuario no tiene permiso para actualizar',
            })    
        }
        const newEvento ={
            ...req.body,
            user:uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId,newEvento,{new:true})



        res.status(201).json({
            ok:true,
            evento:eventoActualizado
        })    
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el Administrador DB',

        })
        
        
    }

}

const eliminarEvento = async(req, res = response )=>{
    const eventoId = req.params.id;
    const uid =req.uid;
    try {
        const evento = await Evento.findById(eventoId)
        
        if (!evento){
            return res.status(404).json({
                ok:false,
                msg:'evento inexistente.',
            })    
        }
        
        if (evento.user.toString() !== uid){
            return res.status(401).json({
                ok:false,
                msg:'El Usuario no tiene permiso para eliminar',
            })    
        }

        await Evento.findByIdAndDelete(eventoId)

        res.status(201).json({
            ok:true,
            msg:'Evento Eliminado correctamente'
        })    
        
    } catch (error) {
        
    }

}


module.exports={
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}
