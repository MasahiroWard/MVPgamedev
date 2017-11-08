// Boiler plate code for adding stage

// Declare state vars only used in this state

// Change boilerplate to whatever name
demo.bestiary = function(){};
demo.bestiary.prototype = {
    preload: function(){
        // Always include this line
        loadImages();
        
        // Make this equal to the size of the tilemap
        game.world.setBounds(0, 0, 1000, 700);
        
        // Load any tiles required for tile map
        // This should be customized for each stage
    },
    create: function(){
        
        
        // Add game background
        // change 'bg1' to whatever is required
        add_game_bg('bg1')
        

        
        // Add chameleon at x,y
        createChameleon(500,game.world.height - 400);
        
        // make groups
        make_fruit_groups();
        make_enemy_groups();
        make_balloon_group();
        addMovingPlatforms();
        make_healthpack_groups();
        
        placeBird(100, 100, ["red"])
        placeBird(200, 100, ["orange"])
        placeBird(300, 100, ["yellow"])
        placeBird(400, 100, ["green"])
        placeBird(500, 100, ["blue"])
        placeBird(600, 100, ["purple"])
        
        placeSnake(100, 200, ["red"])
        placeSnake(200, 200, ["orange"])
        placeSnake(300, 200, ["yellow"])
        placeSnake(400, 200, ["green"])
        placeSnake(500, 200, ["blue"])
        placeSnake(600, 200, ["purple"])

            
        // These should be the last thing added so that it is on top of all other sprites (never hidden)
        createInventory(0, 525);
        place_hearts(450, 0);
        add_pause_darkener();
        game.input.onDown.add(pause_clicking, self);
    },
    update: function(){


        if (player.ballooning) {
            chameleon_float();
        } else {
            chameleonmove();
        }
        
        birds_group.forEach(moveBird, this);
        snakes_group.forEach(moveSnake, this);
        moving_platform_group.forEach(movingPlatformsUpdate, this);
        update_health(player.health);
    },
}