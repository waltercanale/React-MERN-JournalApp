

const Evento = require('../models/Evento.js')

const getEventos = async (req, res) => {

    const eventos = await Evento.find()
                                .populate('user', 'name') //aca mandamos en user solo el name y el _id el _id viene si o si lo podemos sacar pero si no es el unico parametro que viene por si solo
    res.json({
        ok:true,
        eventos
        })
    }

const crearEvento = async (req, res) => {

    const evento = new Evento( req.body )

    try {

        evento.user = req.uid
        console.log(req.uid)
        const eventoGuardado = await evento.save()

        res.json({
            ok:true,
            evento: eventoGuardado
        })
         console.log(eventoGuardado)

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "comuniquese con el equipo" 
        })
    }
    //verificar esta el evento
    console.log(req.body)
}

const actualizarEvento = async (req, res) => {
    const eventId = req.params.id
    const uid = req.uid


    try {
        const evento = await Evento.findById( eventId )

        if(!eventId) {
            return res.status(404).json({
                ok: false,
                msg:'Evento no existe con ese ID'
            })
        }

        if( evento.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                msg: 'Notiene privilegio de editar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        const eventoActualizado =  await Evento.findByIdAndUpdate(eventId, nuevoEvento, { new:true })

        res.json({
            ok: true,
            eventoActualizado
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Comuniquese con el administrador'
        })
    }
 
}

const eliminarEvento = async (req, res) => {
    const eventoId = req.params.id
    const uid = req.uid

    console.log(uid)
    
    try {

        const evento = await Evento.findById(eventoId)
        if(!evento) {
            return res.status(401).json({
                ok: false,
                msg: 'El evento a eliminar no existe con ese ID'
            })
        }

        if(evento.user.toString() !== uid ){
            return res.status(401).json({
                ok: false,
                mesg: 'No tienes provilegio para eliminar esta nota'
            })
        }

        await Evento.findByIdAndDelete( eventoId )

        res.json({
            ok: true,
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg:'Comuniquese con el administrador'
        })
    }
 }

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}