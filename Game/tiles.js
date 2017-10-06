function add_game_bg(sprite_name){
    //game.stage.backgroundColor = '#DDDDDD';
    var bg = game.add.sprite(0, 0, sprite_name);
    bg.height = game.world.height;
    bg.width = game.width;
    bg.fixedToCamera = true;
}



//function tile_collision(fname, map, layer){
//    
//}

// check for ladder collisions - pass in the map name and the layer with the ladders 
function checkforladders(map, layer) {
    var tx = layer.getTileX(player.position.x);
    var ty = layer.getTileY(player.position.y);
    
    var tileType = map.getTile(tx, ty, layer);
    
    if (tileType != null){
        ladder_function();
    }
}


function collideIce(player, layer){
    //jump_function();
    
        // tile key: 
        // 1,2,3 = no color
        // 5,6,7 = blue
        // 8,9,10 = green
        // 11,12,13 = purple
    
    var ybelow = icelayer1.getTileY(player.position.y + 33);
    var xbelow = icelayer1.getTileX(player.position.x);
    var tileiceType = iceMap.getTile(xbelow, ybelow, icelayer1).index;
    
    var tile_dictionary = {1:player.color, 2:player.color, 3:player.color, 5:"blue", 6:"blue", 7:"blue", 8:"green", 9:"green", 10:"green", 11:"purple", 12:"purple", 13:"purple"}
    console.log(tileiceType);
//    console.log(tileiceType, player.color, tile_dictionary.tileiceType);
    
    if (player.color != tile_dictionary[tileiceType]){
        deadplayer();
    }
    
}
//
//function incrementCamera(camSpeed){
//    if (camCount < camIncr){
//        camCount += 1;
//    }
//    else {
//        camcount = 0;
//        game.camera.y -= camSpeed;
//    }
//}