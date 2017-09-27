// Function for inventory management

function createInventory(){
    stomach = game.add.group();
    stomach.fixedToCamera = true;
    var inventory_x = 400;
    var inventory_y = 25;
    var mytxt = game.add.text(inventory_x, inventory_y, "Stomach");
    stomach.add(mytxt);
    
    var i = 0;
    for (fruit in fruit_clr){
        i += 1;
        clr = fruit_clr[fruit];
        
        // Make icons to show player what is in the inventory
        stomach_icons[clr] = game.add.sprite(inventory_x,inventory_y+75*i,fruit);
        stomach_icons[clr].scale.setTo(0.2,0.2);
        stomach_icons[clr].inputEnabled = true;
        stomach_icons[clr]["color"] = clr;
        stomach.add(stomach_icons[clr]);
        
        // Keep track internally for number of fruits
        stomach_fruits[clr] = 0;
        
        // Display number of fruits currently being held
        stomach_tracker[clr] = game.add.text(inventory_x+100, inventory_y+75*i, stomach_fruits[clr]);
        stomach.add(stomach_tracker[clr])
    }
}