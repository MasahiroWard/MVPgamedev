var game = new Phaser.Game(1100, 700, Phaser.AUTO); // previously 1080, 600 window size 
game.state.add('gameover', demo.gameover);
game.state.add('state0', demo.state0);
game.state.add('state1', demo.state1);
game.state.add('state2', demo.state2);
game.state.add('state3', demo.state3);
game.state.start('state0');