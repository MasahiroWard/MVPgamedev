// Gameover screen

demo.gameover = function(){};
demo.gameover.prototype = {
    preload: function(){
        loadImages();
    },
    create: function(){
        game.stage.backgroundColor = "#ffffff";
        game.physics.startSystem(Phaser.Physics.Arcade);
        var gameovertext = game.add.text(500, 500, "Game Over");
        //gameovertext.addColor("#ffffff")
    },
    update: function(){
        
    }
};