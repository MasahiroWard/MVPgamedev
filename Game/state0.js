var demo = {}, player, cursors;
var stomach_fruits = {};
var stomach_icons = {};
var stomach_tracker = {};
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
        game.load.image('chameleon', 'assets/sprites/chameleon.jpg');
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#FFFFFF';
        addChangeStateEventListeners();
        
        player = game.add.sprite(32,game.world.height,'chameleon');
        player.scale.setTo(0.1,0.1)
        game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;
        player.body.gravity.y = 300;
        cursors = game.input.keyboard.createCursorKeys();
        
        // Init Stomach
        game.add.text(20, 0, "Stomach")
        
        stomach_icons.red = game.add.sprite(20,75,"redfruit");
        stomach_icons.red.scale.setTo(0.2,0.2);
        stomach_icons.blue = game.add.sprite(20,150,"bluefruit");
        stomach_icons.blue.scale.setTo(0.2,0.2);
        stomach_icons.yellow = game.add.sprite(20,225,"yellowfruit");
        stomach_icons.yellow.scale.setTo(0.1,0.1);
        stomach_icons.green = game.add.sprite(20,300,"greenfruit");
        stomach_icons.green.scale.setTo(0.1,0.1);
        stomach_icons.purple = game.add.sprite(20,375,"purplefruit");
        stomach_icons.purple.scale.setTo(0.2,0.2);
        stomach_icons.orange = game.add.sprite(20,450,"orangefruit");
        stomach_icons.orange.scale.setTo(0.2,0.2);
        
        stomach_fruits.red = 0;
        stomach_fruits.blue = 0;
        stomach_fruits.yellow = 0;
        stomach_fruits.green = 0;
        stomach_fruits.purple = 0;
        stomach_fruits.orange = 0;
        
        stomach_tracker.red = game.add.text(100,75,stomach_fruits.red);
        stomach_tracker.blue = game.add.text(100,150,stomach_fruits.blue);
        stomach_tracker.yellow = game.add.text(100,225,stomach_fruits.yellow);
        stomach_tracker.green = game.add.text(100,300,stomach_fruits.green);
        stomach_tracker.purple = game.add.text(100,375,stomach_fruits.purple);
        stomach_tracker.orange = game.add.text(100,450,stomach_fruits.orange);
        
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