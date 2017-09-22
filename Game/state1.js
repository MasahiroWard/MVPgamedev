demo.state1 = function(){};

var cursors;

demo.state1.prototype = {
    preload: function(){

    },
    create: function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#DDDDDD';
    addChangeStateEventListeners();

    cursors = game.input.keyboard.createCursorKeys();
    },
    update: function(){

    }
};
