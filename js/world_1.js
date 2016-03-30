/**
 * Created by Alexandre on 28/03/2016.
 */
//----------------------------MONDE 1----------------------------

$(document).ready(function(){
    $('.planetes #one').click(function(){
        currentWorld =  1;
        $('#map').hide();
        $('#zone_timer').show();
        //currentWorld = 1;
        var seconde1 = 3;
        var timer = document.querySelector('.timer');
        timer.innerHTML = (seconde1);
        var decompte_world = setInterval(function(){
            seconde1 --;
            if (seconde1 > 0) {
                console.log(seconde1);
                timer.innerHTML = (seconde1);
            }
            else if(seconde1 == 0){
                timer.innerHTML =("Run !");
            }
            else {
                console.log("fini");
                clearInterval(decompte_world);
                $('#zone_timer').hide();
                if ($("#canvas").is(":hidden")){
                    $('#canvas').show();
                }
                absolue1();

            }
        },1000);
    });
});

function absolue1()
    {
        game = new Phaser.Game(1100, 500, Phaser.AUTO, 'canvas', { preload: preload, create: create, update: update });

        var background;
        var player;
        var platforms;
        var cursors;
        var obstacles;
        var fireflies;
        timeInGame();

        function preload() {

            game.load.image('fond_debut', 'images/fond_debut.jpg');
            game.load.image('background', 'images/fond1.jpg');
            game.load.image('ground', 'images/ground.png');
            game.load.image('obstacle', 'images/obstacle.png');
            game.load.image('firefly','images/firefly.png');
            game.load.spritesheet('dude', 'images/personnages.png', 51, 85);
        }
        function create() {

            //  We're going to be using physics, so enable the Arcade Physics system
            game.physics.startSystem(Phaser.Physics.ARCADE);

            //  A simple background for our game

            // background = game.add.sprite(0, 0, 'fond1');
            //  game.physics.arcade.enable(background);
            background = game.add.tileSprite(0, 0, 1100, 500, "background");

            //  The platforms group contains the ground and the 2 ledges we can jump on
            platforms = game.add.group();

            //  We will enable physics for any object that is created in this group
            platforms.enableBody = true;

            // Here we create the ground.
            var ground = platforms.create(0, game.world.height - 64, 'ground');

            //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
            ground.scale.setTo(2, 2);

            //  This stops it from falling away when you jump on it
            ground.body.immovable = true;

            // The player and its settings
            player = game.add.sprite(140, game.world.height - 150, 'dude');

            //  We need to enable physics on the player
            game.physics.arcade.enable(player);

            //  Player physics properties. Give the little guy a slight bounce.
            player.body.bounce.y = 0.2;
            player.body.gravity.y = 1200;
            player.body.collideWorldBounds = true;

            //  Our two animations, walking left and right.
            player.animations.add('left', [0, 1, 2], 10, true);
            player.animations.add('right', [3, 4, 5], 10, true);

            //  Our controls.
            cursors = game.input.keyboard.createCursorKeys();

            //  We create some obstacles and fireflies
            obstacles = game.add.group();
            fireflies = game.add.group();

            //  We will enable physics for everything that is created in this group
            obstacles.enableBody = true;
            fireflies.enableBody = true;


            setRandomInterval();
            function setRandomInterval()
            {
                var obstacle = obstacles.create(1200, 383, 'obstacle');
                //star.body.velocity.x = -300;
                obstacle.body.velocity.x = -400;

                setTimeout(function(){
                    setRandomInterval();
                }, Math.floor(Math.random() * (8000 - 2000) + 2000));
            }

            //Creating some fireflies...
            setFireflies();
            function setFireflies()
            {
                var firefly = fireflies.create(1200, 220, 'firefly');

                firefly.body.velocity.x = -700;

                setTimeout(function(){
                    setFireflies();
                }, Math.floor(Math.random() * (10000 - 2000) + 2000));
            }


        }//End of create

        function update()
        {
            background.tilePosition.x += -1.3;

            //  Collide the player and the stars with the platforms
            game.physics.arcade.collide(player,platforms);
            game.physics.arcade.collide(obstacles,platforms);
            //if($('#popup').css('display') == 'none' ){
            if($('#canvas').css('display') !== 'none'){
                game.physics.arcade.overlap(player, obstacles, die, null, this);
            }
            game.physics.arcade.overlap(player, fireflies, collect, null, this);


            player.body.velocity.x = 0;

            if (cursors.up.isDown && player.body.touching.down){
                player.body.velocity.y = -500;
                //background.body.velocity.x = -150;
            }

            else if(cursors.right.isDown){
                //player.animations.play('right');
                player.body.velocity.x = 300;
            }
            else if(cursors.left.isDown){
                player.animations.play('left');
                player.body.velocity.x = -300;
            }
            else{
                player.animations.play('right');
            }

            if(cursors.up.isDown && cursors.left.isDown){
                //player.animations.stop();
                player.frame = 1;
            }
            else if(cursors.up.isDown && cursors.right.isDown){
                player.frame= 3;
            }
            else if(cursors.up.isDown && player.body.touching.down == false){
                player.frame = 4;
            }


        }//End of Update

        function die (player, obstacle) {
            if($('#score_global').css('display') !== 'none'){
                console.log('jeux deja fini');
                // $('#circle_deux').removeClass('none');
                game.destroy();
            }
            else if($('#score_final').css('display') == 'none' && $('#map').css('display') == 'none'){
                console.log('You\'r dead...');
                //player.kill();
                game.destroy();
                $('#canvas').hide();
                $('#popup').show();
                $('#canvas').html("");
                nb_fireflies_1 = 0;

            }
            else{
                console.log('jeux deja fini');
                // $('#circle_deux').removeClass('none');
                game.destroy();
            }

        }

        function collect(player, firefly){
            firefly.kill();
            nb_fireflies_1 += 1;
            console.log("elle est a nous!");

        }
    }






//---------------------------- FIN DU MONDE 1----------------------------
