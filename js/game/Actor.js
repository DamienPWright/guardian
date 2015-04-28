function Actor(X, Y, key, HP){
    Phaser.Sprite.call(this, game, X, Y, key);
    this.maxHP = 3;
    if(HP){
        this.maxHP = HP;
    }
    this.blinkTimer = 30;
    this.blinkCount = 0;
    this.blinking = false;
}

Actor.prototype = Object.create(Phaser.Sprite.prototype);
Actor.prototype.constructor = Actor;

Actor.prototype.updateActor = function(){
    if(this.blinking){
        this.blinkCount++;
        if(this.blinkCount % 3 != 2){
            this.renderable = false;
        }else{
            this.renderable = true;
        }
        if(this.blinkCount >= this.blinkTimer){
            this.blinkCount = 0;
            this.renderable = true;
            this.blinking = false;
        }
    }
}