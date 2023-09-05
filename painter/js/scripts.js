const canvas = document.getElementById('drawingCanvas');
const context = canvas.getContext('2d');
const clearButton = document.getElementById('clearButton');
const Pressed =document.getElementById('Pressed');
const lineWidthRange = document.getElementById('lineWidthRange');

let cutwidth =  window.innerWidth * 0.1 ;
let cutheight = window.innerWidth * 0.1 ;

canvas.width = window.innerWidth - cutwidth;
canvas.height = window.innerHeight - cutheight;
let drawing = false;
let lastX = 0;
let lastY = 0;
let lineWidth = lineWidthRange.value;
let pressValue = Pressed.value;

// 初始化画布大小
//resizeCanvas();
// 当窗口大小更改时，调整画布大小
window.addEventListener('resize', resizeCanvas);
function resizeCanvas() {
    // 设置画布的宽度和高度与窗口大小一致
    canvas.width = window.innerWidth -cutwidth; 
    canvas.height = window.innerHeight -cutheight;
}

// 开始绘画
canvas.addEventListener('touchstart', (e) => {
    drawing = true;
    [lastX, lastY] = [e.touches[0].clientX-cutwidth, e.touches[0].clientY-cutheight];

    context.beginPath();
    context.moveTo(lastX, lastY);
    draw(e.touches[0].clientX, e.touches[0].clientY);
});

function draw(x, y) {
    
    context.lineWidth = lineWidth; // 设置线条宽度
    context.lineCap = 'round'; // 设置线条末端为圆形
    context.strokeStyle = 'blue'; // 设置线条颜色

    context.lineTo(x, y);
    context.stroke();
    context.beginPath();
    context.moveTo(x, y);
}


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
// 绘画中
canvas.addEventListener('touchmove', (e) => {
    if (!drawing) return;
    const pressure = e.touches[0].force || 0.5; // 获取压力值，如果不可用则使用默认值
    Pressed.textContent = pressure;
    
    lineWidth = pressure * 20; // 基于压力值调整线条粗细
    lineWidthRange.value = lineWidth;
    context.lineWidth = lineWidth;
    context.lineCap = 'round';
    context.strokeStyle = 'black';
    context.lineTo(e.touches[0].clientX, e.touches[0].clientY);
    context.stroke();

    
    const textWidth = context.measureText(text).width;
    const x = canvas.width;
    const y = canvas.height;
    context.fillText(text, x, y);
    
    [lastX, lastY] = [e.touches[0].clientX - cutwidth, e.touches[0].clientY - cutheight];
    
    draw(e.touches[0].clientX, e.touches[0].clientY);   
   
});
 // 显示压力值文本
 context.font = '16px Arial';
 context.fillStyle = 'red';
 const text = `Pressure: ${pressure.toFixed(2)}`;
