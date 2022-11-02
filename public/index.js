const canvasContainer = document.querySelector('#canvas-container');
const dialog = document.querySelector('.dialog');
const leaderButton = document.querySelector('#leader');
const playerXButton = document.querySelector('#playerX');
const playerYButton = document.querySelector('#playerY');

[leaderButton, playerXButton, playerYButton].forEach((btn) => {
	btn.disabled = true;
	btn.addEventListener('click', () => {
		dialog.style.display = "none";
		connectToServer(btn.id);
	});
});

async function init() {
	const response = await fetch('/api/online');
	const { data } = await response.json();
	syncPlayerState(data);
}

function syncPlayerState(data) {
	console.log(data);
	const { leader, playerX, playerY } = data;
	leaderButton.disabled = leader;
	playerXButton.disabled = playerX;
	playerYButton.disabled = playerY;
}

// window.addEventListener('keydown', (e) => {
// 	console.log(e.key);
// });

// ArrowRight, ArrowLeft, ArrowUp, ArrowDown

const socket = io();
socket.on('role', (data) => {
	syncPlayerState(data);
});

function connectToServer(role) {
	socket.emit('role', { role });
	
	socket.on('cmd', (data) => {
		console.log(data.position, data.draw);
		// draw
	});

	switch (role) {
		case 'leader':
			window.addEventListener('keydown', (e) => {
				if (e.key === ' ') {
					socket.emit('cmd', { draw: true });
				}
			});
			break;

		case 'playerX':
			window.addEventListener('keydown', (e) => {
				if (e.key === 'ArrowRight') {
					socket.emit('cmd', { x: 1 });
				} else if (e.key === 'ArrowLeft') {
					socket.emit('cmd', { x: -1 });
				}
			});
			break;

		case 'playerY':
			window.addEventListener('keydown', (e) => {
				if (e.key === 'ArrowUp') {
					socket.emit('cmd', { y: 1 });
				} else if (e.key === 'ArrowDown') {
					socket.emit('cmd', { y: -1 });
				}
			});
			break;
	
		default:
			break;
	}
}


init();

// ------------------------------------------------------ p5

// let pen;
// let penX;
// let penY;

// let lineC = { r:255, g:204, b:0}

// let Letter = 'Ready?';

function setup() {
  createCanvas(600, 600);
  background(0);
  penX = width/2;
  penY = height/2;

  
  // //Creating the save button for the file
  // saveButton = createButton('save');
  // saveButton.mousePressed(saveFile);
  // saveButton.position(0,45);
  // info1 = createElement('h2', 'Save your Work');
  // info1.position(0, 0);
  // info1.style('color', '#ffffff');
  // info1.style('font-size', '18px');
  
  // //creating button to apply Random Letter
  // buttonLine = createButton('GO!');
  // buttonLine.position(180, 45);
  // buttonLine.mousePressed(randomLetter);
  // //creat text for set color
  // info2 = createElement('h2', 'Generate Letter');
  // info2.position(180, 0);
  // info2.style('color', '#ffffff');
  // info2.style('font-size', '18px');
  
  // //creating button to apply line color
  // buttonLine = createButton('GO!');
  // buttonLine.position(360, 45);
  // buttonLine.mousePressed(randomColor);
  // //creat text for set color
  // info3 = createElement('h2', 'Random Line Color');
  // info3.position(360, 0);
  // info3.style('color', '#ffffff');
  // info3.style('font-size', '18px');
  

}

// function draw() {
//   stroke(lineC.r, lineC.g, lineC.b);
//   pen = circle(penX, penY, 20);
//   Leader();
  
//   Topic = createElement('h1', Letter);
//   Topic.center();
//   //Topic.position(width/2, height/2);
//   Topic.style('color', '#ffffff');
//   Topic.style('font-size', '60px');
  
// }


// function LR(){
//     if (keyIsDown(LEFT_ARROW)) {
//       penX -= 1;
//     }
//     if (keyIsDown(RIGHT_ARROW) ){
//       penX ++;
//     } 
//     pen = circle(penX, penY, 20);
  
// }


// function UD(){
//     if (keyIsDown(UP_ARROW)) {
//       penY -= 1;
//     }
//     if (keyIsDown(DOWN_ARROW)) {
//       penY ++;
//     }   
// }

// function Leader(){
//   if (keyIsDown(32)){//space key
//       LR();
//       UD();
//   }
// }

// // Save File Function
// function saveFile() {
//   save('MyLetter.png');
// }

// function randomLetter(){
  
// }

// //update line color
// function randomColor(){
//   lineC.r = random(255);
//   lineC.g = random(255);
//   lineC.b = random(255);
// }

