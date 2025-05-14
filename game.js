var colours=["green","red","yellow","blue"];
var gameSeq=[];
var clicksequence=[];
var level=0;
start();

function start(){
var started=false;
gameSeq=[];
level=0;
$(document).on("keydown",function() {
    if (!started) {
    $("#level-title").text("Level " + level);
    sequence();
    started = true;
  }
})
}

$(".btn").on("click",function(){
    var buttonclicked=$(this).attr("id");
    gotclicked(buttonclicked);
    checkanswer(clicksequence.length-1);
})

function sequence(){
    clicksequence=[];

    var rand=Math.floor(Math.random()*4);
    var randColor=colours[rand];
    gameSeq.push(randColor);

    var selectedId="#" +randColor;
    $(selectedId).addClass("pressed");
    setTimeout(function(){
            $(selectedId).removeClass("pressed");
        },100);

    var audio = new Audio("./sounds/" + randColor + ".mp3");
    audio.play();

    
    level++;
    $("h1").text("Level "+level);
    
}

function gotclicked(buttonclicked){
    clicksequence.push(buttonclicked);

    var selectedId="#" +buttonclicked;
    $(selectedId).addClass("pressed");
    setTimeout(function(){
            $(selectedId).removeClass("pressed");
        },100);
    var audio=new Audio("./sounds/" + buttonclicked + ".mp3");
    audio.play();
}

function checkanswer(currlevel){
    if(clicksequence[currlevel]==gameSeq[currlevel]){
        if(clicksequence.length==gameSeq.length){
            setTimeout(function () {
                sequence();
            }, 1000);
        }
    }
    else{
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        var audio=new Audio("./sounds/wrong.mp3");
        audio.play();
        $("h1").text("Game Over, Press Any Key To Restart");
        start();
    }
}

$(".goback").on("click",function(){
    window.location.href='index.html';
})

