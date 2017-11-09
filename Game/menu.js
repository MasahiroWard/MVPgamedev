var menu_balloon, easy_option, difficult_option;

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
        add_game_bg('bg1');
        restart_state = "menu";
        // This only needs to happen one time.  Add it to the intial state and forget about it after
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // Allows keyboard inputs
        cursors = game.input.keyboard.createCursorKeys();
        game.input.keyboard.addCallbacks(this, null, null, keyPress);

        
        // Stop sounds when starting a state
        game.sound.stopAll();
        
        cute = game.add.audio('cute');
        cute.play('','',0.3,true,true);
        
        
        // start game at bottom of screen
        game.camera.y = game.world.height;
        
        // Add game background
        // change 'bg1' to whatever is required

        game.stage.backgroundColor = '#DDDDDD';
               
        // Add chameleon at x,y
        createChameleon(500,500);
        
        var title = game.add.sprite(500, 100, "title_txt");
        title.anchor.setTo(0.5, 0.5);
        
        var style = {font: "30px Arial", fill: "Black"}
        var tutorial_menu_option = game.add.sprite(250, 250, "tutorial_state_txt");
        tutorial_menu_option.inputEnabled = true;
        tutorial_menu_option.events.onInputUp.add(
            function(){
                restart_state = 'tutorial'
                game.state.start('tutorial');
            }
        );
        tutorial_menu_option.anchor.setTo(0.5,0.5);
        tutorial_menu_option.events.onInputOver.add(
            function() {
                tutorial_menu_option.scale.setTo(1.2, 1.2);
            }
        );
        tutorial_menu_option.events.onInputOut.add(
            function () {
                tutorial_menu_option.scale.setTo(1, 1);
            }
        );
        
        var ice_menu_option = game.add.sprite(250, 350, "ice_state_txt");
        ice_menu_option.inputEnabled = true;
        ice_menu_option.events.onInputUp.add(
            function(){
                restart_state = 'icestate'
                game.state.start('icestate');
            }
        );
        ice_menu_option.anchor.setTo(0.5,0.5);
        ice_menu_option.events.onInputOver.add(
            function() {
                ice_menu_option.scale.setTo(1.2, 1.2);
            }
        );
        ice_menu_option.events.onInputOut.add(
            function () {
                ice_menu_option.scale.setTo(1, 1);
            }
        );
        
        var lava_menu_option = game.add.sprite(250, 450, "lava_state_txt");
        lava_menu_option.inputEnabled = true;
        lava_menu_option.events.onInputUp.add(
            function(){
                restart_state = 'lavastate'
                game.state.start('lavastate');
            }
        );
        lava_menu_option.anchor.setTo(0.5,0.5);
        lava_menu_option.events.onInputOver.add(
            function() {
                lava_menu_option.scale.setTo(1.2, 1.2);
            }
        );
        lava_menu_option.events.onInputOut.add(
            function () {
                lava_menu_option.scale.setTo(1, 1);
            }
        );
        
        var balloon_menu_option = game.add.sprite(250, 550, "unicorn_state_txt");
        balloon_menu_option.inputEnabled = true;
        balloon_menu_option.events.onInputUp.add(
            function(){
                restart_state = 'balloonstate'
                game.state.start('balloonstate');
            }
        );
        balloon_menu_option.anchor.setTo(0.5,0.5);
        balloon_menu_option.events.onInputOver.add(
            function() {
                balloon_menu_option.scale.setTo(1.2, 1.2);
            }
        );
        balloon_menu_option.events.onInputOut.add(
            function () {
                balloon_menu_option.scale.setTo(1, 1);
            }
        );

        //difficulty level options - PUT IN REAL SPRITES HERE!!!! 
        easy_option = game.add.sprite(610, 275, "easy_txt");
        easy_option.anchor.setTo(0.5,0.5);
        easy_option.inputEnabled = true;
        easy_option.events.onInputUp.add(
            function(){
                difficulty = "easy";
            }
        );
        
        difficult_option = game.add.sprite(830, 275, "hard_txt");
        difficult_option.anchor.setTo(0.5,0.5);
        difficult_option.inputEnabled = true;
        difficult_option.events.onInputUp.add(
            function(){
                difficulty = "advanced";
            }
        );

        var difficulty_text = game.add.sprite(610, 190, "difficulty_txt");
        
// bestiary option 
        

        

        var bestiary_option = game.add.sprite(650, 550, "bestiary_txt");
        bestiary_option.inputEnabled = true;
        bestiary_option.events.onInputUp.add(
            function(){
                restart_state = 'bestiary'
                game.state.start('bestiary');
            }
        );
        
//        
//        var trial_menu_option = game.add.text(200, 350, "Trial", style);
//        trial_menu_option.inputEnabled = true;
//        trial_menu_option.events.onInputUp.add(
//            function(){
//                restart_state = 'trialstate'
//                game.state.start('trialstate');
//            }
//        );
//        
//        var bp_menu_option = game.add.text(200, 400, "Boilerplate", style);
//        bp_menu_option.inputEnabled = true;
//        bp_menu_option.events.onInputUp.add(
//            function(){
//                restart_state = 'boilerplate'
//                game.state.start('boilerplate');
//            }
//        );
        
        
        // make groups
        make_fruit_groups();
        make_enemy_groups();
        make_balloon_group();
        addMovingPlatforms();
        make_healthpack_groups();
        menu_balloon = placeBalloon(925, 500);
        menu_balloon.reset_time = game.time.time + 2000;


        // Add MP as ground so we don't need a tilemap for menu
        placeMP(0, 600, 18, 3, 0, 0, 0, 0);
        
        // These should be the last thing added so that it is on top of all other sprites (never hidden)

        add_pause_darkener();
        game.input.onDown.add(pause_clicking, self);

    },
    update: function(){
        game.camera.y = 0;
        

        if (difficulty == "easy"){
            easy_option.scale.setTo(1.5,1.5);
            difficult_option.scale.setTo(1,1);
        }
        else {
            easy_option.scale.setTo(1,1);
            difficult_option.scale.setTo(1.5,1.5); 
        }
        
        
        if (player.ballooning) {
            chameleon_float();
        } else {
            chameleonmove();
        }
        
        if (!menu_balloon.alive && game.time.time > menu_balloon.reset_time) {
            menu_balloon.revive()
        } else if (menu_balloon.alive) {
            // Revive menu balloon only if it has been dead for 2 seconds
            menu_balloon.reset_time = game.time.time + 2000;
        }
        
        birds_group.forEach(moveBird, this);
        snakes_group.forEach(moveSnake, this);
        moving_platform_group.forEach(movingPlatformsUpdate, this);
    },
}