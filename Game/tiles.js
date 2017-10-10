function add_game_bg(sprite_name){
    //game.stage.backgroundColor = '#DDDDDD';
    var bg = game.add.sprite(0, 0, sprite_name);
    bg.height = game.height;
    bg.width = game.width;
    bg.fixedToCamera = true;
}

function get_surrounding_tiles(check_layer, map){
    // Function returns the surrounding tiletypes of a given layer
    // Returns an array of [topRight, topLeft, bottomRight, bottomLeft] tile indices
    player.body.top = player.body.bottom - player.body.height;
    player.body.left = player.body.right - player.body.width;
    
    var top_y = check_layer.getTileY(player.body.top);
    var bottom_y = check_layer.getTileY(player.body.bottom);
    var right_x = check_layer.getTileX(player.body.right);
    var left_x = check_layer.getTileX(player.body.left);
    
    return ([map.getTile(left_x, top_y, check_layer), map.getTile(right_x, top_y, check_layer), map.getTile(left_x, bottom_y, check_layer), map.getTile(right_x, bottom_y, check_layer)])
}

// check for ladder collisions - pass in the map name and the layer with the ladders 
function checkforladders(map, layer) {
    var tx = layer.getTileX(player.position.x);
    var ty = layer.getTileY(player.position.y);
    
    var tileType = map.getTile(tx, ty, layer);
    
    if (tileType != null){
        ladder_function();
    }
}


function ladder_movement(tile_arr, ladTileIndex, ladderTopIndex){
    bottom_left = tile_arr[2]
    bottom_right = tile_arr[3]
    if (bottom_right || bottom_left) {
        if (bottom_left) {
            var checking = bottom_left;
        } else if (bottom_right) {
            var checking = bottom_right;
        }
        if (checking.index == ladderTopIndex){
            ladder_function();
            if (cursors.up.isDown) {
                player.body.velocity.y = -350;
            }
        } else if (checking.index == ladTileIndex) {
                   ladder_function()
                   }
    }
}

function ladder_function(){
    if (climb1.isPlaying == false){
        climb1.play();
    }
    player.body.gravity.y = 0;
    if (cursors.up.isDown){
        player.body.velocity.y = -100;
    }
    else if (cursors.down.isDown){
        // Changing this velocity doesnt seem to do anything... 
        player.body.velocity.y = 100;
    }
    else{
        player.body.velocity.y = -7;
    }
}



function collideIce(player, layer){
        // tile key: 
        // 1,2,3 = no color
        // 5,6,7 = blue
        // 8,9,10 = green
        // 11,12,13 = purple
    
    var ybelow = icelayer1.getTileY(player.position.y + 33);

    var xbelow = icelayer1.getTileX(player.position.x);
    var tileInfo = iceMap.getTile(xbelow, ybelow, icelayer1);
    
    if (tileInfo != null){
        var tileiceType = tileInfo.index;
    }
    else{
        tileiceType = 1;
    }
    
    
    var tile_dictionary = {1:player.color, 2:player.color, 3:player.color, 5:"blue", 6:"blue", 7:"blue", 8:"green", 9:"green", 10:"green", 11:"purple", 12:"purple", 13:"purple"}
    
    
    if (player.body.blocked.down){
        if (player.color != tile_dictionary[tileiceType]){
            console.log(tile_dictionary[tileiceType]);
            console.log(tileiceType);
            deadplayer();
        }
    }
}
