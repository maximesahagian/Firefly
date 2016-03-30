// Timer for the game, if the payer reach to the end of the time, he can explore the next world.

var nb_fireflies_1 = 0;
var nb_fireflies_2 = 0;
var nb_fireflies_3 = 0;
var currentWorld;

function timeInGame()
{
    var secondes = 20;
    var decompte = setInterval(function()
    {
        if($('#popup').css('display') !== 'none'){
            clearInterval(decompte);
        }
        else if (secondes > 0) {
            secondes --;
            console.log("il reste " + secondes + " secondes");
        }
        else if(secondes == 0){
            var total = nb_fireflies_1 + nb_fireflies_2 + nb_fireflies_3;
            $('#circle_deux').removeClass('none');
            console.log(secondes);
            console.log('fini');
            clearInterval(decompte);
            $('#canvas').hide();
            $('#popup').hide();


            // We highlight the next World available
            switch(currentWorld){
                case 1:
                    $('#circle_deux').removeClass('none');
                    break;
                case 2:
                    $('#circle_trois').removeClass('none');
                    break;
            }

            //Now we displayed scores;
            // score World 1
            if(nb_fireflies_1 == 0){
                $('.final_1').html("000");
            }
            else if(nb_fireflies_1 < 10){
                $('.final_1').html("00" + nb_fireflies_1);
            }
            else if(nb_fireflies_1<100){
                $('.final_1').html("0" + nb_fireflies_1);
            }
            else{
                $('.final_1').html(nb_fireflies_1);
            }

            //score World 2
            if(nb_fireflies_2 == 0){
                $('.final_2').html("000");
            }
            else if(nb_fireflies_2 < 10){
                $('.final_2').html("00" + nb_fireflies_2);
            }
            else if(nb_fireflies_2 < 100){
                $('.final_2').html("0" + nb_fireflies_2);
            }
            else{
                $('.final_2').html(nb_fireflies_2);
            }

            //score World 3
            if(nb_fireflies_3 == 0){
                $('.final_3').html("000");
            }
            else if(nb_fireflies_3 < 10) {
                $('.final_3').html("00" + nb_fireflies_3);
            }

            else if(nb_fireflies_3 < 100){
                $('.final_3').html("0" + nb_fireflies_3);
            }
            else{
                $('.final_3').html(nb_fireflies_3);
            }

            //Total Score when all the worlds are done
            if(currentWorld == 3){
                // Now the TOTAL SCORES of all worlds
                if(total < 10){
                    $('#score_total').html(" TOTAL : 00" + total);
                    $('#score_global p').html('Score final : 00' + total);
                }
                else if(total < 100){
                    $('#score_total').html(" TOTAL : 0" + total);
                    $('#score_global p').html('Score final : 0' + total);
                    $('#points').val(total);
                }
                else{
                    $('#score_total').html(" TOTAL : " + total);
                    $('#score_global p').html('Score final : ' + total);
                }
                $('#points').val(total);
            }

            $('#score_final').show();
        }

    },1000);
}

 $(document).ready(function(){

     //Beginning
     $('.lunchGame').click(function() {
         $('#start_game').hide();
         $('#bdd').hide();
         $('#map').show();
     });

     // Go back to the Menu "map" when the player die
     $('.changeWorld').click(function(){
         $('#popup').hide();
         $('#map').show();
     });

     // Retry the same World that we failled

     $('.retryWorld').click(function(){
        switch(currentWorld){
            case 1:
                $('#popup').hide();
                $('#canvas').show();
                absolue1();
                break;
            case 2:
                $('#popup').hide();
                $('#canvas').show();
                absolue2();
                break;
            case 3:
                $('#popup').hide();
                $('#canvas').show();
                absolue3();
                break;
            default:
                absolue1();
        }
     });

     // When the Final score is displayed
     $('#nextGame').click(function(){
         if(currentWorld == 3){
             $('#score_final').hide();
             $('#score_global').show();
         }
         else{
             $('#score_final').hide();
             $('#canvas').html("");
             $('#map').show();
         }
     });
     var game;

}); // end of "document.ready"
