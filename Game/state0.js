var demo = {}, player, cursors;
demo.state0 = function(){};
demo.state0.prototype = {
    preload: function(){
        game.load.spritesheet('dude', 'assets/spritesheets/dude.png',32,48);
        game.load.image('sky', 'assets/backgrounds/sky.png');
        game.load.image('redfruit', 'assets/sprites/redfruit.jpg');
        game.load.image('bluefruit', 'assets/sprites/bluefruit.jpg');
        game.load.image('yellowfruit', 'assets/sprites/yellowfruit.jpg');
        game.load.image('orangefruit', 'assets/sprites/orangefruit.jpg');
        game.load.image('purplefruit', 'assets/sprites/purplefruit.jpg');
        game.load.image('greenfruit', 'assets/sprites/greenfruit.jpg');
        
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#0000FF';
        addChangeStateEventListeners();
        game.add.sprite(0,0,'sky');
        game.add.text(300,400,"Press 1 to change states.")
        
        player = game.add.sprite(32,game.world.height/2,'dude');
        game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;
        player.body.gravity.y = 300;
        cursors = game.input.keyboard.createCursorKeys();
        game.add.text(100,200,"Use arrow keys to move.");
    },
    update: function(){
        player.body.velocity.x = 0;
        
        if (cursors.left.isDown) {
            player.body.velocity.x = -200;
        } else if (cursors.right.isDown) {
            player.body.velocity.x = 200;
        } else if (cursors.up.isDown) {
            player.body.velocity.y = -200;
        }

    }
};

function changeState(i, stateNum){
    console.log('state' + stateNum);
    game.state.start('state' + stateNum);
}

function addKeyCallback(key, fn, args){
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
}

function addChangeStateEventListeners(){
    addKeyCallback(Phaser.Keyboard.ZERO, changeState, 0);
    addKeyCallback(Phaser.Keyboard.ONE, changeState, 1);
}