// Functions to change states.  These will have to be changed for the final product

function changeState(i, stateNum){
    console.log('state' + stateNum);
    game.state.start('state' + stateNum);
}

function addKeyCallback(key, fn, args){
    game.input.keyboard.addKey(key).onDown.add(fn, null, null, args);
    game.input.keyboard.addCallbacks(this, null, null, keyPress);
}

function addChangeStateEventListeners(){
    addKeyCallback(Phaser.Keyboard.ZERO, changeState, 0);
    addKeyCallback(Phaser.Keyboard.ONE, changeState, 1);
    addKeyCallback(Phaser.Keyboard.TWO, changeState, 2);
    addKeyCallback(Phaser.Keyboard.THREE, changeState, 3);
}

function keyPress(char) {
    //console.log(char)
    if (char == "q"){
        chameleon_change_color("red")
    } else if (char == "w"){
        chameleon_change_color("blue")
    } else if (char == "e"){
        chameleon_change_color("yellow")
    } else if (char == "r"){
        chameleon_change_color("green")
    } else if (char == "t"){
        chameleon_change_color("orange")
    } else if (char == "y"){
        chameleon_change_color("purple")
    } 
}