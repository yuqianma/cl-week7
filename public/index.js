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
	const { leader, playerX, playerY } = data;
	leaderButton.disabled = leader;
	playerXButton.disabled = playerX;
	playerYButton.disabled = playerY;
}

// window.addEventListener('keydown', (e) => {
// 	console.log(e.key);
// });

// ArrowRight, ArrowLeft, ArrowUp, ArrowDown

function connectToServer(role) {
	const socket = io(`/?role=${role}`);
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
