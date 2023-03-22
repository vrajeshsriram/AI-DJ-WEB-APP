song="";
scoreLeftWrist=0;
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
function preload(){
song=loadSound("ranjithame.mp3");
}

function setup(){
canvas=createCanvas(600,500);
canvas.center();

video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses);
}
 
function draw(){
image(video,0,0,600,500);
fill("#03bafc");
stroke("#14fc03");

if(scoreLeftWrist>0.2)
{
    circle(leftWristX,leftWristY,20);
    InNumberLeftWristY=Number(leftWristY);
    remove_decimal=floor(InNumberLeftWristY);
    volume=remove_decimal/500;
    document.getElementById("volume").innerHTML="volume= "+volume;
    song.setVolume(volume);
}
}


function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}

function modelLoaded(){
    console.log("posenet is inisialized")
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log["scoreLeftWrist= "+ scoreLeftWrist];
    }

    leftWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    console.log("leftwristX= "+leftWristX+"leftwristY= "+leftWristY);

    rightWristX=results[0].pose.rightWrist.x;
    rightWristY=results[0].pose.rightWrist.y;
    console.log("rightwristX= "+rightWristX+"rightwristY= "+rightWristY);
}