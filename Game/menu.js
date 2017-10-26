var menu_balloon;

// Menu State
demo.menu = function(){};

demo.menu.prototype = {
    preload: function(){
        // Always include this line
        loadImages();
        
        // Make this equal to the size of the tilemap
        var tilemap_height = 800;
        game.world.setBounds(0, 0, 1000, tilemap_height);
        
    },
    create: function(){
        // Stop sounds when starting a state
        game.sound.stopAll();
        
        // start game at bottom of screen
        game.camera.y = game.world.height;
        
        // Add game background
        // change 'bg1' to whatever is required
//        add_game_bg('bg1')
        game.stage.backgroundColor = '#DDDDDD';
               
        // Add chameleon at x,y
        createChameleon(500,500);
        
        var style = {font: "30px Arial", fill: "Black"}
        var tutorial_menu_option = game.add.text(200, 200, "Tutorial", style);
        tutorial_menu_option.inputEnabled = true;
        tutorial_menu_option.events.onInputUp.add(
            function(){
                game.state.start('tutorial');
            }
        );
        
        var ice_menu_option = game.add.text(200, 250, "Ice Stage", style);
        ice_menu_option.inputEnabled = true;
        ice_menu_option.events.onInputUp.add(
            function(){
                game.state.start('icestate');
            }
        );
        
        var lava_menu_option = game.add.text(200, 300, "Lava Stage", style);
        lava_menu_option.inputEnabled = true;
        lava_menu_option.events.onInputUp.add(
            function(){
                game.state.start('lavastate');
            }
        );


        var trial_menu_option = game.add.text(200, 350, "Trial", style);
        trial_menu_option.inputEnabled = true;
        trial_menu_option.events.onInputUp.add(
            function(){
                game.state.start('trialstate');
            }
        );
        
        var bp_menu_option = game.add.text(200, 400, "Boilerplate", style);
        bp_menu_option.inputEnabled = true;
        bp_menu_option.events.onInputUp.add(
            function(){
                game.state.start('boilerplate');
            }
        );
        
        
        // make groups
        make_fruit_groups();
        make_enemy_groups();
        make_balloon_group();
        addMovingPlatforms();
        make_healthpack_groups();
        menu_balloon = placeBalloon(925, 500);
        
        placeFruit(300, 100, "redfruit");
        placeFruit(700, 100, "bluefruit");        
        placeMP(0, 600, 18, 3, 0, 0, 0, 0);
        placeMP(400, 100, 5, 1, 0, 8, 0, 100);
            
        // These should be the last thing added so that it is on top of all other sprites (never hidden)
        createInventory(0, 525);
//        place_hearts(450, 0);
        add_pause_darkener();
    },
    update: function(){
        // Collide with layers that are necessary
        game.physics.arcade.collide(player, layer1);
        
        game.camera.y = 0;
        
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