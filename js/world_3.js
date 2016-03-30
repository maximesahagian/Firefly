/**
 * Created by Alexandre on 28/03/2016.
 */

//----------------------------MONDE 3----------------------------

$(document).ready(function(){
    $('.planetes #three').click(function(){
        currentWorld =  3;
        if($('#circle_trois').hasClass('none')){
            console.log('Veuillez terminer le niveau précédent');
        }
        else{
            $('#map').hide();
            $('#zone_timer').show();
            var seconde = 3;
            var timer = document.querySelector('.timer');
            timer.innerHTML = (seconde);
            var decompte = setInterval(function(){
                seconde --;
                if (seconde > 0) {
                    console.log(seconde);
                    timer.innerHTML = (seconde);
                }
                else if(seconde == 0){
                    timer.innerHTML =("Run !");
                }
                else {
                    console.log("fini");
                    clearInterval(decompte);
                    $('#zone_timer').hide();
                    if ($("#canvas").is(":hidden")){
                        $('#canvas').show();
                    }
                    absolue3();
                    clearInterval(decompte);
                }
            },1000);
        }
    });
});

    function absolue3()
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
            game.load.image('background', 'images/fond3.jpg');
            game.load.image('ground', 'images/ground.png');
            game.load.image('obstacle', 'images/obstacle.png');
            game.load.image('obstacle2', 'images/obstacle02.png');
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

            setRandomInterval2();
            function setRandomInterval2()
            {
                var obstacle2 = obstacles.create(1200, 400, 'obstacle2');
                //star.body.velocity.x = -300;
                obstacle2.body.velocity.x = -500;

                setTimeout(function(){
                    setRandomInterval2();
                }, Math.floor(Math.random() * (5000 - 1100) + 1100));
            }

            setRandomInterval();
            function setRandomInterval()
            {
                var obstacle = obstacles.create(1200, 400, 'obstacle');
                //star.body.velocity.x = -300;
                obstacle.body.velocity.x = -500;

                setTimeout(function(){
                    setRandomInterval();
                }, Math.floor(Math.random() * (5000 - 900) + 900));
            }
            setRandomInterval();

            //Creating some fireflies...
            setFireflies();
            function setFireflies()
            {
                var firefly = fireflies.create(1200, 220, 'firefly');

                firefly.body.velocity.x = -800;

                setTimeout(function(){
                    setFireflies();
                }, Math.floor(Math.random() * (7000 - 2000) + 2000));
            }
            setFireflies2();
            function setFireflies2()
            {
                var firefly2 = fireflies.create(1200,382, 'firefly');

                firefly2.body.velocity.x = -500;

                setTimeout(function(){
                    setFireflies2();
                }, Math.floor(Math.random() * (10000 - 500) + 500));
            }


        }//End of create

        function update()
        {
            background.tilePosition.x += -1.3;

            //  Collide the player and the stars with the platforms
            game.physics.arcade.collide(player,platforms);
            game.physics.arcade.collide(obstacles,platforms);
            game.physics.arcade.collide(obstacles,fireflies);
            //if($('#popup').css('display') == 'none' ){
            if($('#canvas').css('display') !== 'none'){
                game.physics.arcade.overlap(player, obstacles, die3, null, this);
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
            else if(cursors.up.isDown && cursors.right.isDown) {
                player.frame = 3;
            }
            else if(cursors.up.isDown && player.body.touching.down == false){
                player.frame = 4;
            }


        }//End of Update

        function die3 (player, obstacle) {
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
                nb_fireflies_3 = 0; 

            }
            else{
                console.log('jeux deja fini');
                // $('#circle_deux').removeClass('none');
                game.destroy();
            }

        }

        function collect(player, firefly){
            firefly.kill();
            nb_fireflies_3 += 1;
            console.log("elle est a nous!");
        }
    }

//----------------------------FIN DU MONDE 3----------------------------
