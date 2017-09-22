demo.state1 = function(){};
// cursors changes the score so we should remote all the score things 
var cursors, platforms;

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
        //ladders.enableBody = true;
        
        // create the ground
        var ground = platforms.create(50, game.world.height - 34, 'platform');
        ground.scale.setTo(2.5,1);
        ground.body.immovable = true;
        
        // create ledges 
        var ledge = platforms.create(400,400,'platform');
        ledge.body.immovable = true;
        ledge = platforms.create(100,300,'platform');
        
        // creating ladders 
        var lad = ladders.create(150,150,'ladder');
        lad.scale.setTo(0.05,0.05);
        
        //create ledges with ladder holes 
        var shortPlat = platforms.create(50,150,'platform');
        shortPlat.width = 102;
        shortPlat = platforms.create(50+100+36,150,'platform');
        shortPlat.width = 102;
        
        var shortPlat2 = platforms.create(70,25,'platform');
        shortPlat2.width = 102;
        shortPlat = platforms.create(70+100+36,25,'platform');
        shortPlat2.width = 102;
        // add in the second ladder
        var lad2 = ladders.create(170,25,'ladder');
        lad2.scale.setTo(0.05,0.05);
        lad2.height = 127;
        
        
        
        
//        var shortPlat = platforms.create(150, 100, 'platform');
//        shortPlat.body.immovable = true;
        //var led = ladder.create(50,50,'ladder');
        //led.scale.setTo(0.5,1);
        
        
    },
    
    
    
    
    
    
    update: function(){
        if (cursors.up.isDown) {
            //score += 10;
        } else if (cursors.down.isDown) {
            //score -= 10;
        }

    }
};
