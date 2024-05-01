var mode = 0
var Notes = [60,61,62,63,64,65,66,67,68,69,70,71,72]
var Osc
var OscEnv
var KeyboardXPos
var KeyboardWidth
var Key
var KeyTrigger = ['a','w','s','e','d','f','t','g','y','h','u','j','k']
var KeyW = []
var KeyX = []
var TurnState = false
let audioStarted = false

function setup() {
  getAudioContext().suspend()
  
  if (!audioStarted) {
  userStartAudio();
  audioStarted = true;
}
  createCanvas(windowWidth,windowHeight)
  Osc = new p5.Oscillator('sine')
  Osc.start()
  Osc.amp(0)
  OscEnv = new p5.Envelope(0.01,0.2,0.5,0.1)
  createCanvas(windowWidth, windowHeight);
  splash = new Splash();
}

function PlayNote(note) {
  if (mode == 1) {
     Osc.freq(midiToFreq(note))
  // Fade it in
  //Osc.fade(0.5,0.2);
     OscEnv.play(Osc)
  }
 
}

 function draw() {
   
   if (mouseIsPressed == true && splash.update() == true) {
     mode = 1;
   }
   if (mode == 1) {
     splash.hide();
        // Draw a keyboard

  // The width for each key
  
  KeyboardWidth = windowWidth / Notes.length;
  for (let i = 0; i < Notes.length; i++) {
    KeyboardXPos = i * KeyboardWidth
  
    // If the mouse is over the key
    if ((mouseX > KeyboardXPos && mouseX < KeyboardXPos + KeyboardWidth && mouseY < windowHeight ) || (key == KeyTrigger[i])) {
      // If we're clicking
      if (mouseIsPressed || key == KeyTrigger[i]) {
        fill(0,0,255);
      // Or just rolling over
      } else {
        fill(127);
      }
    } else {
      fill(255);
    }
    // Draw the key
    rect(KeyboardXPos, 0, KeyboardWidth, windowHeight);
  }
   }
   
}

function mousePressed() {
  
  Key = floor(map(mouseX, 0, windowWidth, 0, Notes.length))
  PlayNote(Notes[Key])
}

// Fade it out when we release
function mouseReleased() {
  Osc.fade(0, 0.5);
}


function keyPressed() {
for(let i = 0; i < Notes.length; i++) {
  if(key == KeyTrigger[i]) {
    PlayNote(Notes[i])
    }
  }
}



