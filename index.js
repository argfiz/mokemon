// Importa la librería Express (que se utiliza para crear servidores web en Node.js).
const express = require('express') 

// Importa la librería CORS (Cross-Origin Resource Sharing) para permitir las solicitudes de otros dominios sin problemas de conexión.
const cors = require('cors') 

// Crea una instancia de la aplicación Express.
const app = express() 

const port = process.env.PORT || 8080

// Para hostear el html y lo pueda ver otra persona
app.use(express.static(`public`))

// Configura el uso de la librería CORS en la aplicación para habilitar el intercambio de recursos entre diferentes dominios.
app.use(cors()) 

app.use(express.json())

const jugadores = []

class Jugador {
    constructor(id) {
        this.id = id
    }  
    asignarMokemon(mokemon){
        this.mokemon = mokemon
    }  
    actualizarPosicion(x, y){
        this.x = x
        this.y = y
    }
    asignarAtaques(ataques){
        this.ataques = ataques
    }
}

class Mokemon {
    constructor(nombre)  {  
        this.nombre = nombre
    }   
}

// Configura una ruta en la aplicación para manejar solicitudes GET a '/unirse'.
app.get('/unirse', (req, res) => {
    const id =  `${Math.random()}`

    const jugador = new Jugador(id)

    jugadores.push(jugador)

    // Establece el encabezado de 'Access-Control-Allow-Origin' en '*' para permitir solicitudes desde cualquier origen.
    res.setHeader('Access-Control-Allow-Origin', '*')

    // Envía el ID del jugador como respuesta a la solicitud.
    res.send(id)

} )

//Le llega la URL entera y debe filtrar y seleccionar solo el parametro
app.post('/mokemon/:jugadorId', (req, res) => {
    const jugadorId  = req.params.jugadorId || ""
    const nombre = req.body.mokemon || ""
    const mokemon = new Mokemon(nombre)
    
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    if(jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarMokemon(mokemon)
    }

    console.log(jugadores)
    console.log(jugadorId) 
    res.end()
})


app.post("/mokemon/:jugadorId/posicion", (req, res) => {
    const jugadorId  = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0 
    
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)
    if(jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(x, y)
    }
    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)
    
    res.send({
        enemigos
    })
})


app.post('/mokemon/:jugadorId/ataques', (req, res) => {
    const jugadorId  = req.params.jugadorId || ""
    const ataques = req.body.ataques || []
    
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if(jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarAtaques(ataques)
    }

   
    res.end()
})


app.get("/mokemon/:jugadorId/ataques", (req, res) => {
    const jugadorId  = req.params.jugadorId || ""
    const jugador = jugadores.find((jugador) => jugador.id === jugadorId)
    res.send({
        ataques: jugador.ataques || []
    })
})



// Hace que la aplicación escuche en el puerto 8080 y, cuando se inicia, muestra un mensaje en la consola.
app.listen ( port, () => {
  console.log(`"Servidor funcionando : ${port}`)   
})
 