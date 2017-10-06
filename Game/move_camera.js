function move_camera(camIncr, camSpeed) {
    // higher camIncr and lower camSpeed means camera moves slower
    if (camCount < camIncr){
        camCount += 1;
    }
    else {
        camCount = 0;
        game.camera.y -= camSpeed;
    }
}