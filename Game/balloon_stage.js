// Boiler plate code for adding stage

// Declare state vars only used in this state
var state_var_1;
var state_var_2;

// Change boilerplate to whatever name
demo.balloonstate = function(){};
demo.balloonstate.prototype = {
    preload: function(){
        // Always include this line
        loadImages();
        
        // Make this equal to the size of the tilemap
        var tilemap_height = 3600;
        game.world.setBounds(0, 0, 1000, tilemap_height);
    },
    create: function(){
        // Stop sounds when starting a state
        game.sound.stopAll();
        
        // start game at bottom of screen
        game.camera.y = game.world.height;
        
        // Add game background
        // change 'bg1' to whatever is required
        add_game_bg('bg1')
        
        ////////////////////////////////////////////
        // Add in tilemap
        // Vaidehi, please generalize this as needed
//        map = game.add.tilemap('stage');
//        map.addTilesetImage('grass_platform');
//        map.addTilesetImage('ladder_sprite');
//        map.addTilesetImage('ladder_sprite_top');
//
//        layer1 = map.createLayer('Platforms');
//        layer2 = map.createLayer('Ladders');
//        layer1.resizeWorld();
//        layer2.resizeWorld();
//        
//        // Make sure to enable arcade for all layers so boss doesn't go wherever it wants
//        game.physics.arcade.enable(layer1);
//        game.physics.arcade.enable(layer2);
//        
//        // set collisions for the tilemaps
//        map.setCollisionBetween(1, 3, true, layer1);
//        map.setCollisionBetween(4, 5, true, layer2);
        
        // load in sound
        guitar1 = game.add.audio('guitar');        
        // loops guitar music 
        guitar1.play('','',0.5,true,true);
        ///////////////////////////////////////////////
        
        // Add chameleon at x,y
        createChameleon(500,game.world.height - 400);
        
        // make groups
        make_fruit_groups();
        make_enemy_groups();
        make_balloon_group();
        addMovingPlatforms();
        make_healthpack_groups();
        
        placeBalloon(400,game.world.height - 200);
        placeBalloon(300,3000);
        placeBalloon(300,2500);
        placeBalloon(300,2000);
        placeBalloon(300,1500);
        placeBalloon(300,1000);
        placeBalloon(300,500);
        
        placeFruit(200, 3000, "redfruit");
        placeFruit(200, 2500, "bluefruit");
        placeFruit(200, 2000, "yellowfruit");
        placeFruit(200, 1500, "greenfruit");
        placeFruit(200, 1000, "purplefruit");
        placeFruit(200, 500, "orangefruit");
        
        var redbird = placeBird(0, 2750, ["red"]);
        redbird.mytween = game.add.tween(redbird).to({x:[500, 0], y:[2750,2750]}, 4000, Phaser.Easing.Linear.None, true, 0, -1, false)
        var bluebird = placeBird(0, 2250, ["blue"]);
        bluebird.mytween = game.add.tween(bluebird).to({x:[500, 0], y:[2250,2250]}, 4000, Phaser.Easing.Linear.None, true, 0, -1, false)
        var yellowbird = placeBird(0, 1750, ["yellow"]);
        yellowbird.mytween = game.add.tween(yellowbird).to({x:[500, 0], y:[1750,1750]}, 4000, Phaser.Easing.Linear.None, true, 0, -1, false)
        var greenbird = placeBird(0, 1250, ["green"]);
        greenbird.mytween = game.add.tween(greenbird).to({x:[500, 0], y:[1250,1250]}, 4000, Phaser.Easing.Linear.None, true, 0, -1, false)
        var purplebird = placeBird(0, 750, ["purple"]);
        purplebird.mytween = game.add.tween(purplebird).to({x:[500, 0], y:[750,750]}, 4000, Phaser.Easing.Linear.None, true, 0, -1, false)
        var orangebird = placeBird(0, 250, ["orange"]);
        orangebird.mytween = game.add.tween(orangebird).to({x:[500, 0], y:[250,250]}, 4000, Phaser.Easing.Linear.None, true, 0, -1, false)

        placeMP(400, 200, 12, 1, 0, 0, 0, 0)
        // Examples:
//        placeFruit(700, 2700, "bluefruit")
//        var snake1 = placeSnake(300, 2000, ["blue"]);
//        snake1.mytween = game.add.tween(snake1).to({x:[200, 300], y:[2000,2000]}, 4000, Phaser.Easing.Linear.None, true, 0, -1, false);
//        placeBalloon(100, 3100);
//        placeMP(150, 2700, 3, 1, 2, 2, 100, 100);
//        placeHealthpack(900, 2600);
        
            
        // These should be the last thing added so that it is on top of all other sprites (never hidden)
        createInventory(0, 525);
        place_hearts(450, 0);
        add_pause_darkener();
    },
    update: function(){
        // Collide with layers that are necessary
//        game.physics.arcade.collide(player, layer1);
        
        move_camera(0,2);
        if (player.ballooning) {
            chameleon_float();
        } else {
            chameleonmove();
            
            // ladder movement if not floating
            // here, layer 2 is your ladder layer
            // 4 & 5 are indices of ladder tiles
//            var tile_arr = get_surrounding_tiles(layer2, map);
//            ladder_movement(tile_arr, 4, 5);
        }
        
        birds_group.forEach(moveBird, this);
        snakes_group.forEach(moveSnake, this);
        moving_platform_group.forEach(movingPlatformsUpdate, this);
        update_health(player.health);
    },
}