var demo = {}, player, cursors;
var stomach_fruits = {};
var stomach_icons = {};
var stomach_tracker = {};
var map_fruit = {};
var fruit_types = ["red", "blue", "yellow", "orange", "purple", "green"];
demo.state0 = function(){};
demo.state0.prototype = {
    preload: function(){
        loadImages()
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
        placeRedFruit(500,500);
        placeRedFruit(500,300)
        
    },
    update: function(){
        chameleonmove()   
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