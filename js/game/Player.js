function Player(X, Y){
    Phaser.Sprite.call(this, game, X, Y, 'playerchar');
    game.physics.arcade.enable(this);
    this.body.bounce.y = 0;
    this.body.linearDamping = 1;
    this.body.collideWorldBounds = true;
    this.gamestate = game.state.getCurrentState();
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(){
    this.processControls();
}

Player.prototype.processControls = function(){
    this.body.velocity.x = 0;
    if (this.gamestate.cursors.up.isDown)
    {
        if (this.body.onFloor())
        {
            this.body.velocity.y = -150;
        }
    }

    if (this.gamestate.cursors.left.isDown)
    {
        this.body.velocity.x = -75;
    }
    else if (this.gamestate.cursors.right.isDown)
    {
        this.body.velocity.x = 75;
    }
    
    //attack
    if( this.gamestate.spaceBar.isDown){
    }
}