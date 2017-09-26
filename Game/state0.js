demo.state0 = function(){};
demo.state0.prototype = {
    preload: function(){
        // Add this in every preload function.  All necessary images for the stage should be in loadImages()
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
        
        placeFruit(500,500, "redfruit");
        
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
    // state 2 doesnt work currently 
    addKeyCallback(Phaser.Keyboard.TWO, changeState, 2);
}