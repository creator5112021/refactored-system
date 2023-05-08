x = 0;
y = 0;
draw_apple = "";
screen_width = 0 
screen_height = 0
apple = "empty"
to_number = "empty"
speak_data = ""

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function preload() {
  apple = loadImage("apple.png");
}

function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
}

recognition.onresult = function(event) {
 console.log(event); 
 content = event.results[0][0].transcript;
    document.getElementById("status").innerHTML = "The speech has been recognized: " + content; 
    to_number = Number(content);
    console.log(to_number);
    if (Number.isInteger(to_number)) {
      document.getElementById("status").innerHTML = "Started drawing Apple";
      draw_apple = "set";
      console.log("started");
    }
    else{
      document.getElementById('status').innerHTML = "The speech has not recognised a number"
    }
  }

  function setup() {
    screen_width = window.innerWidth;
    screen_height = window.innerHeight;
   canvas = createCanvas(screen_width, screen_width - 150);
   canvas.position(0,150)
  }  

function draw() {
  if(draw_apple == "set") {
    console.log("set");
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
      speak_data = to_number + "Apples drawn";
      speak();
    for (var i = 1; i <= to_number; i++) {
      x = Math.floor(Math.random() * screen_width);
      y = Math.floor(Math.random() * screen_height-150);
      image(apple,x,y,50,50);
      draw_apple = "";
    }
  }
}

function speak(){
    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    speak_data = "";
}
