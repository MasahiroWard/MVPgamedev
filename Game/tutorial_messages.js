// Function for checkpoints in tutorial

var tutorial_msgs = [
    'This is you.',
    'Move using arrow keys.',
    'Avoid falling off the bottom edge of the screen.',
    'Collect fruit as you climb the tower.',
    'Avoid enemies that are a different color from you.',
    'Use QWEASD to change colors.',
    'Try it out! Click W to become blue.',
    'Climb ladders using Up and Down arrow keys.',
    'Touch enemies of the same color to defeat them.',
    'Balloons provide a one time recovery if you fall off the bottom of the screen.',
    'Colored blocks can only be stepped on if you are the same color.',
    'Watch out! Bosses take multiple hits to kill.',
    'Avoid black projectiles.  They will kill you no matter what color you are.'
]

function disp_tut_msgs(idx) {
    // Pause the game and move the camera up 2 pixels so the game won't continue to pause
    game.paused = true;
    game.camera.y -= 2;
    
    switch(idx) {
        case 0:
            console.log(0);
            break;
        case 1:
            console.log(1);
            break;
              }
}