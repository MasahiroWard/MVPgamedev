var demo = {}, player, cursors;
var stomach_fruits = {};
var stomach_icons = {};
var stomach_tracker = {};
var map_redfruits = {}, map_bluefruits = {}, map_yellowfruits = {}, map_orangefruits = {}, map_purplefruits = {}, map_greenfruits = {};
var fruit_types = ["red", "blue", "yellow", "orange", "purple", "green"];
var clrs = {"red": 0xff0000, "blue": 0x0000ff, "yellow": 0xffff00, "orange": 0xff8000, "purple": 0x6600cc, "green": 0x00b33c}
var birds_group = {}, snakes_group = {};
var cat_boss, cat_boss_health;
var catMoveTimeStamp = 0, catHitTimeStamp = 0;

demo.state0 = function(){};
demo.state0.prototype = {
    preload: function(){
        loadImages()
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#FFFFFF';
        addChangeStateEventListeners();
        
        createChameleon(200,game.world.height);
        cursors = game.input.keyboard.createCursorKeys();
        
        // Init Stomach
        createInventory();
        
        make_fruit_groups();
        make_enemy_groups();
        
        placeRedFruit(500,500);
        placeRedFruit(500,300);
        placeBlueFruit(400,300);
        placeYellowFruit(300,300);
        placeOrangeFruit(200,200);
        placePurpleFruit(200,300);
        placeGreenFruit(200,400);
        
        placeBird(200, 100, clrs["red"]);
        place_cat_boss(400, 100);
        
    },
    update: function(){
        chameleonmove();
        moveBird();
        cat_boss_move();
        stomach_icons.red.events.onInputDown.add(chameleonred,this);
        stomach_icons.blue.events.onInputDown.add(chameleonblue,this);
        stomach_icons.yellow.events.onInputDown.add(chameleonyellow,this);
        stomach_icons.orange.events.onInputDown.add(chameleonorange,this);
        stomach_icons.purple.events.onInputDown.add(chameleonpurple,this);
        stomach_icons.green.events.onInputDown.add(chameleongreen,this);
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
    addKeyCallback(Phaser.Keyboard.TWO, changeState, 2)
}