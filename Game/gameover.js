// Gameover screen

demo.gameover = function(){};
demo.gameover.prototype = {
    preload: function(){
        loadImages();
    },
    create: function(){
        game.stage.backgroundColor = "#ffffff";
        game.physics.startSystem(Phaser.Physics.Arcade);
        var style = {boundsAlignH: "center", boundsAlignV: "middle" }
        var gameovertext = game.add.text(0, 0, "Game Over", style);
        gameovertext.setTextBounds(0, 0, 1000, 700);
    },
    update: function(){
        
    }
};