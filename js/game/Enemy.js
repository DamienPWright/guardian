function Enemy(X, Y){
    Phaser.Sprite.call(this, game, X, Y, 'enemytest');
    //this.x = X;
    //this.y = Y;
    //this.width = W;
    //this.height = H;
    this.fsm = new FiniteStateMachine();
    game.physics.arcade.enable(this);
    this.body.bounce.y = 0;
    this.body.linearDamping = 1;
    this.body.collideWorldBounds = true;
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function(){
    this.fsm.update();
}