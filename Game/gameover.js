// Gameover screen

demo.gameover = function(){};
demo.gameover.prototype = {
    preload: function(){
//        loadImages();
        var tilemap_height = 650;
        game.world.setBounds(0, 0, 1000, tilemap_height);        
    },
    create: function(){
        death_count += 1; 
//        console.log(death_count);
        game.add.text(400,400,"Death Count: " + death_count);
        
        add_game_bg('bg2');
        game.stage.backgroundColor = "#ffffff";
        game.physics.startSystem(Phaser.Physics.Arcade);
        var style = {boundsAlignH: "center", boundsAlignV: "middle" }
        var gameovertext = game.add.sprite(500, 150, "game_over_txt");
        gameovertext.anchor.setTo(0.5, 0.5);
        gameovertext.scale.setTo(1.2, 1.2);
        
        game.add.text(400,400,"Death Count: " + death_count);
        
        game.sound.stopAll();
        disappointed.play('','',0.6);
        
        var style = {font: "30px Arial", fill: "Black"}
        var main_menu_option = game.add.sprite(300, 300, "main_menu_txt");
        main_menu_option.anchor.setTo(0.5, 0.5);
        main_menu_option.inputEnabled = true;
        main_menu_option.events.onInputUp.add(
            function(){
                game.state.start('menu');
            }
        );
        main_menu_option.events.onInputOver.add(
            function() {
                main_menu_option.scale.setTo(1.2, 1.2);
            }
        );
        main_menu_option.events.onInputOut.add(
            function () {
                main_menu_option.scale.setTo(1, 1);
            }
        );

        
        var style = {font: "30px Arial", fill: "Black"}
        var retry_pause_option = game.add.sprite(700, 300, "try_again_txt");
        retry_pause_option.anchor.setTo(0.5, 0.5);
        retry_pause_option.inputEnabled = true;
        retry_pause_option.events.onInputUp.add(
            function(){
                game.state.start(restart_state);
            }
        );
        retry_pause_option.events.onInputOver.add(
            function() {
                retry_pause_option.scale.setTo(1.2, 1.2);
            }
        );
        retry_pause_option.events.onInputOut.add(
            function () {
                retry_pause_option.scale.setTo(1, 1);
            }
        );
        
    },
    update: function(){
        
    }
};