var demo = {}, player, cursors;
var stomach_fruits = {};
var stomach_icons = {};
var stomach_tracker = {};
var map_fruit = {};
var fruit_types = ["red", "blue", "yellow", "orange", "purple", "green"];
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
        
        createChameleon(200,game.world.height)
        cursors = game.input.keyboard.createCursorKeys();
        
        // Init Stomach
        game.add.text(20, 0, "Stomach")
        createInventory()
        
        map_fruit = game.add.group();
        map_fruit.enableBody = true;
        var redfruit = map_fruit.create(500,500,"redfruit");
        redfruit.scale.setTo(0.2,0.2);
        
    },
    update: function(){
        chameleonmove()   
    }    
};



function getfruit(player, redfruit){
    redfruit.kill();
    stomach_fruits.red += 1;
    stomach_tracker.red.text = stomach_fruits.red;
}


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