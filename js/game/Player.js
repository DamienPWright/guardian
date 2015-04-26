function Player(X, Y){
    Phaser.Sprite.call(this, game, X, Y, 'playerchar');
    game.physics.arcade.enable(this);
    this.body.bounce.y = 0;
    this.body.linearDamping = 1;
    this.body.collideWorldBounds = true;
    this.gamestate = game.state.getCurrentState();
    
    this.dir = 0; // 0 for left, 1 for right.
    
    this.attackBox = {w: 16, h: 16};
    this.attackTimer;
    
    game.input.keyboard.addKey(32).onDown.add(function(){this.attack()}, this);
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
    //set facing
    if(this.body.velocity.x > 0){
        this.dir = 1;
    }else if(this.body.velocity.x < 0){
        this.dir = 0;
    }
    //attack
    if( this.gamestate.spaceBar.isDown){
       
    }
}

Player.prototype.attack = function(evt){
     //create hitbox depending on facing.
     var hbx;
     var hby;
     if(this.dir == 0){
         hbx = this.x - this.attackBox.w;
     }else{
         hbx = this.x + this.width;
     }
     hby = this.y + (this.height / 2) - this.attackBox.h / 2;
     this.gamestate.createHitBox(hbx, hby, this.attackBox.w, this.attackBox.h, true, 100);
}