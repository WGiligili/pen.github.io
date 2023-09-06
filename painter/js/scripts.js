const canvas = document.getElementById('drawingCanvas');//獲取元素
const context = canvas.getContext('2d');//獲取上下文
const clearButton = document.getElementById('clearButton');
const Pressed =document.getElementById('Pressed');
const lineWidthRange = document.getElementById('lineWidthRange');

//畫布放置位子移動距離
let cutwidth =  window.innerWidth * 0.1 ;
let cutheight = window.innerWidth * 0.1 ;
//畫布大小
canvas.width =  window.innerWidth - cutwidth;
canvas.height = window.innerHeight - cutheight;


let drawing = false;
let lastX = 0;
let lastY = 0;

let pressValue = Pressed.value;
let lineWidth = lineWidthRange.value + pressValue;


//顏色與線條粗細
context.strokeStyle = 'black';
context.lineWidth = lineWidth + Pressed.value;

// 初始化画布大小, 当窗口大小更改时，调整画布大小
window.addEventListener('resize', resizeCanvas);
function resizeCanvas() {
    // 设置画布的宽度和高度与窗口大小一致
    canvas.width = window.innerWidth - cutwidth; 
    canvas.height = window.innerHeight - cutheight ;
}
// 调整线条粗细
lineWidthRange.addEventListener('input', () => {
    lineWidth = lineWidthRange.value;
});




///繪畫事件/// 滑鼠與觸控 控制元件不同需要分開寫
// 滑鼠
canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    [lastX, lastY] = [e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top];
});

canvas.addEventListener('mouseup', () => {
    drawing = false;
});
canvas.addEventListener('mousemove', draw);
//觸控
canvas.addEventListener('touchstart', touchStart);
canvas.addEventListener('touchmove', touchMove);
canvas.addEventListener('touchend', () => {
    drawing = false;
});

//清除按鈕
clearButton.addEventListener('click', () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
});
//滑鼠繪製
function draw(e) {
    if (!drawing) return;

    context.lineWidth = lineWidth;
    context.lineCap = 'round';
    context.strokeStyle = 'black';

    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
    context.stroke();//線條
    //更新移動點
    [lastX, lastY] = [e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top];
}
function touchStart(e) {
    drawing = true;
    const touch = e.touches[0];
    [lastX, lastY] = [touch.clientX - canvas.getBoundingClientRect().left, touch.clientY - canvas.getBoundingClientRect().top];
}

function touchMove(e) {
    if (!drawing) return;

    const touch = e.touches[0];
    context.lineWidth = lineWidth;
    context.lineCap = 'round';
    context.strokeStyle = 'black';

    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(touch.clientX - canvas.getBoundingClientRect().left, touch.clientY - canvas.getBoundingClientRect().top);
    context.stroke();

    [lastX, lastY] = [touch.clientX - canvas.getBoundingClientRect().left, touch.clientY - canvas.getBoundingClientRect().top];
}

// 添加触控笔感压值事件处理
canvas.addEventListener('pointermove', (e) => {
    if (e.pointerType === 'pen') {
        Pressed.value = e.pressure;
        lineWidth = e.pressure * 20; // 调整线条粗细基于压感值
    }
});

console.log('pressValue:'+pressValue ,'lineWidth:'+ lineWidth );