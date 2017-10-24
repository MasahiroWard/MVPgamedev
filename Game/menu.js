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

//        add_game_bg('menu_bg');
        menu_style = {font:'32px Arial'}
        
        var tutorial_stage_label = game.add.text('Tutorial', 200, 200, menu_style)
//        tutorial_stage_label.inputEnabled = true;
//        tutorial_stage_label.events.onInputUp.add(function(){
//            game.state.start('tutorial');
//        })
        
//        trial_stage_label = game.add.text('Trial', 200, 400, menu_style)
//        trial_stage_label.inputEnabled = true;
//        trial_stage_label.events.onInputUp.add(function(){
//            game.state.start('trialstate');
//        })
//
//        ice_stage_label = game.add.text('Ice Stage', 200, 600, menu_style)
//        ice_stage_label.inputEnabled = true;
//        ice_stage_label.events.onInputUp.add(function(){
//            game.state.start('icestate');
//        })
        
    },
    update: function(){
        chameleonmove()
    },
}
    
