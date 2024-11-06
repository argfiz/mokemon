    //crearMensaje
    const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo")
    const ataquesDelJugador = document.getElementById("ataques-del-jugador")
    //AMBAS
    const sectionMensajes = document.getElementById("resultado")
    //crearMensajeFinal
    //AMBAS
    const sectionReiniciar = document.getElementById('seleccionar-reiniciar')

    //iniciarJuego()
    const botonReiniciar = document.getElementById("boton-reiniciar")
    //AMBAS
    const sectionAtaque = document.getElementById("seleccionar-ataque")
    const botonMascotaJugador = document.getElementById("boton-mascota")
    //seleccionarMascotaJugador()
    const sectionMascota = document.getElementById("seleccionar-mascota")
    const inputLangostelvis = document.getElementById("langostelvis")
    const inputTucapalma = document.getElementById("tucapalma")
    const inputPydos = document.getElementById("pydos")
    const spanMascotaJugador = document.getElementById("mascota-jugador")
    //seleccionarMascotaEnemigo()
    const spanMascotaEnemigo = document.getElementById('mascota-enemigo')
    //combate()
    const spanVidaJugador = document.getElementById("vida-jugador")
    const spanVidaEnemigo = document.getElementById("vida-enemigo")

    const contenedorTarjetas = document.getElementById('contenedor-tarjetas')
    const contenedorAtaques = document.getElementById('botones-ataques')

    const sectionVerMapa = document.getElementById('ver-mapa')
    const mapa = document.getElementById('mapa')
    const controls = document.querySelectorAll('.button-control')

    let jugadorId = null
    let enemigoId = null
    let ataqueEnemigo = [] 
    let mokemonesEnemigos = []
    let ataquesMokemonEnemigo = []
    let ataqueJugador = []
    let botones = []
    let opcionDeMokemones
    let opcionDeAtaques
    let mascotaEnemigo
    let mascotaJugador
    let mascotaJugadorObjeto
    let inputHipodogue  
    let inputCapipepo  
    let inputRatigueya
    let botonFuego 
    let botonAgua
    let botonPlanta  
    let indexAtaqueJugador
    let indexAtaqueEnemigo
    let victoriasJugador = 0
    let victoriasEnemigo = 0
    let vidasEnemigo = 3
    let vidasJugador = 3
    let lienzo = mapa.getContext("2d")
    let intervalo
    let mapaBackground = new Image()
    mapaBackground.src = './imagenes/mokemap.png'
    
    let alturaQueBuscamos
    let anchoDelMapa = window.innerWidth - 20
    const anchoMaximoDelMapa = 350

    if(anchoDelMapa > anchoMaximoDelMapa) {
       anchoDelMapa = anchoMaximoDelMapa -20
    }

    alturaQueBuscamos = anchoDelMapa * 600 / 800

    mapa.width = anchoDelMapa
    mapa.height = alturaQueBuscamos





    class Mokemon {
        constructor(nombre, foto, vida, mapaFoto, id= null){
            this.id = id
            this.nombre = nombre
            this.foto = foto
            this.vida = vida
            this.tipo = ''
            this.ataques = []
            this.ancho = 40
            this.alto = 40
            this.x = aleatorio(0, mapa.width - this.ancho)
            this.y = aleatorio(0, mapa.height - this.alto)
            this.mapaFoto = new Image()
            this.mapaFoto.src = mapaFoto
            this.velocidadX = 0
            this.velocidadY = 0

        }
        pintarMokemon() {
            lienzo.drawImage(
                this.mapaFoto,
                this.x,
                this.y,
                this.ancho,
                this.alto
            )
        } 
    }

    let mokemones = []
    const hipodogue = new Mokemon('Hipodogue', './imagenes/mokepons_mokepon_hipodoge_attack.png', 5, './imagenes/hipodoge.png' )
    const capipepo = new Mokemon('Capipepo', './imagenes/mokepons_mokepon_capipepo_attack.png', 5, './imagenes/capipepo.png'  )
    const ratigueya = new Mokemon('Ratigueya', './imagenes/mokepons_mokepon_ratigueya_attack.png', 5, './imagenes/ratigueya.png'  )

    
    /*const langostelvis = new Mokemon('langostelvis', './imagenes/mokepons_mokepon_hipodoge_attack.png', 5 )
    const tucapalma = new Mokemon('tucapalma', './imagenes/mokepons_mokepon_capipepo_attack.png', 5 )
    const pydos = new Mokemon('pydos', './imagenes/mokepons_mokepon_ratigueya_attack.png', 5 )*/


    const HIPODOGUE_ATAQUE = [
        {nombre:'💧', id:'boton-agua'},
        {nombre:'💧', id:'boton-agua'},
        {nombre:'👊🏻', id:'boton-puño'},
    ]
    hipodogue.ataques.push(...HIPODOGUE_ATAQUE)
    


    const CAPIPEPO_ATAQUE = [
        {nombre:'🌿', id:'boton-planta'},
        {nombre:'🌿', id:'boton-planta'},
        {nombre:'👊🏻', id:'boton-puño'},              
    ]
    capipepo.ataques.push(...CAPIPEPO_ATAQUE)
    

    const RATIGUEYA_ATAQUE = [
        {nombre:'🔥', id:'boton-fuego'},
        {nombre:'🔥', id:'boton-fuego'},
        {nombre:'👊🏻', id:'boton-puño'}, 
    ]
    ratigueya.ataques.push(...RATIGUEYA_ATAQUE) 
        




    mokemones.push(hipodogue, capipepo, ratigueya)





    function iniciarJuego() {
    
        sectionAtaque.style.display = 'none'
        sectionVerMapa.style.display = 'none'

        mokemones.forEach((mokemon) => {
            opcionDeMokemones = `
            <input type="radio" id="${mokemon.nombre}" name="mascotas"/>
                <label class="tarjeta-mokemon" for="${mokemon.nombre}">
                    <p>${mokemon.nombre}</p>
                    <img src="${mokemon.foto}" alt="${mokemon.nombre}">
                </label>
            `
            contenedorTarjetas.innerHTML += opcionDeMokemones

            inputHipodogue = document.getElementById('Hipodogue')
            inputCapipepo = document.getElementById('Capipepo')
            inputRatigueya = document.getElementById('Ratigueya')
        })
        
        botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador) 
        botonReiniciar.addEventListener('click', reiniciarJuego )  
        
        unirseAlJuego()
    }


    function unirseAlJuego() {

        // Realiza una solicitud a la URL 'http://localhost:8080/unirse'.
        
        fetch('http://mokemon.vercel.app/unirse')
            //Promesa del Fitch qie recibe una funcion que es un callback que se va a ejecutar una vez se haya resuelto la respuesta del servidor (recibe como primer argumento esa respuesta "res")
            .then(function (res) {
                if(res.ok) {
                    //Sin esto se recibe la respuesta (res) con el objeto "response" con propiedades y datos que no necesitamos. Por eso pedimos que nos de solo el texto con su id
                    res.text()
                        //En el argumento respuesta se encuentra el resultado definitivo
                        .then(function (respuesta) {  
                            console.log(respuesta) 
                            jugadorId = respuesta      
                        })
                }   
            })

    }



    function seleccionarMascotaJugador() {
        
    
        if(inputHipodogue.checked){
            mascotaJugador = inputHipodogue.id
            spanMascotaJugador.innerHTML = inputHipodogue.id
        } else if (inputCapipepo.checked){
            mascotaJugador = inputCapipepo.id
            spanMascotaJugador.innerHTML = inputCapipepo.id
        } else if (inputRatigueya.checked){
            mascotaJugador = inputRatigueya.id
            spanMascotaJugador.innerHTML = inputRatigueya.id
        } else {
            alert("Selecciona alguna mascota")
            return
        }  
        
        sectionMascota.style.display = 'none'

        //Para enviar al servidor
        seleccionarMokemon(mascotaJugador)
        
        extraerAtaque(mascotaJugador)
        sectionVerMapa.style.display = 'flex'
        iniciarMapa()
        
    }

    

    function seleccionarMokemon(mascotaJugador) {
        const serverUrl = process.env.SERVER_URL || 'http://localhost:8080'
        fetch(`${serverUrl}/mokemon/${jugadorId}`, {
            method: "post",
            headers: {"Content-Type" : "application/json"},
            body : JSON.stringify({
                mokemon: mascotaJugador
            })

        })
    }



    function extraerAtaque(mascotaJugador){
        let ataques
        for (let i = 0; i < mokemones.length; i++) {
            if (mascotaJugador === mokemones[i].nombre) {
                ataques = mokemones[i].ataques
            }  
        }
        mostrarAtaques(ataques)
    }


    
    function mostrarAtaques(ataques){

        ataques.forEach((ataque) => {
            opcionDeAtaques = `
            <button id=${ataque.id} class="boton-de-ataque">${ataque.nombre}</button>
            `
            contenedorAtaques.innerHTML += opcionDeAtaques 
            
        })

        botonFuego = document.getElementById("boton-fuego")
        botonAgua = document.getElementById("boton-agua")
        botonPlanta = document.getElementById("boton-planta")
        botonPuño = document.getElementById("boton-puño")

        contenedorAtaques.addEventListener('click', function (event) {
            let target = event.target;
            if (target.classList.contains('boton-de-ataque')) {
                const ataqueId = target.id;
                if (ataqueId === 'boton-fuego') {
                    ataqueJugador.push('🔥')
                    target.style.background = "#363062"
                    target.disabled = true
                    
                } else if (ataqueId === 'boton-agua') {
                    ataqueJugador.push('💧')
                    target.style.background = "#363062"
                    target.disabled = true
                    
                } else if (ataqueId === 'boton-planta') {
                    ataqueJugador.push('🌿')
                    target.style.background = "#363062"
                    target.disabled = true
                    
                } else if (ataqueId === 'boton-puño'){
                    ataqueJugador.push('👊🏻')
                    target.style.background = "#363062"
                    target.disabled = true  
                }

                

                //console.log(ataqueJugador)
                if(ataqueJugador.length === 3) {
                    enviarAtaques()
                    console.log("ataques elegidos por jugador "+ ataqueJugador)
                //ataqueAleatorioEnemigo()    

                }     
            }
        }); 
    }


    //CAMBIE RECIEN
   /* function secuenciaAtaque() {
        botones.forEach((boton) => {boton.addEventListener('click',(e)=> {
            if(e.target.textContent==='🔥') {
                ataqueJugador.push('🔥')
                boton.style.background='#112f58'
                boton.disabled=true

                }else if(e.target.textContent==='💧') {
                    ataqueJugador.push('💧')
                    boton.style.background='#112f58'
                    boton.disabled=true
                } else if(e.target.textContent==='🌿') {
                    ataqueJugador.push('🌿')
                    boton.style.background='#112f58'
                    boton.disabled=true
                } else {
                ataqueJugador.push('👊🏻')
                console.log(ataqueJugador)
                boton.style.background='#112f58'
                boton.disabled=true
                }
         if((ataqueJugador.length === 3) && (ataqueEnemigo.length === 3)) {
                 enviarAtaques()}})})}
*/





    function enviarAtaques () {
        fetch(`http://192.168.0.98:8080/mokemon/${jugadorId}/ataques`, {
            method: "post",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                ataques: ataqueJugador
            })
        })
        intervalo = setInterval(obtenerAtaque, 50)
    }



    function obtenerAtaque() {
        fetch(`http://192.168.0.98:8080/mokemon/${enemigoId}/ataques`)
            .then(function(res) {
                if(res.ok) {
                    res.json()
                        .then(function({ ataques }) {
                            if(ataques.length === 3) {
                                ataqueEnemigo = ataques
                                console.log(ataqueEnemigo)
                                if ((ataqueJugador.length === 3) && (ataqueEnemigo.length === 3 )){
                                    combate()
                                }    
                            }
                        })
                }
            })
    }




    function seleccionarMascotaEnemigo(enemigo) {  //El enemigo esta llegando sin el ataque generado, por eso ataquesMokemonEnemigo esta vacio
        //console.log(enemigo)
        spanMascotaEnemigo.innerHTML = enemigo.nombre
        ataquesMokemonEnemigo = enemigo.ataques  
        //secuenciaAtaque()
        console.log(ataquesMokemonEnemigo)            
    }




   /* function ataqueAleatorioEnemigo (){
        
        
       
            ataqueEnemigo.push (ataquesMokemonEnemigo[0].nombre)    
      
            ataqueEnemigo.push(ataquesMokemonEnemigo[1].nombre)    
       
            ataqueEnemigo.push(ataquesMokemonEnemigo[2].nombre)
     
            ataqueEnemigo.push(ataquesMokemonEnemigo[3].nombre)
       
        
        
        
       
    }*/



    /*function iniciarPelea() {
        if ((ataqueJugador.length === 3) && (ataqueEnemigo.length ===3 )){
            combate()
        }    
    }*/



    function indexAmbosOponentes(jugador, enemigo){
        indexAtaqueJugador = ataqueJugador[jugador]
        indexAtaqueEnemigo = ataqueEnemigo[enemigo]
        

    }

    function combate() {
        clearInterval(intervalo)
    
        for (let i = 0; i < ataqueJugador.length; i++) {
            if(ataqueJugador[i] === ataqueEnemigo[i]){
                indexAmbosOponentes(i, i)
                crearMensaje("EMPATASTE") 
            } else if((ataqueJugador[i] === '🔥' && ataqueEnemigo[i] === '🌿') ||
                    (ataqueJugador[i] === '💧' && ataqueEnemigo[i] === '🔥') ||
                    (ataqueJugador[i] === '🌿' && ataqueEnemigo[i] === '💧' ) ||
                    (ataqueJugador[i] === '👊🏻')
                    ) {
                        indexAmbosOponentes(i, i)
                        victoriasJugador++
                        spanVidaJugador.innerHTML = victoriasJugador
                        crearMensaje("GANASTE") 
            } else {
                indexAmbosOponentes(i, i)
                victoriasEnemigo++
                spanVidaEnemigo.innerHTML = victoriasEnemigo
                crearMensaje("PERDISTE") 
            }
        }
        revisarVidas()
    }



    function revisarVidas(){
        if(victoriasJugador == victoriasEnemigo) {
        crearMensajeFinal("Esto fue un EMPATE! ⭕" )
        } else if(victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("Felicitaciones GANASTE! 🏆")    
        } else {
        crearMensajeFinal("Lo siento, PERDISTE! ❌")  
        }
    }


    function crearMensaje(resultadoCombate) {

        let nuevoAtaqueDelJugador = document.createElement('p')
        nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
        ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)

        let nuevoAtaqueDelEnemigo = document.createElement('p')
        nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo
        ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)
        
    
    }


    function crearMensajeFinal(resultadoCombate) {
        
        sectionReiniciar.style.display = 'block'

        sectionMensajes.innerHTML = ("El combate a terminado " + resultadoCombate)
    
    }


    function reiniciarJuego(){
        location.reload()
    }


    function aleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1 ) + min)
    } 


    function pintarCanva() {
        mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
        mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
        lienzo.clearRect(0, 0, mapa.width, mapa.height)
        lienzo.drawImage (
            mapaBackground,
            0,
            0,
            mapa.width,
            mapa.height,
        )
        
        mascotaJugadorObjeto.pintarMokemon()

        enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)

        //console.log(mokemonesEnemigos)
        mokemonesEnemigos.forEach(function(mokemon) {
            mokemon.pintarMokemon()
            revisarColision(mokemon)
        })
       

        /*if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !==0) {
            revisarColision(mascotaEnemigo)
            
        }*/
    }


function enviarPosicion (x, y) {
    fetch(`http://192.168.0.98:8080/mokemon/${jugadorId}/posicion`, {
        method: "post",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({
            x : x,
            // o
            y : y
        })

    })

        .then(function(res) {
            if(res.ok) {
                res.json()
                    .then(function({enemigos}){ //res.enemigos
                        //console.log(enemigos)
                        mokemonesEnemigos = enemigos.map(function(enemigo){
                            let mokemonEnemigo = null
                            if(enemigo.mokemon != undefined){
                                const mokemonNombre = enemigo.mokemon.nombre || ""
                                
                                if(mokemonNombre === "Hipodogue"){
                                    mokemonEnemigo = new Mokemon('Hipodogue', './imagenes/mokepons_mokepon_hipodoge_attack.png', 5, './imagenes/hipodoge.png', enemigo.id)
                                } else if (mokemonNombre === "Capipepo"){
                                    mokemonEnemigo = new Mokemon('Capipepo', './imagenes/mokepons_mokepon_capipepo_attack.png', 5, './imagenes/capipepo.png', enemigo.id)
                                } else if (mokemonNombre === "Ratigueya"){
                                    mokemonEnemigo = new Mokemon('Ratigueya', './imagenes/mokepons_mokepon_ratigueya_attack.png', 5, './imagenes/ratigueya.png', enemigo.id )
                                }

                                

                                mokemonEnemigo.x = enemigo.x
                                mokemonEnemigo.y = enemigo.y
                                //mokemonEnemigo.pintarMokemon()
                               
                                return mokemonEnemigo    
                            }
                        })
                        //console.log(mokemonesEnemigos)
                        
                        
    
                    })
                    /*.then(function(respuesta){
                        respuesta.enemigos
                    }) */
            }
        })
}





    function moverDerecha() {
        mascotaJugadorObjeto.velocidadX = 5
    }
    function moverIzquierda() {
        mascotaJugadorObjeto.velocidadX = -5
    }
    function moverAbajo() {
        mascotaJugadorObjeto.velocidadY = 5
    }
    function moverArriba() {
        mascotaJugadorObjeto.velocidadY = -5
    }
    function detenerMovimiento() {
        mascotaJugadorObjeto.velocidadX = 0
        mascotaJugadorObjeto.velocidadY = 0
    }

    function sePresionoUnaTecla(event) {
    switch (event.key) {
            case 'ArrowUp':
            case"w":
            moverArriba()
            break;
            case 'ArrowDown':
            case"s":
            moverAbajo()
            break;
            case 'ArrowLeft':
            case"a":
            moverIzquierda()
            break;
            case 'ArrowRight':
            case"d":
            moverDerecha()
            break;
    
        default:
            break;
    }
    }

    function iniciarMapa() {
        

        
        
        mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
        intervalo = setInterval(pintarCanva, 50)

        window.addEventListener('keydown', sePresionoUnaTecla) 
        window.addEventListener('keyup', detenerMovimiento)

    }

    function obtenerObjetoMascota() {
    
        for (let i = 0; i < mokemones.length; i++) {
            if (mascotaJugador === mokemones[i].nombre) {
                return mokemones[i]
            }  
        }
    }

    function revisarColision(enemigo) {

        const arribaEnemigo = enemigo.y
        const abajoEnemigo = enemigo.y + enemigo.alto
        const derechaEnemigo = enemigo.x + enemigo.ancho
        const izquierdaEnemigo = enemigo.x 

        const arribaMascota = mascotaJugadorObjeto.y
        const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
        const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
        const izquierdaMascota = mascotaJugadorObjeto.x 

        if(
            abajoMascota < arribaEnemigo ||
            arribaMascota > abajoEnemigo ||
            derechaMascota < izquierdaEnemigo ||
            izquierdaMascota > derechaEnemigo
        ) {
            return
        }
        detenerMovimiento()
        clearInterval(intervalo)

        enemigoId = enemigo.id

        sectionAtaque.style.display = 'flex'
        sectionVerMapa.style.display = 'none'
        seleccionarMascotaEnemigo(enemigo)
    
    }


    window.addEventListener('load', iniciarJuego)