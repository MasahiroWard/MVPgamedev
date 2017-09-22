demo.state1 = function(){};

var cursors, score, scoretext;

demo.state1.prototype = {
    preload: function(){

    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#DDDDDD';
        addChangeStateEventListeners();

        cursors = game.input.keyboard.createCursorKeys();
        game.add.text(300,400,"Press 0 to change states.");
        game.add.text(100,200,"Press up or down to change score.");
        score = 0;
        scoretext = game.add.text(16,16,'Score: '+score);
    },
    update: function(){
        if (cursors.up.isDown) {
            score += 10;
        } else if (cursors.down.isDown) {
            score -= 10;
        }
        scoretext.text = "Score: " + score;
    }
};
