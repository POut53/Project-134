song="alarm.wav";
object=[];
status=="";
function setup(){
    canvas=createCanvas(500,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    objectdetector=ml5.objectDetector('cocossd',modelloaded);
    status=document.getElementById("status").innerHTML="Detecting objects";
}
function modelloaded(){
    console.log("Model is loaded");
    status=true;
    objectdetector.detect(video,getResults);
}
function getResults(error,result){
    if(error){
        console.log(error);
    }
    console.log(result);
    object=result;
}
function draw(){
    image(video,0,0,640,420);
    if(status!=""){
        for(i=0;i<object.length;i++){
            document.getElementById("status").innerHTML="objects detected";
            document.getElementById("objectsno").innerHTML="no of objects detected"+object.length;
            fill("#FFFF00");
            percent=floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%",object[i].x,object[i].y);
            noFill();
            stroke("#0000FF");
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
            if(object[i].label=="person"){
                document.getElementById("objectsno").innerHTML="Baby found";
                song.stop();
            }
            else{
                document.getElementById("objectsno").innerHTML="Baby not found";
                song.play();
            }
        }
        if(object.length==0){
            document.getElementById("objectsno").innerHTML="Baby not found";
        }
    }
}