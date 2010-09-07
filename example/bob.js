var canvas = document.getElementById('gameCanvas');
if (canvas.getContext('2d'))  {	//not null - that means we have a canvas!
  var context = canvas.getContext('2d');
  /*
  //if(pic.complete) donePic()
  //else pic.onload= donePic;
  */
}

/*
var preloader = new ResourceLoader();
preloader.AddImageResource("bobSprite", "bob.png");
preloader.AddAudioResource("killSound", "killSound.ogg");
var result = preloader.LoadAll();
*/
var killSound = new Audio("killSound.ogg");

var WIDTH = canvas.width;
var HEIGHT = canvas.height;

var lastDirection = '';
var isAlive = true;

var keyboard = new KeyboardInput();
{
  keyboard.AddKey('up', 87);
  keyboard.AddKey('down', 83);
  keyboard.AddKey('left', 65);
  keyboard.AddKey('right', 68);
  keyboard.AddOpposingKeys('up', 'down');
  keyboard.AddOpposingKeys('left', 'right');
  $(window).keydown( function(evt) { keyboard.OnKeyDown(evt) });
  $(window).keyup( function(evt) { keyboard.OnKeyUp(evt) });
}

$(canvas).mousedown( function(evt) { processMouseEvent(evt) });

var bob = new Sprite("bob.png", 60, 60, 3, 5); 
{
  bob.AddAnimation("fstand", new Array('0'), false); //w/o quotes, javascript would init an array with 0 elements. :|
  bob.AddAnimation("bstand", new Array('6'), false);
  bob.AddAnimation("sstand", new Array('9'), false);
  bob.AddAnimation("fwalk", new Array(0,1,0,2), true);
  bob.AddAnimation("hurt", new Array('3'), false);
  bob.AddAnimation("die", new Array(3, 4,5), false);
  bob.AddAnimation("bwalk", new Array(6,7,6,8), true);
  bob.AddAnimation("swalk", new Array(9,10,9, 11), true);
  bob.SetAnimation("swalk");
  //bob.isXFlipped = true;
  //bob.isYFlipped = true; 
  bob.xScale = 1;
  bob.yScale = 1;
}

function processKeyboard() {
  if (!isAlive) {
    return;
  }
  var x = bob.x;
  var y = bob.y;
  var moveSize = 5; 
  if (keyboard.keyState.up) {
    lastDirection = 'n';
    bob.SetAnimation("bwalk");
    y -= moveSize;
  }
  else if (keyboard.keyState.down) {
    lastDirection = 's';
    bob.SetAnimation("fwalk");
    y += moveSize;
  }
  else if (keyboard.keyState.left) {
    lastDirection = 'w';
    bob.SetAnimation("swalk");
	if (bob.isXFlipped)
	  bob.rotation = 360 - bob.rotation;
    bob.isXFlipped = false;
    x -= moveSize;
  }
  else if (keyboard.keyState.right) {
    lastDirection = 'e';
    bob.SetAnimation("swalk");
	if (!bob.isXFlipped)
	  bob.rotation = 360 - bob.rotation;
    bob.isXFlipped = true;
    x += moveSize;
  }
  else {
    switch (lastDirection) {
      case 'w':
        bob.SetAnimation("sstand");
        bob.isXFlipped = false;
        break;
      case 'e':
        bob.SetAnimation("sstand");
        bob.isXFlipped = true;
        break;
	  case 'n':
      case 's':
      default:
        bob.SetAnimation('fstand');
        break;
    }
  }
  bob.SetPosition(x, y);
}

function processMouseEvent(evt) {
  evt.preventDefault();
  //console.log(evt);
  console.log("Button " + evt.button + " (" + evt.offsetX + ", " + evt.offsetY + ")");
}
  
function changeX(val) {
  if (val > 0)
  {
    bob.xScale = val;
  }
}
  
function changeY(val) {
  if (val > 0)
  {
    bob.yScale = val;
  }
}
  
function killBob() {
  if (isAlive)
  {
    isAlive = false;
	killSound.play();
    bob.SetAnimation("die");
  }
}

function clear() {
  context.clearRect(0, 0, WIDTH, HEIGHT);
}

/*
var frameCount = 0;
var elapsedCounter = 0;
var avgFramerate = 0;
var thisFrame = Date.now();
var elapsed = 0;
var lastFrame = 0;
var delta = 0;

function deltaTime() {
  thisFrame = Date.now();
  elapsed = thisFrame - lastFrame;
  lastFrame = thisFrame;
  delta = elapsed / 30;
}
*/
function drawGraphics() {
  clear();
  bob.Draw(context);
  
  /*
  frameCount++;
  elapsedCounter += elapsed;
  if (elapsedCounter > 1000) {
      elapsedCounter -= 1000;
      avgFramerate = frameCount;
      frameCount = 0;
    }
	*/
}

function gameTick() {
  //deltaTime();
  processKeyboard();
  //updateWorld();
  drawGraphics();
  //updateAudio();
}

function changeRotation(val) {
  bob.rotation = val;
}
  
//document.body.onkeydown=function(evt){ keyboard.OnKeyDown(evt)};
//document.body.onkeyup=function(evt){ keyboard.OnKeyUp(evt)};
var fps = 12;
setInterval(gameTick, 1000/fps);