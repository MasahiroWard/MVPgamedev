demo.state1 = function(){};
// cursors changes the score so we should remote all the score things 
var cursors, platforms, yCam = 1000, camSpeed = 1;
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
        
        game.world.setBounds(0, 0, 2000, 1600);
        game.camera.y = 1600;
        
        addChangeStateEventListeners();
        
        
        // removing this crashes it ?!?!?!?
        player = game.add.sprite(200,game.world.height - 500,'chameleon');
        player.scale.setTo(0.05,0.05)
        game.physics.arcade.enable(player);
        //player.body.collideWorldBounds = true;
        player.body.gravity.y = 300;
        player.body.bounce.y = 0.2;
        
        
//        cursors = game.input.keyboard.createCursorKeys();
//        game.add.text(300,400,"Press 0 to change states.");
//        game.add.text(100,200,"Press up or down to change score.");

        
        // create a platforms group and a ladders group 
        // note: one of the platforms is moveable but I can't find which one 
        
        platforms = game.add.group();
        ladders = game.add.group();
        platforms.enableBody = true;
        ladders.enableBody = true; 
        
        // create the ground
        var ground = platforms.create(50, game.world.height - 34 + yCam, 'platform');
        ground.scale.setTo(2.5,1);
        ground.body.immovable = true;
        ground = platforms.create(800, game.world.height - 34 + yCam, 'platform');
        ground.width = 200;
        ground.body.immovable = true;
        
        // create ledges 
        var ledge = platforms.create(400,400 + yCam,'platform');
        ledge.body.immovable = true;
        ledge = platforms.create(100,300 + yCam,'platform');
        ledge.body.immovable = true;
        
        ledge = platforms.create(250, 450 + yCam, 'platform');
        ledge.width = 75;
        ledge.body.immovable = true;
        
        // put a red fruit on this ledge 
        ledge = platforms.create(700, 200 + yCam, 'platform');
        ledge.width = 150;
        ledge.body.immovable = true;
        
        // creating ladders 
        var lad = ladders.create(150,150 + yCam,'ladder');
        lad.scale.setTo(0.05,0.05);
        lad.body.immovable = true;
        
        //create ledges with ladder holes 
        var shortPlat = platforms.create(50,150 + yCam,'platform');
        shortPlat.width = 102;
        shortPlat.body.immovable = true;
        
        shortPlat = platforms.create(50+100+36,150 + yCam,'platform');
        shortPlat.width = 102;
        shortPlat.body.immovable = true;
        
        var shortPlat2 = platforms.create(70,25 + yCam,'platform');
        shortPlat2.width = 102;
        shortPlat2.body.immovable = true;
        
        shortPlat = platforms.create(70+100+36,25 + yCam,'platform');
        shortPlat2.width = 102;
        shortPlat2.body.immovable = true;
        
        // add in the second ladder
        var lad2 = ladders.create(170,25 + yCam,'ladder');
        lad2.scale.setTo(0.05,0.05);
        lad2.height = 127;
        lad2.body.immovable = true;
        
        
        // create off screen platforms to yCam = 300
        ledge = platforms.create(500, -300 + yCam, 'platform');
        ledge.body.immovable = true;
        ledge = platforms.create(200, -100 + yCam, 'platform');
        ledge.width = 100;
        ledge.body.immovable = true;
        ledge = platforms.create(300, -200 + yCam, 'platform');
        ledge.width = 100;
        ledge.body.immovable = true;
        
        // platforms to yCam = 600
        ledge = platforms.create(50, -450 + yCam, 'platform');
        ledge.width = 650;
        ledge.body.immovable = true;
        
        ledge = platforms.create(775, -450 + yCam, 'platform');
        ledge.width = 400;
        ledge.body.immovable = true;
//        ledge = platforms.create(300, -200 + yCam, 'platform');
//        ledge.width = 100;
        
        //platforms.autoscroll(0,10);
        // use the map_fruit group from state0 
        
        // add in a red fruit (not yet working)
        //placeRedFruit(775, 250);
        //var redfruit1 = game.add.sprite(775,100 + yCam, 'redfruit');
        //var redfruit1 = map_fruit.create(775, 100 + yCam, 'redfruit');
        //redfruit1.scale.setTo(0.1,0.1);
        
        
        
        

        
        
    },
    
    
    
    
    
    
    update: function(){
        // note the chameleon cannot jump while it is on a platform? 
        chameleonmove();
        
        // scroll the camera 
        game.camera.y -= camSpeed;
        
        // check collisions of player with the platform
        game.physics.arcade.collide(player, platforms);
        //game.physics.arcade.collide(player,)
        

    }
};
