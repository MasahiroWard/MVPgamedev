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
        
        // NOTE: can be moved to load assets 
        game.load.image('rtile', 'assets/tilemaps/LavaStage/red_tile.png');
        game.load.image('otile', 'assets/tilemaps/LavaStage/orange_tile.png');
        game.load.image('ytile', 'assets/tilemaps/LavaStage/yellow_tile.png');
        game.load.image('gtile', 'assets/tilemaps/IceStage/green_snow.png');
        game.load.image('btile', 'assets/tilemaps/IceStage/blue_snow.png');
        game.load.image('ptile', 'assets/tilemaps/IceStage/purple_snow.png');
    },
    create: function(){
        
        
        // Add game background
        // change 'bg1' to whatever is required
        add_game_bg('bg1')
        

        
        // Add chameleon at x,y
        createChameleon(500,game.world.height - 200);
        
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
        
        c1 = game.add.sprite(100, 350, 'red_chameleon')
        c2 = game.add.sprite(200, 350, 'orange_chameleon')
        c3 = game.add.sprite(300, 350, 'yellow_chameleon')
        c4 = game.add.sprite(400, 350, 'green_chameleon')
        c5 = game.add.sprite(500, 350, 'blue_chameleon')
        c6 = game.add.sprite(600, 350, 'purple_chameleon')
        
        c1.anchor.setTo(0.5,0.5)
        c2.anchor.setTo(0.5,0.5)
        c3.anchor.setTo(0.5,0.5)
        c4.anchor.setTo(0.5,0.5)
        c5.anchor.setTo(0.5,0.5)
        c6.anchor.setTo(0.5,0.5)
        
        c1.scale.setTo(0.13, 0.13)
        c2.scale.setTo(0.13, 0.13)
        c3.scale.setTo(0.13, 0.13)
        c4.scale.setTo(0.13, 0.13)
        c5.scale.setTo(0.13, 0.13)
        c6.scale.setTo(0.13, 0.13)
        
        placeFruit(100 - 25, 250, "redfruit")
        placeFruit(200 - 25, 250, "orangefruit")
        placeFruit(300 - 25, 250, "yellowfruit")
        placeFruit(400 - 25, 250, "greenfruit")
        placeFruit(500 - 25, 250, "bluefruit")
        placeFruit(600 - 25, 250, "purplefruit")
        
        t1 = game.add.sprite(100, 400, 'rtile')
        t2 = game.add.sprite(200, 400, 'otile')
        t3 = game.add.sprite(300, 400, 'ytile')
        t4 = game.add.sprite(400, 400, 'gtile')
        t5 = game.add.sprite(500, 400, 'btile')
        t6 = game.add.sprite(600, 400, 'ptile')
        
        t1.anchor.setTo(0.5,0.5)
        t2.anchor.setTo(0.5,0.5)
        t3.anchor.setTo(0.5,0.5)
        t4.anchor.setTo(0.5,0.5)
        t5.anchor.setTo(0.5,0.5)
        t6.anchor.setTo(0.5,0.5)
        
        t1.scale.setTo(0.6,0.6)
        t2.scale.setTo(0.6,0.6)
        t3.scale.setTo(0.6,0.6)
        t4.scale.setTo(0.6,0.6)
        t5.scale.setTo(0.6,0.6)
        t6.scale.setTo(0.6,0.6)
        
        placeMP(0, 600, 20, 3, 0, 0, 0, 0);


            
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