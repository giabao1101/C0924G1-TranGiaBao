class Rectangle{
    height;
    width;
    constructor(height,width) {
        this.height = height;
        this.width = width;
    }
    getArea() {
        return this.height * this.width;
    }
    getPerimeter() {
        return this.height*2 + this.width*2;
    }
    drawRectangle() {
        // Lấy canvas từ HTML
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        // Xóa canvas trước khi vẽ mới
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Vẽ hình chữ nhật
        ctx.fillStyle = '#3498db';
        ctx.fillRect(10, 10, this.width, this.height);
    }
}