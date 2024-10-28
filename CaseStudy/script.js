// Lấy canvas và ngữ cảnh vẽ 2D
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;
let backgroundImage = new Image();
backgroundImage.src = 'https://i.ytimg.com/vi/0p1-FG_xZNo/maxresdefault.jpg'; // Update with the correct path

// Định nghĩa nhân vật
class Fighter {
    constructor(x, y, color, controls) {
        this.initialX = x;
        this.initialY = y;
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 80;
        this.color = color;
        this.speed = 5;
        this.health = 100;
        this.isJumping = false;
        this.dy = 0;
        this.gravity = 0.5;
        this.attackRange = 30;
        this.controls = controls;
        this.isAttacking = false;
        this.isUsingSkill = false;
        this.skillCooldown = 0;
    }

    reset() {
        // Reset vị trí và trạng thái
        this.x = this.initialX;
        this.y = this.initialY;
        this.health = 100;
        this.isJumping = false;
        this.dy = 0;
        this.isAttacking = false;
        this.isUsingSkill = false;
        this.skillCooldown = 0;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Hiển thị thanh máu
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y - 20, this.width * (this.health / 100), 10);
    }

    move() {
        // Di chuyển và nhảy
        if (this.controls.left && this.x > 0) {
            this.x -= this.speed;
        }
        if (this.controls.right && this.x < canvas.width - this.width) {
            this.x += this.speed;
        }
        if (this.isJumping) {
            this.y += this.dy;
            this.dy += this.gravity;
            if (this.y + this.height >= canvas.height) {
                this.y = canvas.height - this.height;
                this.isJumping = false;
            }
        }
    }

    attack(opponent) {
        if (this.isAttacking) {
            if (
                this.x + this.attackRange > opponent.x &&
                this.x < opponent.x + opponent.width &&
                this.y + this.height > opponent.y &&
                this.y < opponent.y + opponent.height
            ) {
                opponent.health -= 5;
                this.isAttacking = false;
            }
        }
    }

    useSkill(opponent) {
        if (this.isUsingSkill && this.skillCooldown === 0) {
            if (
                this.x + this.attackRange * 3 > opponent.x &&
                this.x < opponent.x + opponent.width &&
                this.y + this.height > opponent.y &&
                this.y < opponent.y + opponent.height
            ) {
                opponent.health -= 20;
                this.skillCooldown = 100;
                this.isUsingSkill = false;
            }
        }
    }

    cooldownSkill() {
        if (this.skillCooldown > 0) {
            this.skillCooldown--;
        }
    }
}

// Tạo nhân vật với các phím điều khiển
const player1 = new Fighter(100, canvas.height - 80, "blue", {
    left: false,
    right: false,
    up: false,
    attack: false,
    skill: false,
});
const player2 = new Fighter(600, canvas.height - 80, "red", {
    left: false,
    right: false,
    up: false,
    attack: false,
    skill: false,
});

// Biến điều khiển trạng thái trò chơi
let gameOver = false;
let winner = "";

// Bắt sự kiện phím cho cả hai người chơi
document.addEventListener("keydown", (e) => {
    if (!gameOver) {
        switch (e.key) {
            case "a":
                player1.controls.left = true;
                break;
            case "d":
                player1.controls.right = true;
                break;
            case "w":
                if (!player1.isJumping) {
                    player1.dy = -10;
                    player1.isJumping = true;
                }
                break;
            case "j":
                player1.isAttacking = true;
                break;
            case "k":
                player1.isUsingSkill = true;
                break;
            case "ArrowLeft":
                player2.controls.left = true;
                break;
            case "ArrowRight":
                player2.controls.right = true;
                break;
            case "ArrowUp":
                if (!player2.isJumping) {
                    player2.dy = -10;
                    player2.isJumping = true;
                }
                break;
            case "1":
                player2.isAttacking = true;
                break;
            case "2":
                player2.isUsingSkill = true;
                break;
        }
    }
});

document.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "a":
            player1.controls.left = false;
            break;
        case "d":
            player1.controls.right = false;
            break;
        case "j":
            player1.isAttacking = false;
            break;
        case "k":
            player1.isUsingSkill = false;
            break;
        case "ArrowLeft":
            player2.controls.left = false;
            break;
        case "ArrowRight":
            player2.controls.right = false;
            break;
        case "1":
            player2.isAttacking = false;
            break;
        case "2":
            player2.isUsingSkill = false;
            break;
    }
});

// Hàm cập nhật trò chơi
function updateGame() {
    if (!gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

        // Draw the background
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

        // Vẽ và di chuyển nhân vật
        player1.move();
        player2.move();
        player1.draw();
        player2.draw();

        // Kiểm tra va chạm tấn công và sử dụng kỹ năng
        player1.attack(player2);
        player2.attack(player1);
        player1.useSkill(player2);
        player2.useSkill(player1);

        // Cập nhật thời gian hồi kỹ năng
        player1.cooldownSkill();
        player2.cooldownSkill();

        // Kiểm tra kết thúc trò chơi
        if (player1.health <= 0) {
            gameOver = true;
            winner = "Player 2 Wins!";
            showRestartButton();
        } else if (player2.health <= 0) {
            gameOver = true;
            winner = "Player 1 Wins!";
            showRestartButton();
        }

        requestAnimationFrame(updateGame);
    } else {
        // Hiển thị kết quả trò chơi
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText(winner, canvas.width / 2 - 100, canvas.height / 2);
    }
}

// Hiển thị nút "Chơi Lại"
function showRestartButton() {
    const button = document.createElement("button");
    button.innerHTML = "Play Again";
    button.style.position = "absolute";
    button.style.top = canvas.height / 2 + "px";
    button.style.left = canvas.width / 2 - 50 + "px";
    button.style.padding = "10px 20px";
    button.style.fontSize = "16px";
    document.body.appendChild(button);

    // Bắt sự kiện click để reset game
    button.addEventListener("click", () => {
        resetGame();
        document.body.removeChild(button);
    });
}

// Hàm reset game
function resetGame() {
    player1.reset();
    player2.reset();
    gameOver = false;
    winner = "";
    updateGame();
}

// Bắt đầu trò chơi
updateGame();
