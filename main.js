x = 0;
y = 0;
to_number = ""
apple = ""
draw_apple = "";
speak_data = ""
var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function preload() {
  apple = loadImage("apple.png")
}

function start() {
  document.getElementById("status").innerHTML = "System is listening please speak";
  recognition.start();
}

recognition.onresult = function (event) {

  console.log(event);
  content = event.results[0][0].transcript;
  to_number = Number(content);
  document.getElementById("status").innerHTML = "The speech has been recognized: " + content;

  if (Number.isInteger(to_number)) {
    document.getElementById("status").innerHTML = "Started Drawing Apple";
    draw_apple = "set"
  } else {
    document.getElementById("status").innerHTML = "The speech has not recognized a number";
  }
}

function setup() {
  canvas = createCanvas(1400,700)
}

function draw() {
  if (draw_apple == "set") {

    for (var i = 1; i <= to_number; i++) {
      x = Math.floor(Math.random() * 1400)
      y = Math.floor(Math.random() * 700)
      image(apple, x, y, 50, 50);
      document.getElementById("status").innerHTML = to_number + " Apples drawn";
      draw_apple = "";
    }
    speak()
  }
}

function speak() {
  var synth = window.speechSynthesis;
  speak_data= to_number+ "apples drawn!"
  var utterThis = new SpeechSynthesisUtterance(speak_data);
  synth.speak(utterThis);
  speak_data = "";
}