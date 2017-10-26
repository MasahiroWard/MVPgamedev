var menu_balloon;

// Menu State
demo.menu = function(){};
demo.menu.prototype = {
    preload: function(){
        loadImages();
        game.world.setBounds(0, 0, 1000, 800);
    },
    create: function(){
        game.sound.stopAll();
        game.camera.y = 650;
        game.stage.backgroundColor = '#DDDDDD';
//        add_game_bg('menu_bg');

        createChameleon(500, 300);
        
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
        
        var lava_menu_option = game.add.text(200, 350, "Lava Stage", style);
        lava_menu_option.inputEnabled = true;
        lava_menu_option.events.onInputUp.add(
            function(){
                game.state.start('lavastate');
            }
        );


        var trial_menu_option = game.add.text(200, 300, "Trial", style);
        trial_menu_option.inputEnabled = true;
        trial_menu_option.events.onInputUp.add(
            function(){
                game.state.start('trialstate');
            }
        );
        
        var bp_menu_option = game.add.text(200, 300, "Boilerplate", style);
        bp_menu_option.inputEnabled = true;
        bp_menu_option.events.onInputUp.add(
            function(){
                game.state.start('boilerplate');
            }
        );

        make_fruit_groups();
        placeFruit(300, 100, "redfruit");
        placeFruit(700, 100, "bluefruit");
        
        addMovingPlatforms();
        placeMP(0, 600, 18, 3, 0, 0, 0, 0);
        placeMP(400, 100, 5, 1, 0, 8, 0, 100);
        
        make_balloon_group();
        menu_balloon = placeBalloon(925, 500);
        
        createInventory(0,525);

    },
    update: function(){
        game.camera.y = 0;

        // check for ballooning 
        if (player.ballooning){
            chameleon_float();
        } else {
            chameleonmove();
        }
        
        console.log(menu_balloon)
        if (!menu_balloon.alive){
            menu_balloon.revive();
        }
        
        moving_platform_group.forEach(movingPlatformsUpdate, this);
    },
}
    
