// note: keep camSpeed at 1 for best results, and camIncr between 1 and 4
function move_camera(camIncr, camSpeed) {
    // higher camIncr and lower camSpeed means camera moves slower
    if (camCount < camIncr){
        camCount += 1;
    }
    else {
        camCount = 0;
        game.camera.y -= camSpeed;
    }
    
    // remove this if statement to allow player to go above the camera 
    if (player.body.y < game.camera.y){
        player.body.y = game.camera.y;
        player.body.velocity.y = 0;
    }
}