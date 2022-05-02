var juego = new Phaser.Game(290, 540, Phaser.CANVAS, 'runner');

if(juego.hidden = true){
    juego.state.add('Terminado',Terminado);
    juego.state.start('Terminado');
}

/*juego.state.add('Juego', Juego);
juego.state.add('Terminado',Terminado);
juego.state.start('Juego');*/