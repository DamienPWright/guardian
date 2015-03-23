function TitleScreen(game){
    this.game = game;
    this.cursors;
    this.enterKey;
}

TitleScreen.prototype.preload = function(){
    
}

TitleScreen.prototype.create = function(){
    scoreText = game.add.text(16, 16, 'Test Title Screen', {fontSize: '32px', fill: '#FFF'});
    
    this.cursors = game.input.keyboard.createCursorKeys();
    this.enterKey =  game.input.keyboard.addKey(13)
    console.log(game);
}

TitleScreen.prototype.update = function() {
    if(this.enterKey.isDown){
        game.state.start('emptylevel');
    }
}
