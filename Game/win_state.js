// Change boilerplate to whatever name
demo.victory = function(){};
demo.victory.prototype = {
    preload: function(){
        loadImages()
        // Make this equal to the size of the tilemap
        var tilemap_height = 650;
        game.world.setBounds(0, 0, 1000, tilemap_height);
    },
    create: function(){
        // Stop sounds when starting a state
        game.sound.stopAll();
        game.stage.backgroundColor = "#000000"
        var win_msg = "Congratulations, you beat the game! We wanted to give you fireworks, but UT policy has strictly forbidden their use.  So instead, you get a fat chameleon who has gorged himself on all the fruit he found while completeing these stages.  But look at how happy he looks!";
        var style = {font: "30px Arial", fill: "White", align: "Center", wordWrap: true, wordWrapWidth: 900};
        var win_text = game.add.text(500, 200, win_msg, style);
        win_text.anchor.setTo(0.5, 0.5);
        
        var emitter = game.add.emitter(game.world.centerX, game.world.centerY, 500);
        emitter.anchor.setTo(0.5, 0.5);
        emitter.scale.setTo(0.3, 0.3);
        emitter.makeParticles(['redfruit', 'bluefruit', 'greenfruit', 'orangefruit', 'purplefruit', 'yellowfruit'])
        emitter.start(false, 5000, 20);

    },
    update: function(){

    },
}