// Function for inventory management
var stomach_bg

function createInventory(x, y){
    var inventory_x = x;
    var inventory_y = y;
    
    stomach_bg = game.add.sprite(inventory_x, inventory_y, "stomach_background")
    stomach_bg.height = 125;
    stomach_bg.width = 300;
    stomach_bg.fixedToCamera = true;
    stomach_bg.alpha = 0.3;
    stomach = game.add.group();
    stomach.fixedToCamera = true;
    
    var mytxt = game.add.text(inventory_x+20, inventory_y+10, "Stomach");
    stomach.add(mytxt);
    
    var i = -1;
    for (fruit in fruit_colors){
        i += 1; // Allows the inventory to be staggered for ease of vision
        var clr = fruit_colors[fruit];
        
        // Make icons to show player what is in the inventory
        stomach_icons[clr] = game.add.sprite(inventory_x+90*i,inventory_y+40,fruit);
        stomach_icons[clr].scale.setTo(0.2,0.2);
        
        // Allows clicking the icon
        stomach_icons[clr].inputEnabled = true;
        stomach_icons[clr]["color"] = clr;
        stomach.add(stomach_icons[clr]);
        
        // Keep track internally for number of fruits
        stomach_fruits[clr] = 0;
        
        // Display number of fruits currently being held
        stomach_tracker[clr] = game.add.text(inventory_x+90*i+30, inventory_y+40, stomach_fruits[clr] + " (" + clr_keys[clr] + ")");
        stomach.add(stomach_tracker[clr])
        
        stomach_icons[clr].alpha = 0;
        stomach_tracker[clr].alpha = 0;
        
        // Create a second row in inventory
        if (i == 2) {
            inventory_x -= 90*3
            inventory_y += 40
        }
    }
}