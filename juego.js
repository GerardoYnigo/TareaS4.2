var fondo;
var carro;
var cursores;
var enemigos;
var timer;
var gasolinas;
var timerGasolina;
var puntos;
var txtPuntos;
var vidas;
var txtVidas;
var nivel;
var txtNivel;
var Juego = {
    preload: function(){
        juego.load.image('bg', 'img/bg.png');
        juego.load.image('carro', 'img/carro.png');
        juego.load.image('carroMalo', 'img/carroMalo.png');
        juego.load.image('gasolina', 'img/gas.png');
        juego.load.audio('bgMusic', 'music/fondo.mp3');
        juego.load.audio('impacto', 'music/impactoCar.mp3');
        juego.load.audio('puntoSound', 'music/puntos.mp3');
        juego.load.audio('gameOver', 'music/GameOver.mp3');
        juego.forceSingleUpdate = true;
    },
    create: function(){
        fondo = juego.add.tileSprite(0, 0, 290, 540, 'bg');
        //asignar el audio de fondo
        bgmusic = juego.add.audio('bgMusic');
		bgmusic.play('',0,0.5,true);
        carro = juego.add.sprite(juego.width/2, 496, 'carro');
        carro.anchor.setTo(0.5);
        juego.physics.arcade.enable(carro, true);
        enemigos = juego.add.group();
        enemigos.enableBody = true;
        enemigos.setBodyType = Phaser.Physics.ARCADE;
        enemigos.createMultiple(150, 'carroMalo');
        enemigos.setAll('outOfBoundsKill', true);
        enemigos.setAll('checkWorldBounds', true);
        gasolinas = juego.add.group();
        gasolinas.enableBody = true;
        gasolinas.setBodyType = Phaser.Physics.ARCADE;
        gasolinas.createMultiple(150, 'gasolina');
        gasolinas.setAll('outOfBoundsKill', true);
        gasolinas.setAll('checkWorldBounds', true);
        timer = juego.time.events.loop(1500, this.crearCarroMalo, this);
        timerGasolina = juego.time.events.loop(2000, this.crearGasolina, this);
        cursores = juego.input.keyboard.createCursorKeys(); 
        //definir puntaje
        puntos = 0;
        juego.add.text(20, 20, "Puntos: ", {font: "14px Arial", fill: "#000"});
        txtPuntos = juego.add.text(70, 20, '0', {font: "14px Arial", fill: "#000"});
        //definir vidas
        vidas = 3;
		juego.add.text(100, 20, "Vidas: ", {font:"14px Arial", fill:"#000"});
		txtVidas = juego.add.text(145, 20, "3", {font:"14px Arial", fill:"#000"});
        //definir nivel
        nivel = 1;
        juego.add.text(180, 20, "Nivel: ", {font: "14px Arial", fill: "#000"});
        txtNivel = juego.add.text(225, 20, "1", {font: "14px Arial", fill: "#000"});
        //declarar los audios 
        impacto = this.sound.add('impacto');
        puntoSound = this.sound.add('puntoSound');
        gameOver = this.sound.add('gameOver');
    },
    update: function(){
        if(puntos >=  0 && puntos < 100){
            nivel++;
            txtNivel = nivel;
            fondo.tilePosition.y += 3;
        }else if(puntos >=100 && puntos < 300){
            nivel++;
            txtNivel = nivel;
            fondo.tilePosition.y += 6;
        }else if(puntos >=300 && puntos <400 ){
            nivel++;
            txtNivel = nivel;
            fondo.tilePosition.y += 9;
        }else if(puntos >= 400 ){
			alert('GANASTE'),
            then(function() {
				location.reload();
			});
        }
        //movimiento direccional del auto y limitar la pista
        if(cursores.right.isDown && carro.position.x < 245){
            carro.position.x += 5;
        }else if(cursores.left.isDown && carro.position.x > 45){
            carro.position.x -= 5;
        }
        //agregar colision contra carros
        juego.physics.arcade.overlap(carro, gasolinas, this.colisionGasolina, null, this);
        //agregar colision con autos
        juego.physics.arcade.overlap(carro, enemigos, this.colisionEnemigo, null, this);
        //game over
        if(vidas == 0){
			bgmusic.stop();
			gameOver.play();
            alert('PERDISTE');
        }
    },
    crearCarroMalo: function(){
        var posicion = Math.floor(Math.random() * 3) + 1;
        var enemigo = enemigos.getFirstDead();
        enemigo.physicsBodyType = Phaser.Physics.ARCADE;
        enemigo.reset(posicion * 73, 0);
        if(puntos >=  0 && puntos < 100){
            enemigo.body.velocity.y = 200;
        }else if(puntos >=100 && puntos < 300){
            enemigo.body.velocity.y = 400;
        }else if(puntos >=300 ){
            enemigo.body.velocity.y = 600;
        }
        enemigo.anchor.setTo(0.5);
    },
    crearGasolina: function(){
        var posicion = Math.floor(Math.random() * 3) + 1;
        var gasolina = gasolinas.getFirstDead();
        gasolina.physicsBodyType = Phaser.Physics.ARCADE;
        gasolina.reset(posicion * 73, 0);
        if(puntos >=  0 && puntos < 100){
            gasolina.body.velocity.y = 200;
        }else if(puntos >=100 && puntos < 300){
            gasolina.body.velocity.y = 400;
        }else if(puntos >=300 ){
            gasolina.body.velocity.y = 600;
        }
        gasolina.anchor.setTo(0.5);
    },
    colisionGasolina: function(carro, gasolinas){
		gasolinas.kill();
		puntos += 40;
		txtPuntos.text = puntos;
        puntoSound.play();
	},
    colisionEnemigo: function(carro, enemigo){
        enemigo.kill();
        vidas--;
        txtVidas.text = vidas;
        impacto.play();
    },
};