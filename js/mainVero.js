
$(document).ready(function(){
    var canvas = document.querySelector("#canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = 1100;
    canvas.height = 500;
    canvas.style.backgroundImage = "url('assets/fond_debut.jpg')";
     $('button').click(function(){
        $(this).hide();
        $('.timer').show();      
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
                timer.innerHTML =("GO");
            }
            else {
                console.log("fini");
                $('.timer').hide();
                 game();   
                clearInterval(decompte);
                        
            }
        },1000);
    });


function game()
{
    //draw Image
    var velocity=100;
    var bgImage = new Image();
    bgImage.addEventListener('load',drawImage,false);
    bgImage.src = "images/fond1.jpg";
    function drawImage(time)
    {          
            var framegap=time-lastRepaintTime;
            lastRepaintTime=time;
            var translateX=velocity*(framegap/1000);
            ctx.clearRect(0,0,canvas.width,canvas.height);
            var pattern=ctx.createPattern(bgImage,"repeat-x");
            ctx.fillStyle=pattern;
            ctx.rect(translateX,0,bgImage.width,bgImage.height);
           ctx.fill();
            ctx.translate(-translateX,0);   
        requestAnimationFrame(drawImage);
    }

    var lastRepaintTime=window.performance.now();
}



})//Fin du document.ready

