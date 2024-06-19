// script.js
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 800;

const bubbleColors = ['red', 'pink', 'violet', 'url(zebra.png)'];
const bubbles = [];
const shooter = { x: canvas.width / 2, y: canvas.height - 50, angle: 0 };

class Bubble {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.radius = 20;
        this.color = color;
        this.speed = 5;
        this.angle = shooter.angle;
    }

    update() {
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
    }

    draw() {
        ctx.beginPath();
        if (this.color.startsWith('url')) {
            const img = new Image();
            img.src = this.color.slice(4, -1).replace(/['"]/g, "");
            ctx.drawImage(img, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
        } else {
            ctx.fillStyle = this.color;
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.closePath();
    }
}

function shootBubble() {
    const color = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
    const bubble = new Bubble(shooter.x, shooter.y, color);
    bubbles.push(bubble);
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bubbles.forEach((bubble, index) => {
        bubble.update();
        bubble.draw();

        // Remove bubble if it goes off screen
        if (bubble.y < -bubble.radius) {
            bubbles.splice(index, 1);
        }
    });

    requestAnimationFrame(update);
}

function rotateShooter(e) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    shooter.angle = Math.atan2(mouseY - shooter.y, mouseX - shooter.x);
}

canvas.addEventListener('mousemove', rotateShooter);
canvas.addEventListener('click', shootBubble);

update();


