var demo = {}, cursors, player, scoreText, score;
demo.state0 = function(){};
demo.state0.prototype = {
    preload: function(){
        game.load.image('sky','assets/backgrounds/sky.png');
        game.load.spritesheet('dude', 'assets/spritesheets/dude.png', 32, 48);
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#0000FF';
        addChangeStateEventListeners();
        game.add.sprite(0,0,'sky');
        player = game.add.sprite(0,game.world.height/2,'dude');
        game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;
        cursors = game.input.keyboard.createCursorKeys();
        scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    },
    update: function(){
        player.velocity.y = 0;
        player.velocity.x = 0;
        if (cursors.up.isDown)
        {
            player.body.velocity.y = -150;
        }
        else if (cursors.left.isDown)
        {
            //  Move to the left
            player.body.velocity.x = -150;
        }
        else if (cursors.right.isDown)
        {
            //  Move to the right
            player.body.velocity.x = 150;
        }
        else if (cursors.down.isDown)
        {
            player.body.velocity.y = 150;  
        }
        else
        {
            player.body.velocity = 0;
        }

    }
};

function changeState(i, stateNum){
    console.log('state' + stateNum);
    game.state.start('state' + stateNum);
}

function addKeyCallback(key, fn, args){
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
}

function addChangeStateEventListeners(){
    addKeyCallback(Phaser.Keyboard.ZERO, changeState, 0);
    addKeyCallback(Phaser.Keyboard.ONE, changeState, 1);
}