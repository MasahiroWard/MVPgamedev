demo.state1 = function(){};
// cursors changes the score so we should remote all the score things 
var cursors, platforms, yCam = 980, camSpeed = 0.00001, ladders;
// normally keep yCam at 980
//  note: yCam is a var that can be used to set up scrolling
// note2: i set ladders as immovable, not sure if i should have... 

demo.state1.prototype = {
    preload: function(){
        // load in platforms image
        game.load.image('platform', 'assets/sprites/platform.png');
        game.load.image('ladder', 'assets/sprites/ladder.png');
        
        // not sure if i need this 
        loadImages();

        
    },
    
    
    
    
    
    create: function(){
        createInventory();
        make_fruit_groups();
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#DDDDDD';
        
        game.world.setBounds(0, 0, 2000, 1600);
        game.camera.y = 1600;
        
        addChangeStateEventListeners();
        
        
        
        
        // note: the bounce is what allows the chameleon to move jump while on a platform. if there is no bounce, the chameleon cannot jump... 
        createChameleon(300, game.world.height - 200);
        player.body.collideWorldBounds = false;
        player.scale.setTo(0.05,0.05);
        player.body.bounce.y = 0.1;
        

//        player.body.gravity.y = 300;
//        player.bod1y.bounce.y = 0.2;
        
        
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
        var ground = platforms.create(50, 600 -16 + yCam, 'platform');
        ground.scale.setTo(2.5,1);
        ground.body.immovable = true;
        ground = platforms.create(800, 600 - 16 + yCam, 'platform');
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
        var lad = ladders.create(155,150 + yCam,'ladder');
        lad.scale.setTo(0.05,0.05);
        lad.body.immovable = true;
        
        //create ledges with ladder holes 
        var shortPlat = platforms.create(45,150 + yCam,'platform');
        shortPlat.width = 102;
        shortPlat.body.immovable = true;
        
        shortPlat = platforms.create(50+100+50,150 + yCam,'platform');
        shortPlat.width = 102;
        shortPlat.body.immovable = true;
        
        var shortPlat2 = platforms.create(65,25 + yCam,'platform');
        shortPlat2.width = 102;
        shortPlat2.body.immovable = true;
        
        shortPlat2 = platforms.create(70+100+50,25 + yCam,'platform');
        shortPlat2.width = 102;
        shortPlat2.body.immovable = true;
        
        // add in the second ladder
        var lad2 = ladders.create(175,25 + yCam,'ladder');
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
        

        
        // add in a red fruit and a yellow fruit 
        placeRedFruit(500, 500 + yCam);
        placeGreenFruit(200, -600 + yCam);
        placeGreenFruit(800, -600, yCam);
        
        

        
        
        
        

        
        
    },
    
    
    
    
    
    
    update: function(){

       chameleonmove();
        

        game.camera.y -= camSpeed;
        
        // check collisions of player with the platform
        game.physics.arcade.collide(platforms,player);
        //game.physics.arcade.collide(player, ladders); <- has the same issue as platforms 
//        if (player.body.touching.down){
//            console.log('touching');
//        }
        
        chameleonmove();
        stomach_icons.red.events.onInputDown.add(chameleonred,this);
        stomach_icons.blue.events.onInputDown.add(chameleonblue,this);
        stomach_icons.yellow.events.onInputDown.add(chameleonyellow,this);
        stomach_icons.orange.events.onInputDown.add(chameleonorange,this);
        stomach_icons.purple.events.onInputDown.add(chameleonpurple,this);
        stomach_icons.green.events.onInputDown.add(chameleongreen,this);

    }
};
