demo.state1 = function(){};
// cursors changes the score so we should remote all the score things 
var cursors, platforms, yCam = 0;
//  note: yCam is a var that can be used to set up scrolling
// note2: i set ladders as immovable, not sure if i should have... 

demo.state1.prototype = {
    preload: function(){
        // load in platforms image
        game.load.image('platform', 'assets/sprites/platform.png');
        game.load.image('ladder', 'assets/sprites/ladder.png');
        
    },
    
    
    
    
    
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#DDDDDD';
        addChangeStateEventListeners();

        cursors = game.input.keyboard.createCursorKeys();
//        game.add.text(300,400,"Press 0 to change states.");
//        game.add.text(100,200,"Press up or down to change score.");

        
        // create a platforms group and a ladders group 
        platforms = game.add.group();
        ladders = game.add.group();
        platforms.enableBody = true;
        ladders.enableBody = true; 
        
        // create the ground
        var ground = platforms.create(50, game.world.height - 34 + yCam, 'platform');
        ground.scale.setTo(2.5,1);
        ground = platforms.create(800, game.world.height - 34 + yCam, 'platform');
        ground.width = 200;
        ground.body.immovable = true;
        
        // create ledges 
        var ledge = platforms.create(400,400 + yCam,'platform');
        ledge.body.immovable = true;
        ledge = platforms.create(100,300 + yCam,'platform');
        
        ledge = platforms.create(250, 450 + yCam, 'platform');
        ledge.width = 75;
        
        // put a 
        ledge = platforms.create(700, 200 + yCam, 'platform');
        ledge.width = 150;
        
        // creating ladders 
        var lad = ladders.create(150,150 + yCam,'ladder');
        lad.scale.setTo(0.05,0.05);
        lad.body.immovable = true;
        
        //create ledges with ladder holes 
        var shortPlat = platforms.create(50,150 + yCam,'platform');
        shortPlat.width = 102;
        shortPlat = platforms.create(50+100+36,150 + yCam,'platform');
        shortPlat.width = 102;
        shortPlat.body.immovable = true
        
        var shortPlat2 = platforms.create(70,25 + yCam,'platform');
        shortPlat2.width = 102;
        shortPlat = platforms.create(70+100+36,25 + yCam,'platform');
        shortPlat2.width = 102;
        shortPlat2.body.immovable = true;
        // add in the second ladder
        var lad2 = ladders.create(170,25 + yCam,'ladder');
        lad2.scale.setTo(0.05,0.05);
        lad2.height = 127;
        lad2.body.immovable = true;
        
        
        // add in a blue fruit 
        
        
        
        

        
        
    },
    
    
    
    
    
    
    update: function(){
        if (cursors.up.isDown) {
            //score += 10;
        } else if (cursors.down.isDown) {
            //score -= 10;
        }

    }
};
