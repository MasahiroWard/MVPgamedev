// Gameover screen

demo.gameover = function(){};
demo.gameover.prototype = {
    preload: function(){
        loadImages();
    }
    create: function(){
        game.stage.backgroundColor = "#000000";
        game.add.text(game.world.width/2, game.world.height/2, "Game Over")
    }
    update: function(){
        game.add.text(game.world.width/2, game.world.height/2, "Game Over")
    }
}