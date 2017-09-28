demo.state0 = function(){};
demo.state0.prototype = {
    preload: function(){
        // Add this in every preload function.  All necessary images for the stage should be in loadImages()
        loadImages();
        loadCatBoss();
        game.load.image('platform', 'assets/sprites/platform.png');
        
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.stage.backgroundColor = '#FFFFFF';
        addChangeStateEventListeners();
        
        createChameleon(200,game.world.height);
        cursors = game.input.keyboard.createCursorKeys();
        
        // Init Stomach, args are x&y of top left corner of inventory
        createInventory(400,25);
        
        make_fruit_groups();
        make_enemy_groups();
        
        placeFruit(500,500, "redfruit");
        placeBird(200, 100, "red");
        place_cat_boss(400, 100);
        
        addMovingPlatforms();
        placeMP(200, 200, 2, 2, 4, 4, 4000);
        
    },
    update: function(){
        chameleonmove();
        moveBird();
        cat_boss_move();
        movingPlatformsUpdate();
        /*
        for (fruit in fruit_colors){
            clr = fruit_colors[fruit];
            stomach_icons[clr].events.onInputDown.add(chameleon_change_color, {color:clr});
        } */   
    },
    preRender: function () {
        if (this.game.paused)
        {
            //  Because preRender still runs even if your game pauses!
            return;
        }

        if (this.locked || this.wasLocked)
        {
            this.player.x += this.lockedTo.deltaX;
            this.player.y = this.lockedTo.y - 48;

            if (this.player.body.velocity.x !== 0)
            {
                this.player.body.velocity.y = 0;
            }
        }
    }
};

