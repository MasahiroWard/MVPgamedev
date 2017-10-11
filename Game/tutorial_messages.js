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
    tutorial_paused = true;
    game.camera.y -= 2;
    
    switch(idx) {
        case 0:
            console.log(0);
            var mytxt = game.add.text(player.x, player.y-100, "This is you.", {font: "65px Arial", align: "center"});
            mytxt.anchor.setTo(0.5);
            mytxt.addColor("#FF0000", 0);
            var arrow = game.add.sprite(player.x, player.y-50, "downarrow")
            arrow.anchor.setTo(0.5);
            arrow.scale.setTo(0.1, 0.1);

            if (cursors.up.isDown || cursors.up.isDown || cursors.up.isDown || cursors.up.isDown) {
                tutorial_paused = false;
            }
            break;
        case 1:
            console.log(1);
            break;
              }
}