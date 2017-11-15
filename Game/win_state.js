// Change boilerplate to whatever name
demo.victory = function(){};
demo.victory.prototype = {
    preload: function(){
//        loadImages()
        // Make this equal to the size of the tilemap
        var tilemap_height = 650;
        game.world.setBounds(0, 0, 1000, tilemap_height);
    },
    create: function(){
        // Stop sounds when starting a state
        game.sound.stopAll();
        zazie = game.add.audio('zazie');
        zazie.play('','',0.3,true,true);
        
        game.stage.backgroundColor = "#000000"
        
        var emitter = game.add.emitter(game.world.centerX,0,500);
        emitter.width = 1000;
        emitter.maxParticleScale = 0.3;
        emitter.minParticleScale = 0.3;
        emitter.makeParticles(['redfruit', 'bluefruit', 'greenfruit', 'orangefruit', 'purplefruit', 'yellowfruit'])
        emitter.start(false, 5000, 20);

        
        var win_msg = "Congratulations, you win! We wanted to give you fireworks, but UT policy has strictly forbidden their use.  So instead, we will give you a fruit shower!  Go forth and brag to your friends that you have siezed victory.";
        var style = {font: "30px Arial", fill: "White", align: "center", wordWrap: true, wordWrapWidth: 750};
        var win_text = game.add.text(500, 100, win_msg, style);
        win_text.anchor.setTo(0.5, 0);
        
        var credit_msg = "Created by Masahiro Ward, Vaidehi Naryan, and Pauline Do";
        var credit_txt = game.add.text(500, 600, credit_msg, {font: "30px Arial", fill: "White", align: "Center"});
        credit_txt.anchor.setTo(0.5, 0);

                
        var main_menu_option = game.add.sprite(500, 450, "main_menu_txt");
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
    },
    update: function(){

    },
}