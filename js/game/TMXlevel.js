function TmxLevel(){
   this.map;
   this.tileset;
   this.layer;
   this.wall_layer;
   this.bkg_layer;
  
   this.cursors;
   this.spaceBar;
   
    //actors and groups
    this.p;
    this.enemies;
    this.bullets;
    this.hitboxes_friendly;
    this.hitboxes_unfriendly;
    this.hitboxes_seek;
    this.items;
    
}

TmxLevel.prototype.preload = function() {
   game.load.tilemap('circuitboard', 'assets/tilemap/testmap.json', null, Phaser.Tilemap.TILED_JSON);
   game.load.image('circuitboard_tiles', 'assets/img/tileset/webgametiles.png');
   //sprite images
   game.load.spritesheet('playerchar', 'assets/img/sprites/player.png', 14, 16);
   game.load.spritesheet('enemytest', 'assets/img/sprites/enemytest.png', 12, 16);
   game.load.spritesheet('blanksprite', 'assets/img/sprites/blanksprite.png', 1, 1);
}

TmxLevel.prototype.create = function() {
    this.spaceBar =  game.input.keyboard.addKey(13);
    
    
   scoreText = game.add.text(16, 16, 'Level 1', {fontSize: '32px', fill: '#FFF'});
   game.physics.startSystem(Phaser.Physics.ARCADE);
   game.stage.backgroundColor = "#000000";
   this.map = game.add.tilemap('circuitboard');
   this.map.addTilesetImage( 'webgametiles', 'circuitboard_tiles');
   this.bkg_layer = this.map.createLayer('bkg');
   this.wall_layer = this.map.createLayer('wall');
   this.map.setCollisionByExclusion([0], true, this.wall_layer)
   this.wall_layer.resizeWorld();
  
   init();
    //init sprite groups
    this.enemies = game.add.group();
    this.hitboxes_unfriendly = game.add.group();
    this.hitboxes_friendly = game.add.group();
    this.hitboxes_seek = game.add.group();
    
   //make player
   playerchar = new Player(0,0);
   //player = game.add.sprite(0,0,'playerchar');
   player = game.add.existing(playerchar)
   //game.physics.arcade.enable(player);
   //player.body.bounce.y = 0;
   //player.body.linearDamping = 1;
   game.physics.arcade.gravity.y = 250;
   //player.body.collideWorldBounds = true;
   this.p = player;
   game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER);
    //controls
    this.cursors = game.input.keyboard.createCursorKeys();
};

TmxLevel.prototype.update = function() {
    game.physics.arcade.collide(this.p, this.wall_layer);
    game.physics.arcade.collide(this.enemies, this.wall_layer);
   
    //this.processPlayer();
};

TmxLevel.prototype.render = function(){
     //debug
    this.hitboxes_friendly.forEachExists(this.renderGroup, this, 0);
    this.hitboxes_unfriendly.forEachExists(this.renderGroup, this, 1);
    this.hitboxes_seek.forEachExists(this.renderGroup, this, 2);
   pixel.context.drawImage(game.canvas, 0, 0, game.width, game.height, 0, 0, pixel.width, pixel.height);
   
};

TmxLevel.prototype.debug = function(){
    
}

TmxLevel.prototype.renderGroup = function(member, n){
    switch(n){
        case 0:
            game.debug.body(member, 'rgba(0,255,0,0.4)');
            break;
        case 1:
            game.debug.body(member, 'rgba(255,0,0,0.4)');
            break;
        case 2:
            game.debug.body(member, 'rgba(0,200,200,0.4)');
            break;
    }
   
}

TmxLevel.prototype.processPlayer = function(){
    this.p.body.velocity.x = 0;
    if (this.cursors.up.isDown)
    {
        if (this.p.body.onFloor())
        {
            this.p.body.velocity.y = -150;
        }
    }

    if (this.cursors.left.isDown)
    {
        this.p.body.velocity.x = -75;
    }
    else if (this.cursors.right.isDown)
    {
        this.p.body.velocity.x = 75;
    }
    
    //attack
    if(this.spaceBar.isDown){
    }
};

TmxLevel.prototype.createHitBox = function(X, Y, W, H, friendly, lifespan, seek){
    var spr = game.add.sprite(X, Y, 'blanksprite');
    game.physics.enable(spr, Phaser.Physics.ARCADE);
    spr.body.immovable = true;
    spr.body.allowGravity = false;
    spr.width = W;
    spr.height = H;
    spr.lifespan = lifespan;
    //spr.body.setSize(W, H, 0, 0);
    spr.renderable = false;
    //spr.visible = false;
    if(seek){
        this.hitboxes_seek.add(spr);
        return spr;
    }
    if(friendly){
        this.hitboxes_friendly.add(spr);
        console.log("added?")
    }else{
        this.hitboxes_unfriendly.add(spr);
    }
    return spr;
};