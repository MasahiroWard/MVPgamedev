// Gameover screen

demo.gameover = function(){};
demo.gameover.prototype = {
    preload: function(){
//        loadImages();
        var tilemap_height = 650;
        game.world.setBounds(0, 0, 1000, tilemap_height);        
    },
    create: function(){
        add_game_bg('bg2');
        game.stage.backgroundColor = "#ffffff";
        game.physics.startSystem(Phaser.Physics.Arcade);
        var style = {boundsAlignH: "center", boundsAlignV: "middle" }
        var gameovertext = game.add.sprite(500, 250, "game_over_txt");
        gameovertext.anchor.setTo(0.5, 0.5);
        
        game.sound.stopAll();
        disappointed.play('','',0.6);
        
        var style = {font: "30px Arial", fill: "Black"}
        var tutorial_menu_option = game.add.sprite(200, 200, "main_menu_txt");
        tutorial_menu_option.inputEnabled = true;
        tutorial_menu_option.events.onInputUp.add(
            function(){
                game.state.start('menu');
            }
        );
        
        var style = {font: "30px Arial", fill: "Black"}
        var tutorial_menu_option = game.add.sprite(600, 200, "try_again_txt");
        tutorial_menu_option.inputEnabled = true;
        tutorial_menu_option.events.onInputUp.add(
            function(){
                game.state.start(restart_state);
            }
        );
        
    },
    update: function(){
        
    }
};