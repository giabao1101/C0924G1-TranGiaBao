const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const WIDTH = canvas.width;
const HEIGHT = canvas.height;

const CIRCLE_CENTER = { x: WIDTH / 2, y: HEIGHT / 2 };
const CIRCLE_RADIUS = 150;
const BALL_RADIUS = 5;
const GRAVITY = 0.2;
const SPINNING_SPEED = 0.01;
const ARC_DEGREE = 60;

let startAngle = -ARC_DEGREE / 2 * (Math.PI / 180);
let endAngle = ARC_DEGREE / 2 * (Math.PI / 180);

class Ball {
    constructor(position, velocity) {
        this.pos = { ...position };
        this.vel = { ...velocity };
        this.color = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
        this.isIn = true;
    }

    update() {
        this.vel.y += GRAVITY;
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;

        const distToCenter = Math.hypot(this.pos.x - CIRCLE_CENTER.x, this.pos.y - CIRCLE_CENTER.y);

        // Ball hits outer circle boundary
        if (distToCenter + BALL_RADIUS > CIRCLE_RADIUS) {
            if (isBallInArc(this.pos, CIRCLE_CENTER, startAngle, endAngle)) {
                this.isIn = false;
            }
            if (this.isIn) {
                let d = { x: this.pos.x - CIRCLE_CENTER.x, y: this.pos.y - CIRCLE_CENTER.y };
                const dUnit = { x: d.x / distToCenter, y: d.y / distToCenter };

                this.pos.x = CIRCLE_CENTER.x + (CIRCLE_RADIUS - BALL_RADIUS) * dUnit.x;
                this.pos.y = CIRCLE_CENTER.y + (CIRCLE_RADIUS - BALL_RADIUS) * dUnit.y;

                let t = { x: -dUnit.y, y: dUnit.x };
                const projVt = (this.vel.x * t.x + this.vel.y * t.y) / (t.x ** 2 + t.y ** 2);

                this.vel = {
                    x: 2 * projVt * t.x - this.vel.x,
                    y: 2 * projVt * t.y - this.vel.y
                };

                this.vel.x += t.x * SPINNING_SPEED;
                this.vel.y += t.y * SPINNING_SPEED;
            }
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, BALL_RADIUS, 0, 2 * Math.PI);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}

function isBallInArc(ballPos, center, start, end) {
    const dx = ballPos.x - center.x;
    const dy = ballPos.y - center.y;
    let angle = Math.atan2(dy, dx);

    end = end % (2 * Math.PI);
    start = start % (2 * Math.PI);
    if (start > end) end += 2 * Math.PI;
    return start <= angle && angle <= end;
}

function drawArc(center, radius, start, end) {
    ctx.beginPath();
    ctx.moveTo(center.x, center.y);
    ctx.arc(center.x, center.y, radius + 1000, start, end);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

const balls = [
    new Ball({ x: WIDTH / 2, y: HEIGHT / 2 - 120 }, { x: 0, y: 0 })
];

function update() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    // Rotate arc
    startAngle += SPINNING_SPEED;
    endAngle += SPINNING_SPEED;

    // Draw circle boundary
    ctx.beginPath();
    ctx.arc(CIRCLE_CENTER.x, CIRCLE_CENTER.y, CIRCLE_RADIUS, 0, 2 * Math.PI);
    ctx.strokeStyle = "orange";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();

    // Draw arc
    drawArc(CIRCLE_CENTER, CIRCLE_RADIUS, startAngle, endAngle);

    // Update and draw balls
    for (let i = balls.length - 1; i >= 0; i--) {
        let ball = balls[i];
        if (ball.pos.y > HEIGHT || ball.pos.x < 0 || ball.pos.x > WIDTH || ball.pos.y < 0) {
            balls.splice(i, 1);
            balls.push(
                new Ball({ x: WIDTH / 2, y: HEIGHT / 2 - 120 }, { x: Math.random() * 8 - 4, y: Math.random() * 2 - 1 }),
                new Ball({ x: WIDTH / 2, y: HEIGHT / 2 - 120 }, { x: Math.random() * 8 - 4, y: Math.random() * 2 - 1 })
            );
        } else {
            ball.update();
            ball.draw();
        }
    }

    requestAnimationFrame(update);
}

// Start the game loop
update();
