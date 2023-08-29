console.log("Start!");
const canvas = document.getElementById('drawingCanvas');
const context = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let drawing = false;

        // 开始绘画
        canvas.addEventListener('touchstart', (e) => {
            drawing = true;
            draw(e.touches[0].clientX, e.touches[0].clientY);
        });

        // 绘画中
        canvas.addEventListener('touchmove', (e) => {
            if (!drawing) return;
            draw(e.touches[0].clientX, e.touches[0].clientY);
        });

        // 结束绘画
        canvas.addEventListener('touchend', () => {
            drawing = false;
            context.beginPath();
        });

        function draw(x, y) {
            context.lineWidth = 5; // 设置线条宽度
            context.lineCap = 'round'; // 设置线条末端为圆形
            context.strokeStyle = 'black'; // 设置线条颜色

            context.lineTo(x, y);
            context.stroke();
            context.beginPath();
            context.moveTo(x, y);
        }
/*
const canvas = document.getElementById('drawingCanvas');
const context = canvas.getContext('2d');
const clearButton = document.getElementById('clearButton');

let isDrawing = false;
let lastX = 0;
let lastY = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

context.lineJoin = 'round';
context.lineCap = 'round';
context.lineWidth = 1;

function draw(e) {
    if (!isDrawing) return;
    context.strokeStyle = `rgba(0,0,0,${e.pressure})`; // 根据压感调整线条透明度
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(e.clientX, e.clientY);
    context.stroke();
    [lastX, lastY] = [e.clientX, e.clientY];
}

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.clientX, e.clientY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

clearButton.addEventListener('click', () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
});
*/
