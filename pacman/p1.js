console.clear();

// ----------------------------------------------
// Do not modify
// ----------------------------------------------

let canvas = document.getElementById("game");
let context2d = canvas.getContext("2d");
let pacman_model = null;
let snack_pellets = null;
let time_index = 0;
let key = "null";
let radius = 20; 
let speed = 5;
let score = 0;
let paused = true;
let x_pacman = 0;
let y_pacman = 0; 


function hypotenuse( a, b ) {
  return Math.sqrt( Math.pow( a, 2 ) + Math.pow(  b, 2 ) );
}

function createSnackPellets() {
  
  let index = 0;
  let dot_radius = 3;
  let space = 25;
  let path = null; 
  
  for ( let y_dot = space; y_dot < canvas.height; y_dot+= space ) {
  
    for ( let x_dot = space; x_dot < canvas.width; x_dot+= space ) {
    
      if ( hypotenuse( ( x_dot - canvas.width/2 ), ( y_dot - canvas.height/2 ) )  >  ( radius + space/2 ) ) {
      
        path = new Path2D();
        path.arc( x_dot, y_dot, dot_radius, 0, 2*Math.PI );
        snack_pellets[index++] = { x: x_dot, y: y_dot, circle:path };
      }
     
    }
    
  }
  
}

function createModel() {

  pacman_model[0] = new Path2D();
  pacman_model[0].moveTo( 0, 0 );
  pacman_model[0].arc( 0, 0, radius, 0, 2*Math.PI );
  pacman_model[0].lineTo( 0, 0 );
  
  pacman_model[1] = new Path2D();
  pacman_model[1].moveTo( 0, 0 );
  pacman_model[1].lineTo( radius*Math.cos( 25*Math.PI)/180, radius*Math.sin( 25*Math.PI)/180);
  pacman_model[1].arc( 0, 0, radius, 25*Math.PI/180, -25*Math.PI/180 );
  pacman_model[1].lineTo( 0, 0 );
  
  pacman_model[2] = new Path2D();
  pacman_model[2].moveTo( 0, 0 );
  pacman_model[2].lineTo( radius*Math.cos( 45*Math.PI/180), radius*Math.sin( 45*Math.PI/180));
  pacman_model[2].arc( 0, 0, radius, 45*Math.PI/180, -45*Math.PI/180 );
  pacman_model[2].lineTo( 0, 0 );
  
  pacman_model[3] = pacman_model[1];

}

// ----------------------------------------------
// Task 1: Put JS code below.
// ----------------------------------------------

function startGame() {

  x_pacman = canvas.width / 2;
  y_pacman = canvas.height / 2;  
  time_index = 0;
  score = 0;
  pacman_model = new Array();
  snack_pellets = new Array();
  key = "ArrowRight";
  paused = true;
  createModel();
  createSnackPellets();
  
}


// ----------------------------------------------
// Task 2: Put JS code below.
// ----------------------------------------------
document.addEventListener( "keyup", keyEvent );

function keyEvent( event ) {

  if ( event.key === " ") { 
    paused = !paused;
  } else if (!paused ) {
    key = event.key;
  }
  
  if (event.key === "s") {
    startGame();
  }
}



// ----------------------------------------------
// Task 3: Put JS code below.
// ----------------------------------------------


function draw() {

    document.getElementById("score").innerText = score;
    context2d.clearRect( 0, 0, canvas.width, canvas.height);
    context2d.fillStyle = "black";
    context2d.strokeStyle = "black";
    context2d.save();

    for ( let i=snack_pellets.length-1; i>=0; i-- ) {
      let dist = hypotenuse( ( snack_pellets[i].x - x_pacman ), ( snack_pellets[i].y - y_pacman ) );
      if (  dist >  radius/2 ) {
        context2d.fill( snack_pellets[i].circle );
        context2d.stroke( snack_pellets[i].circle );
      } else {
        snack_pellets.splice(i,1);
        score += 10;
      }
    }

    //limit the range of pacman's movment
    x_pacman = Math.max(Math.min(x_pacman, canvas.width - radius), radius);
    y_pacman = Math.max(Math.min(y_pacman, canvas.height - radius), radius);
    context2d.translate( x_pacman, y_pacman );

    if ( key == "ArrowUp") {
      context2d.rotate( -Math.PI/2 );
      if (!paused) y_pacman -= speed;
    } else if ( key == "ArrowDown" ) {
      context2d.rotate( ( Math.PI )/2 );
      if (!paused) y_pacman += speed;
    } else if ( key == "ArrowLeft" ) {
      context2d.scale( -1, 1 );
      if (!paused) x_pacman -= speed;
    } else if (key == "ArrowRight") {
      if (!paused) x_pacman += speed;
    }  

    context2d.fillStyle = "yellow";
    context2d.fill( pacman_model[time_index] );
    context2d.stroke( pacman_model[time_index] );
    context2d.restore(); 
    time_index = ( time_index + 1 ) % 4;
 
}

// ----------------------------------------------
// Task 4: Put JS code below.
// ----------------------------------------------

startGame();
setInterval( draw, 100 );

