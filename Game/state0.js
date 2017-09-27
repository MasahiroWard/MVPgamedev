demo.state0 = function(){};
demo.state0.prototype = {
    preload: function(){
        // Add this in every preload function.  All necessary images for the stage should be in loadImages()
        loadImages();
        loadCatBoss()
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#FFFFFF';
        addChangeStateEventListeners();
        
        createChameleon(200,game.world.height);
        cursors = game.input.keyboard.createCursorKeys();
        
        // Init Stomach, args are x&y of top left corner of inventory
        createInventory(400,25);
        
        make_fruit_groups();
        make_enemy_groups();
        
        placeFruit(500,500, "redfruit");
        placeBird(200, 100, "red");
        place_cat_boss(400, 100);
        
    },
    update: function(){
        chameleonmove();
        moveBird();
        cat_boss_move();
        /*
        for (fruit in fruit_colors){
            clr = fruit_colors[fruit];
            stomach_icons[clr].events.onInputDown.add(chameleon_change_color, {color:clr});
        } */   
    }
};

