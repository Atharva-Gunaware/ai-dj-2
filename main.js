 song="";
 leftwristX=0;
 leftwristY=0;
 rightwristX=0;
 rightwristY=0;

scoreLeftWrist=0;
scoreRightWrist=0;

 function preload(){
song= loadSound("music.mp3");
 }

function setup(){
    canvas =createCanvas(600,500);
    canvas.center();

    video= createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}


function modelLoaded(){
    console.log('Posenet is loaded');
}

function gotPoses(results){
    if(results.length>0)
    {
        console.log(results);
        scoreLeftWrist= results[0].pose.keypoints[9].score;

        scoreRightWrist= results[0].pose.keypoints[10].score;
        

        console.log("Score of leftWrist is " + scoreLeftWrist);
        leftwristX= results[0].pose.leftWrist.x;
        leftwristY= results[0].pose.leftWrist.y;
        console.log("leftWristX = "+ leftwristX +" leftWristY = "+  leftwristY);
   
       rightwristX= results[0].pose.rightWrist.x;
        rightwristY= results[0].pose.rightWrist.y;
        console.log("rightWristX = "+ rightwristX + "rightWristY = "+ rightwristY );
    }
   }

   function draw(){
    image(video, 0 , 0, 600, 500);

    fill("#ff0000");
    stroke("#ff0000");

     if (scoreRightWrist>0.2){
   circle(rightwristX, rightwristY,25);

   if(rightwristY >0 && rightwristY<=100)
   {
       document.getElementById("speed").innerHTML="Speed= 0.5x";
       song.rate(0.5);
   }
   
   else if(rightwristY >100 && rightwristY<=200)
   {
       document.getElementById("speed").innerHTML="Speed= 1x";
       song.rate(1);
   }
   
   if(rightwristY >200 && rightwristY<=300)
   {
       document.getElementById("speed").innerHTML="Speed= 1.5x";
       song.rate(1.5);
   }
 
   if(rightwristY >300 && rightwristY<=400)
   {
       document.getElementById("speed").innerHTML="Speed= 2x";
       song.rate(2);
   }
   
   if(rightwristY >400 && rightwristY<=500)
   {
       document.getElementById("speed").innerHTML="Speed= 2.5";
       song.rate(2.5);
   }
     }
    if(scoreLeftWrist>0.2){


    circle(leftwristX, leftwristY,20);
    InNumberleftWristY= Number(leftwristY);
    remove_decimals= floor(InNumberleftWristY);
    leftwristY_divide_1000= remove_decimals/1000;
    volume= leftwristY_divide_1000*2;
    document.getElementById("volume").innerHTML= "Volume = " + volume;
    song.setVolume(volume);
}
}


function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}


