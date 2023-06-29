```javascript
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let stars = [];
let mouse = {x: null, y: null};

function init() {
    for(let i = 0; i < 800; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random(),
            speed: Math.random() * .05,
            brightness: 1
        });
    }
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
    });
}

function updateStars() {
    stars.forEach(star => {
        star.x += star.speed;
        if(star.x > canvas.width) star.x = 0;
        let distance = Math.hypot(star.x - mouse.x, star.y - mouse.y);
        if(distance < 50) star.brightness = 0.5;
        else star.brightness = 1;
    });
}

function animate() {
    drawStars();
    updateStars();
    requestAnimationFrame(animate);
}

canvas.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

init();
animate();
```