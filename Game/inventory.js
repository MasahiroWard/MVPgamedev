// Function for inventory management

function createInventory(x, y){
    var inventory_x = x;
    var inventory_y = y;
    
    var stomach_bg = game.add.sprite(inventory_x, inventory_y, "stomach_background")
    stomach_bg.height = 50;
    stomach_bg.width = game.width;
    stomach_bg.fixedToCamera = true;
    stomach = game.add.group();
    stomach.fixedToCamera = true;
    
    var mytxt = game.add.text(inventory_x+50, inventory_y+10, "Stomach");
    stomach.add(mytxt);
    
    var i = 2;
    for (fruit in fruit_colors){
        i += 1; // Allows the inventory to be staggered for ease of vision
        var clr = fruit_colors[fruit];
        
        // Make icons to show player what is in the inventory
        stomach_icons[clr] = game.add.sprite(inventory_x+75*i,inventory_y+10,fruit);
        stomach_icons[clr].scale.setTo(0.2,0.2);
        
        // Allows clicking the icon
        stomach_icons[clr].inputEnabled = true;
        stomach_icons[clr]["color"] = clr;
        stomach.add(stomach_icons[clr]);
        
        // Keep track internally for number of fruits
        stomach_fruits[clr] = 0;
        
        // Display number of fruits currently being held
        stomach_tracker[clr] = game.add.text(inventory_x+75*i+25, inventory_y+10, stomach_fruits[clr]);
        stomach.add(stomach_tracker[clr])
    }
}