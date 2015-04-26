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

    this.seekBoxSize = {w: 50, h: 20};
    this.seekBox = game.state.getCurrentState().createHitBox(this.x, this.y, this.seekBoxSize.w, this.seekBoxSize.h, false, 0, true);
    //States
    //Idle state
    this.state_Idle = new ActorState(this);
    this.state_Idle.onEnter = function(){
       this.idleTimer = 50;
       this.idleCount = 0;
    }
    this.state_Idle.onExit = function(){
    }
    this.state_Idle.update = function(){
        this.idleCount++;
        if(this.idleCount > this.idleTimer){
            this.fsm.changeState(this.actor.state_Wander);
           
        }
    }
    //Wander state
    this.state_Wander = new ActorState(this);
    this.state_Wander.onEnter = function(){
       //this.dir = Math.round(Math.random() * 1);
       this.prevdir;
       if(!this.prevdir){
           this.dir = 1;
       }
       this.wanderTimer = 50;
       this.wanderCount = 0;
    }
    this.state_Wander.onExit = function(){
        this.actor.body.velocity.x = 0;
        this.prevdir = this.dir;
        if(this.dir == 1){
           this.dir = 0;
        }else{
           this.dir = 1;
        }
    }
    this.state_Wander.update = function(){
        this.wanderCount++;
        if(this.dir == 1){
            this.actor.body.velocity.x = 55;
            if(this.actor.checkSeekBox('right', player)){
                console.log("detected right");
            };
        }else{
            this.actor.body.velocity.x = -55;
            if(this.actor.checkSeekBox('left', player)){
                console.log("detected left");
            };
        }
        
        if(this.wanderCount > this.wanderTimer){
            this.fsm.changeState(this.actor.state_Idle);
        }
    }
    
    //set initial state
    this.fsm.changeState(this.state_Idle);
}

Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function(){
    this.fsm.update();
}

Enemy.prototype.checkSeekBox = function(posKey, target){
    var detected = false;
    switch(posKey){
        case 'left':
            this.seekBox.x = this.x + (this.width/2) - this.seekBoxSize.w;
            this.seekBox.y = this.y + (this.height / 2) - (this.seekBoxSize.h / 2);
            break;
        case 'right':
            this.seekBox.x = this.x + (this.width/2);
            this.seekBox.y = this.y + (this.height / 2) - (this.seekBoxSize.h / 2);
            break;
        case 'centered':
            this.seekBox.x = this.x + (this.width / 2) + (this.seekBoxSize.w / 2);
            this.seekBox.y = this.y + (this.height / 2) - (this.seekBoxSize.h / 2);
            break;
    }
    if(this.seekBox.overlap(player)){
        detected = true;
    }
    return detected;
}

