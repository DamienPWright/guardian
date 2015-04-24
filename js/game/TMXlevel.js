function TmxLevel(){
   this.map;
   this.tileset;
   this.layer;
   this.wall_layer;
   this.bkg_layer;
   this.p;
   this.cursors;
    
}

TmxLevel.prototype.preload = function() {
   game.load.tilemap('circuitboard', 'assets/tilemap/testmap.json', null, Phaser.Tilemap.TILED_JSON);
   game.load.image('circuitboard_tiles', 'assets/img/tileset/webgametiles.png');
   game.load.spritesheet('playerchar', 'assets/img/sprites/player.png', 14, 16)
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
    
   //make player
   player = game.add.sprite(0,0,'playerchar');
   game.physics.arcade.enable(player);
   player.body.bounce.y = 0;
   game.physics.arcade.gravity.y = 250;
   player.body.collideWorldBounds = true;
   this.p = player;
   game.camera.follow(player);
}

TmxLevel.prototype.update = function() {
   game.physics.arcade.collide(this.p, this.wall_layer);
}

TmxLevel.prototype.render = function(){
    pixel.context.drawImage(game.canvas, 0, 0, game.width, game.height, 0, 0, pixel.width, pixel.height);
}