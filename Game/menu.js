// Menu State
demo.menu = function(){};
demo.menu.prototype = {
    preload: function(){
        loadImages();
        game.world.setBounds(0, 0, 1000, 650);
    },
    create: function(){
        game.sound.stopAll();
        game.camera.y = game.world.height;
        game.stage.backgroundColor = '#DDDDDD';

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

        var trial_menu_option = game.add.text(200, 300, "Trial", style);
        trial_menu_option.inputEnabled = true;
        trial_menu_option.events.onInputUp.add(
            function(){
                game.state.start('trialstate');
            }
        );

        
    },
    update: function(){
        chameleonmove()
    },
}
    
