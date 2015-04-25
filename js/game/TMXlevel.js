function TmxLevel(){
   this.map;
   this.tileset;
   this.layer;
   this.wall_layer;
   this.bkg_layer;
  
   this.cursors;
    
    //actors and groups
    this.p;
    this.enemies;
    this.bullets;
    this.hitboxes_friendly;
    this.hitboxes_unfriendly;
    this.items;
}

TmxLevel.prototype.preload = function() {
   game.load.tilemap('circuitboard', 'assets/tilemap/testmap.json', null, Phaser.Tilemap.TILED_JSON);
   game.load.image('circuitboard_tiles', 'assets/img/tileset/webgametiles.png');
   //sprite images
   game.load.spritesheet('playerchar', 'assets/img/sprites/player.png', 14, 16);
   game.load.spritesheet('enemytest', 'assets/img/sprites/enemytest.png', 12, 16);
}

TmxLevel.prototype.create = function() {
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
    
   //make player
   player = game.add.sprite(0,0,'playerchar');
   game.physics.arcade.enable(player);
   player.body.bounce.y = 0;
   player.body.linearDamping = 1;
   game.physics.arcade.gravity.y = 250;
   player.body.collideWorldBounds = true;
   this.p = player;
   game.camera.follow(player, Phaser.Camera.FOLLOW_PLATFORMER);
    //controls
    this.cursors = game.input.keyboard.createCursorKeys();
};

TmxLevel.prototype.update = function() {
    game.physics.arcade.collide(this.p, this.wall_layer);
    game.physics.arcade.collide(this.enemies, this.wall_layer);
   
    this.processPlayer();
};

TmxLevel.prototype.render = function(){
    pixel.context.drawImage(game.canvas, 0, 0, game.width, game.height, 0, 0, pixel.width, pixel.height);
};

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
};

TmxLevel.prototype.createHitBox = function(X, Y, key, friendly, lifespan){
    var spr = game.add.sprite(X, Y, key);
    spr.lifespan = lifespan;
    if(friendly){
        this.hitboxes_friendly.add(spr);
        console.log("added?")
    }else{
        this.hitboxes_unfriendly.add(spr);
    }
};