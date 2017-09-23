// Function for inventory management

function createInventory(){
    stomach_icons.red = game.add.sprite(20,75,"redfruit");
    stomach_icons.red.scale.setTo(0.2,0.2);
    stomach_icons.red.inputEnabled = true;
    stomach_icons.blue = game.add.sprite(20,150,"bluefruit");
    stomach_icons.blue.scale.setTo(0.2,0.2);
    stomach_icons.blue.inputEnabled = true;
    stomach_icons.yellow = game.add.sprite(20,225,"yellowfruit");
    stomach_icons.yellow.scale.setTo(0.1,0.1);
    stomach_icons.yellow.inputEnabled = true;
    stomach_icons.green = game.add.sprite(20,300,"greenfruit");
    stomach_icons.green.scale.setTo(0.1,0.1);
    stomach_icons.green.inputEnabled = true;
    stomach_icons.purple = game.add.sprite(20,375,"purplefruit");
    stomach_icons.purple.scale.setTo(0.2,0.2);
    stomach_icons.purple.inputEnabled = true;
    stomach_icons.orange = game.add.sprite(20,450,"orangefruit");
    stomach_icons.orange.scale.setTo(0.2,0.2);
    stomach_icons.orange.inputEnabled = true;

    stomach_fruits.red = 0;
    stomach_fruits.blue = 0;
    stomach_fruits.yellow = 0;
    stomach_fruits.green = 0;
    stomach_fruits.purple = 0;
    stomach_fruits.orange = 0;

    stomach_tracker.red = game.add.text(100,75,stomach_fruits.red);
    stomach_tracker.blue = game.add.text(100,150,stomach_fruits.blue);
    stomach_tracker.yellow = game.add.text(100,225,stomach_fruits.yellow);
    stomach_tracker.green = game.add.text(100,300,stomach_fruits.green);
    stomach_tracker.purple = game.add.text(100,375,stomach_fruits.purple);
    stomach_tracker.orange = game.add.text(100,450,stomach_fruits.orange);
}