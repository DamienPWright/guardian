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
    
    this.dir = 0; // 0 for left, 1 for right.
    this.prevdir = 1;
    //=====
    //States
    //=====
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
        
        if(this.actor.dir == 1){
            //console.log(this.actor.checkSeekBox('right', player));
            if(this.actor.checkSeekBox('right', player)){
                console.log("detected right");
                this.fsm.changeState(this.actor.state_Persue);
            };
        }else{
            if(this.actor.checkSeekBox('left', player)){
                console.log("detected left");
                this.fsm.changeState(this.actor.state_Persue);
            };
        }
    }
    
    //Wander state
    this.state_Wander = new ActorState(this);
    this.state_Wander.onEnter = function(){
       //this.dir = Math.round(Math.random() * 1);
       if(this.actor.prevdir == 1){
           this.actor.dir = 0;
       }else{
           this.actor.dir = 1;
       }
       this.wanderTimer = 50;
       this.wanderCount = 0;
    }
    this.state_Wander.onExit = function(){
        this.actor.body.velocity.x = 0;
        this.prevdir = this.actor.dir;
        this.actor.prevdir = this.actor.dir;
    }
    this.state_Wander.update = function(){
        this.wanderCount++;
        if(this.actor.dir == 1){
            this.actor.body.velocity.x = 55;
            if(this.actor.checkSeekBox('right', player)){
                console.log("detected right");
                this.fsm.changeState(this.actor.state_Persue);
            };
        }else{
            this.actor.body.velocity.x = -55;
            if(this.actor.checkSeekBox('left', player)){
                console.log("detected left");
                this.fsm.changeState(this.actor.state_Persue);
            };
        }
        
        if(this.wanderCount > this.wanderTimer){
            this.fsm.changeState(this.actor.state_Idle);
        }
    }
    
    //persue state
    this.state_Persue = new ActorState(this);
    this.state_Persue.onEnter = function(){
        this.persueTime = 120;
        this.persueCount = 0;
    }
    
    this.state_Persue.onExit = function(){
        this.persueCount = 0;
    }
    
    this.state_Persue.update = function(){
        this.persueCount++;
        
        if(this.actor.dir == 1){
            if(this.actor.checkSeekBox('right', player)){
                this.persueCount = 0;
            };
        }else{
            if(this.actor.checkSeekBox('left', player)){
                this.persueCount = 0;
            };
        }
        
        if(this.persueCount >= this.persueTime){
           this.fsm.changeState(this.actor.state_Idle);
        }
        
        if(player.x > this.actor.x){
            this.actor.body.velocity.x = 65;
        }
        if(player.x < this.actor.x){
            this.actor.body.velocity.x = -65;
        }
    }
   
   //attack state
   this.state_Attack = new ActorState(this);
   this.state_Attack.onEnter = function(){
       
   }
   this.state_Attack.onExit = function(){
       
   }
   this.state_Attack.onEnter = function(){
       
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

