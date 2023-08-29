//console.log("Start!");
const canvas = document.getElementById('drawingCanvas');
const context = canvas.getContext('2d');
const lineWidthRange = document.getElementById('lineWidthRange');
 // 获取清除按钮元素
const clearButton = document.getElementById('clearButton');

// 初始化画布大小
resizeCanvas();

// 当窗口大小更改时，调整画布大小
window.addEventListener('resize', resizeCanvas);

function resizeCanvas() {
    // 设置画布的宽度和高度与窗口大小一致
   canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // 在这里可以重新绘制任何内容，因为画布大小已更改

    // 示例：绘制一个矩形以填充整个画布
    //context.fillStyle = 'lightgray';
    //context.fillRect(0, 0, canvas.width, canvas.height);
}
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 20 ;

let drawing = false;
let lastX = 0;
let lastY = 0;
let lineWidth = lineWidthRange.value;

// 开始绘画
canvas.addEventListener('touchstart', (e) => {
    drawing = true;
    [lastX, lastY] = [e.touches[0].clientX, e.touches[0].clientY];
    context.beginPath();
    context.moveTo(lastX, lastY);
    //draw(e.touches[0].clientX, e.touches[0].clientY);
});

// 绘画中
canvas.addEventListener('touchmove', (e) => {
    if (!drawing) return;
    const pressure = e.touches[0].force || 0.5; // 获取压力值，如果不可用则使用默认值

    lineWidth = pressure * 20; // 基于压力值调整线条粗细
    lineWidthRange.value = lineWidth;
    context.lineWidth = lineWidth;
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.lineTo(e.touches[0].clientX, e.touches[0].clientY);
    context.stroke();
    
     // 显示压力值文本
    context.font = '20px Arial';
    context.fillStyle = 'red';
    const text = `Pressure:'+ pressure.toFixed(2);
    
    const textWidth = context.measureText(text).width;
    const x = window.innerWidth;
    const y = window.innerHeight;

    context.fillText(text, x, y);
    
    [lastX, lastY] = [e.touches[0].clientX, e.touches[0].clientY];
    
    //draw(e.touches[0].clientX, e.touches[0].clientY);
});

// 结束绘画
canvas.addEventListener('touchend', () => {
    drawing = false;
    context.beginPath();
});

// 调整线条粗细
lineWidthRange.addEventListener('input', () => {
    lineWidth = lineWidthRange.value;
});


clearButton.addEventListener('click', () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
});




/*******************************
function draw(x, y) {
    context.lineWidth = lineWidth; // 设置线条宽度
    context.lineCap = 'round'; // 设置线条末端为圆形
    context.strokeStyle = 'blue'; // 设置线条颜色

    context.lineTo(x, y);
    context.stroke();
    context.beginPath();
    context.moveTo(x, y);
}


*************************************************

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
