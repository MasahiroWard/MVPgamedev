
function add_game_bg(sprite_name){
    //game.stage.backgroundColor = '#DDDDDD';
    var bg = game.add.sprite(0, 0, sprite_name);
    bg.height = game.height;
    bg.width = game.width;
    bg.fixedToCamera = true;
}

function add_pause_darkener(){
    pause_darkener = game.add.sprite(0, 0, "pause_darkener");
    pause_darkener.height = game.height;
    pause_darkener.width = game.width;
    pause_darkener.fixedToCamera = true;
    pause_darkener.alpha = 0;
}

function get_surrounding_tiles(check_layer, map){
    // Function returns the surrounding tiletypes of a given layer
    // Returns an array of [topRight, topLeft, bottomRight, bottomLeft] tile indices
    player.body.top = player.body.bottom - player.body.height;
    player.body.left = player.body.right - player.body.width;
    
    var top_y = check_layer.getTileY(player.body.top);
    var bottom_y = check_layer.getTileY(player.body.bottom);
    var right_x = check_layer.getTileX(player.body.right - 5);
    var left_x = check_layer.getTileX(player.body.left + 5);
    
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
                player.body.velocity.y = -chameleon_jump_velocity;
            }
        } else if (checking.index == ladTileIndex) {
                   ladder_function()
                   }
    }
}

function ladder_function(){
    if (cursors.up.isDown || cursors.down.isDown || cursors.left.isDown || cursors.right.isDown){
        if (climb1.isPlaying == false){
            climb1.play('','',0.7);
        }
    }
    else {
        climb1.stop();
    }
//    if (climb1.isPlaying == false){
//        climb1.play('','',0.7);
//    }
    player.body.gravity.y = 0;
    if (cursors.up.isDown){
        player.body.velocity.y = -100;
    }
    else if (cursors.down.isDown){
        // Changing this velocity doesnt seem to do anything... 
        player.body.velocity.y = 100;
    }
    else{
        player.body.velocity.y = 0;
    }
}



function collideIce(arr1, tile_dictionary, default_ice){
        // tile key: 
        // 12 = no color
        // 1,2,3 = blue
        // 4,5,6 = green
        // 7,8,9 = purple
     
    
    bottom_left = arr1[2]
    bottom_right = arr1[3]
    
// set default values as the non-color ice  
    var checking1 = default_ice;
    var checking2 = default_ice;

// create a dictionary like this in each stage and feed it to the fn 
//    var tile_dictionary = {1:"blue", 2:"blue", 3:"blue", 4:"green", 5:"green", 6:"green", 7:"purple", 8:"purple", 9:"purple", 10:player.color, 11:player.color, 12:player.color}
    
    if (bottom_right != null){
        checking1 = bottom_right.index;
    }
    if (bottom_left != null){
        checking2 = bottom_left.index;
    }
    
    if (bottom_right || bottom_left){
        if(player.color != tile_dictionary[checking1] || player.color != tile_dictionary[checking2]){
            deadplayer()
        }
    }
}

