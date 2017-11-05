// Boiler plate code for adding stage

// Declare state vars only used in this state
var unicornMap, unicornlayer1, unicornlayer2;
var balloon_respawn_fruits = {};
//var state_var_2;

// Change boilerplate to whatever name
demo.balloonstate = function(){};
demo.balloonstate.prototype = {
    preload: function(){
        // Always include this line
//        loadImages();
        // load in tile map assets 
        game.load.tilemap('unicornMap', 'assets/tilemaps/UnicornStage/unicornMap.json', null, Phaser.Tilemap.TILED_JSON);
        // colored tiles
        game.load.image('blue_snow', 'assets/tilemaps/IceStage/blue_snow.png');
        game.load.image('temp_red_tile', 'assets/tilemaps/LavaStage/red_tile.png');
        game.load.image('temp_orange_tile', 'assets/tilemaps/LavaStage/orange_tile.png');
        game.load.image('temp_yellow_tile', 'assets/tilemaps/LavaStage/yellow_tile.png');
        game.load.image('green_snow', 'assets/tilemaps/IceStage/green_snow.png');
        game.load.image('purple_snow', 'assets/tilemaps/IceStage/purple_snow.png');
        
        // neutral platforms
        game.load.image('grass_platform', 'assets/tilemaps/Tutorial/grass_platform.png');
        game.load.image('lava_platform', 'assets/tilemaps/LavaStage/lava_platform.png');
        game.load.image('snow_platform', 'assets/tilemaps/IceStage/snow_platform.png');
        
        // ladders 
        game.load.image('ladder_sprite_top', 'assets/tilemaps/Tutorial/new_ladder_sprite.png');  
        game.load.image('new_ladder_sprite', 'assets/tilemaps/Tutorial/new_ladder_sprite.png');
        // Make this equal to the size of the tilemap
        var tilemap_height = 6000;
        game.world.setBounds(0, 0, 1000, tilemap_height);
        
        
        // catboss and bearboss
        loadCatBoss();
        loadBearBoss();
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
        unicornMap = game.add.tilemap('unicornMap');
        unicornMap.addTilesetImage('grass_platform');
        unicornMap.addTilesetImage('blue_snow');
        unicornMap.addTilesetImage('ladder_sprite_top');
        unicornMap.addTilesetImage('green_snow');
        unicornMap.addTilesetImage('lava_platform');
        unicornMap.addTilesetImage('new_ladder_sprite');
        unicornMap.addTilesetImage('purple_snow');
        unicornMap.addTilesetImage('snow_platform');
        unicornMap.addTilesetImage('temp_orange_tile');
        unicornMap.addTilesetImage('temp_yellow_tile');
        unicornMap.addTilesetImage('temp_red_tile');

        unicornlayer1 = unicornMap.createLayer('Platforms');
        unicornlayer2 = unicornMap.createLayer('Ladders');
        unicornlayer1.resizeWorld();
        unicornlayer2.resizeWorld();
//        
//        // Make sure to enable arcade for all layers so boss doesn't go wherever it wants
        game.physics.arcade.enable(unicornlayer1);
        game.physics.arcade.enable(unicornlayer2);
//        
//        // set collisions for the tilemaps
        unicornMap.setCollisionBetween(1, 27, true, unicornlayer1);
        unicornMap.setCollisionBetween(28, 29, true, unicornlayer2);
        
        // load in sound
        rainbow = game.add.audio('rainbow');        
        // loops guitar music 
        rainbow.play('','',0.5,true,true);
        ///////////////////////////////////////////////
        
        // Add chameleon at x,y
        createChameleon(500,game.world.height - 400);
        
        // make groups
        make_fruit_groups();
        make_enemy_groups();
        make_balloon_group();
        addMovingPlatforms();
        make_healthpack_groups();
        
        // Player starts with the balloon
        placeBalloon(500,game.world.height - 400);
        var balloon_x = 500;
        for (i=0; i<48; i++) {
            console.log(balloon_x);
            balloon_x = balloon_x + randomIntFromInterval(-350, 350);
            // Seal in game world bounds
            balloon_x = Math.min(balloon_x, 1000);
            balloon_x = Math.max(balloon_x, 0);
            placeBalloon(balloon_x, 6000-i*250);
        }

//        placeFruit(200, 2250+3000, "redfruit");
//        placeFruit(200, 2500+3000, "bluefruit");
//        placeFruit(200, 2000+3000, "yellowfruit");
//        placeFruit(200, 1500+3000, "greenfruit");
//        placeFruit(200, 1000+3000, "purplefruit");
//        placeFruit(200, 500+3000, "orangefruit");
        
        // WHY ARE THESE THINGS ACTING AS QUANTUM FRUIT?
        // Nevermind, wavefunction is collapsed now.
        balloon_respawn_fruits.redcat = placeFruit(8*50, 80*50, "redfruit")
        balloon_respawn_fruits.purplecat = placeFruit(13*50, 80*50, "purplefruit")
        balloon_respawn_fruits.orangecat = placeFruit(0*50, 77*50, "orangefruit")
        balloon_respawn_fruits.bluecat = placeFruit(950, 77*50, "bluefruit")
        balloon_respawn_fruits.yellowcat = placeFruit(150, 74*50, "yellowfruit")
        balloon_respawn_fruits.greencat = placeFruit(800, 74*50, "greenfruit")
        balloon_respawn_fruits.health1 = placeHealthpack(500, 73*50)
        for (f in balloon_respawn_fruits) {
            balloon_respawn_fruits[f].reset_time = game.time.time + 2000;
        }
        
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
        
        // this bird is in the boss area 
//        var orangebird = placeBird(0, 250, ["orange"]);
//        orangebird.mytween = game.add.tween(orangebird).to({x:[500, 0], y:[250,250]}, 4000, Phaser.Easing.Linear.None, true, 0, -1, false)
        
        // place a ton of health packs after catboss
        placeHealthpack(10*50, 67*50);
        placeHealthpack(7*50, 47*50);
        placeHealthpack(14*50, 23*50);
        placeHealthpack(9*50, 11*50);
        placeHealthpack(10*50, 81*50);
        
        // place fruits after bearboss 
        placeFruit(11*50, 67*50, 'redfruit');
        placeFruit(6*50, 59*50, 'redfruit');
        placeFruit(15*50, 56*50, 'bluefruit');
        placeFruit(5*50, 52*50, 'yellowfruit');
        placeFruit(11*50, 43*50, 'yellowfruit');
        placeFruit(4*50, 39*50, 'greenfruit');
        placeFruit(16*50, 34*50, 'greenfruit');
        placeFruit(16*50, 24*50, 'purplefruit');
        placeFruit(4*50, 17*50, 'purplefruit');


        
        

        
        // why do we need this platform ? (below)
//        placeMP(400, 200, 12, 1, 0, 0, 0, 0)
        // Examples:
//        placeFruit(700, 2700, "bluefruit")
//        var snake1 = placeSnake(randomIntFromInterval(0, 1000), 2000, ["blue"]);
//        snake1.mytween = game.add.tween(snake1).to({x:[200, 300], y:[2000,2000]}, 4000, Phaser.Easing.Linear.None, true, 0, -1, false);
//        placeBalloon(100, 3100);
//        placeMP(150, 2700, 3, 1, 2, 2, 100, 100);
//        placeHealthpack(900, 2600);
        
        
        // catboss and bearboss
        place_cat_boss(500,74*50,['green','yellow','blue','orange','red','purple']);
        
        place_bear_boss(500, 0);

        // bear boss stage moving platforms:
        placeMP(4*50, 9*50, 1, 1, 0, 1, 0, 100);
        placeMP(9*50, 9*50, 1, 1, 0, 1, 0, 100);
        placeMP(14*50, 9*50, 1, 1, 0, 1, 0, 100);
        
        
        bearfruit = placeFruit(5*50+randomIntFromInterval(0,1)*9*50, 350, bear_boss.color+"fruit");
        bearfruit.reset_time = game.time.time + 2000;

        
            
        // These should be the last thing added so that it is on top of all other sprites (never hidden)
        createInventory(0, 525);
        place_hearts(450, 0);
        add_pause_darkener();
        game.input.onDown.add(pause_clicking, self);
    },
    update: function(){
        // Collide with layers that are necessary
        game.physics.arcade.collide(player, unicornlayer1);
        
        // camera pauses - cat boss at 82 tiles, bear boss at the top (no need to pause)
        
        if (game.camera.y<=70*50 && cat_boss.health >= 0) {
//            move_camera(0,0)
        } else {
            move_camera(0,2);
            if (!rainbow.isPlaying && !friendly.isPlaying){
                bossMusic.stop();
                rainbow.play('','',0.5,true,true);
            }

//            if (bossMusic.isPlaying && !rainbow.isPlaying){
//                bossMusic.stop();
//                rainbow.play('','',0.5,true,true);
//                
//            }
//            if (rainbow.isPlaying = false){
//                bossMusic.stop();
//                rainbow.play('','',0.5,true,true);
//            }
            
        }
        
//        if (!bossMusic.isPlaying && !rainbow.isPlaying){
//            rainbow.play('','',0.5);
//        }
        // this is not being called ? 
//        if (game.camera.y <= 70*50 - 1 && game.camera.y >= 70*50-10){
//            bossMusic.stop();
//            rainbow.play('', '', 0.5, true, true);
//            console.log('music change');
//        }
        
        if (player.ballooning) {
            chameleon_float();
        } else {
            chameleonmove();
            
            // ladder movement if not floating
            // here, layer 2 is your ladder layer
            // 4 & 5 are indices of ladder tiles
            var tile_arr0 = get_surrounding_tiles(unicornlayer2, unicornMap);
            ladder_movement(tile_arr0, 28, 29);
        }
        
        unicorn_dictionary = {1:player.color, 2:player.color, 3:player.color, 4:player.color, 5:player.color, 6:player.color, 7:player.color, 8:player.color, 9:player.color, 10:"blue", 11:"blue", 12:"blue", 13:"purple", 14:"purple", 15:"purple", 16:"green", 17:"green", 18:"green", 19:"orange", 20:"orange", 21:"orange", 22:"red", 23:"red", 24:"red", 25:"yellow", 26:"yellow", 27:"yellow"};
        
        var tile_arr9 = get_surrounding_tiles(unicornlayer1, unicornMap);
        collideIce(tile_arr9, unicorn_dictionary, 1);
        
        
        birds_group.forEach(moveBird, this);
        snakes_group.forEach(moveSnake, this);
        moving_platform_group.forEach(movingPlatformsUpdate, this);
        update_health(player.health);
        
        
        // Catboss and bearboss
        if (game.camera.y != 70*50) {
            // catboss stays asleep until 3 seconds after camera reaches the top            
            cat_boss.throw_ball_timer = game.time.time + 3000;
        }
        var boss_collision_list = [unicornlayer1, unicornlayer2]
        cat_boss_move(boss_collision_list);
        
        bear_boss_move(boss_collision_list)
//        console.log('update end')
        if (!bearfruit.alive && game.time.time > bearfruit.reset_time && bear_boss.health >= 0) {
            bearfruit = placeFruit(5*50+randomIntFromInterval(0,1)*9*50, 350, bear_boss.color+"fruit");
        } else if (bearfruit.alive) {
            bearfruit.reset_time = game.time.time + 3000;
        }

//        console.log(balloon_respawn_fruits);
        for (f in balloon_respawn_fruits) {
//            console.log(balloon_respawn_fruits[f])
            if (!balloon_respawn_fruits[f].alive && game.time.time > balloon_respawn_fruits[f].reset_time) {
                balloon_respawn_fruits[f].revive()
            } else if (balloon_respawn_fruits[f].alive) {
                balloon_respawn_fruits[f].reset_time = game.time.time + 2000;
            }
        }


    },
}