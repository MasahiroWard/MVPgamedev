var game = new Phaser.Game(1000, 700, Phaser.AUTO); // previously 1080, 600 window size ; 20 sprite widths of 50 pixels each 
game.state.add('gameover', demo.gameover);
game.state.add('state0', demo.state0);
game.state.add('state1', demo.state1);
game.state.add('state2', demo.state2);
game.state.add('state3', demo.state3);
game.state.add('icestate', demo.icestate);
game.state.start('state3');
