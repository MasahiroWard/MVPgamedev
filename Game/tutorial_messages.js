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

function tutorial(ycam) {
    game.paused = true;
    if (game.camera.y == 2500) {
        game.camera.y = 2498;
    } else if (game.camera.y == 2000) {
        game.camera.y = 1998;
    } else if (game.camera.y == 300) {
        game.camera.y = 298;
    }
}