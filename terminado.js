var fondo;
var startButton;
var Terminado = {
    preload: function(){
        juego.load.image('bg', 'img/bg.png');
        juego.load.image('button', 'img/button.png');
        juego.forceSingleUpdate = true;
    },
    create: function(){
        fondo = juego.add.tileSprite(0, 0, 290, 540, 'bg');
		juego.add.text(80, 200, "Gerardo Yñigo Yupanqui", {font:"15px Arial", fill:"#000"});
        startButton = juego.add.button(juego.world.width*0.5, juego.world.height*0.5, 'button', this.startGame, this, 1, 0, 2);
        startButton.anchor.set(0.5);
    },
    startGame: function() {
        juego.state.add('Juego', Juego);
        juego.state.start('Juego')
    }
};