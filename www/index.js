class Chart {}
let euler = () => {};
let runge_kutta = () => {};

const canvas = document.getElementById("canvas");
const status = document.getElementById("status");
let chart;

const form = document.getElementById('form');

export function setup(WasmChart, WasmEuler, WasmRK) {
    Chart = WasmChart;
    euler = WasmEuler;
    runge_kutta = WasmRK;
}

export function main() {
    chart = Chart.new(canvas);
    document.getElementById("dxdt").value = "10*x-x*y";
    document.getElementById("dydt").value = "-1*y+x*y";
    document.getElementById("x_initial").value = "20";
    document.getElementById("y_initial").value = "5";
    document.getElementById("delta_t").value = "0.001";
    document.getElementById("t_final").value = "50";

    status.innerText = "WebAssembly loaded!";
    setupCanvas();
    window.addEventListener("resize", setupCanvas);

    document.getElementById ("euler").addEventListener('click', plotEuler);
    document.getElementById ("rk").addEventListener('click', plotRK);
    
    document.getElementById ("in").addEventListener('click', () => {
        chart.adjust_bounds(-0.1, -0.1, -0.1, -0.1);
        chart.draw();
    });
    document.getElementById ("out").addEventListener('click', () => {
        chart.adjust_bounds(0.1, 0.1, 0.1, 0.1);
        chart.draw();
    });
    document.getElementById ("left").addEventListener('click', () => {
        chart.adjust_bounds(0.2, -0.2, 0.0, 0.0);
        chart.draw();
    });
    document.getElementById ("right").addEventListener('click', () => {
        chart.adjust_bounds(-0.2, 0.2, 0.0, 0.0);
        chart.draw();
    });
    document.getElementById ("up").addEventListener('click', () => {
        chart.adjust_bounds(0.0, 0.0, 0.2, -0.2);
        chart.draw();
    });
    document.getElementById ("down").addEventListener('click', () => {
        chart.adjust_bounds(0.0, 0.0, -0.2, 0.2);
        chart.draw();
    });
    document.getElementById ("stretchX").addEventListener('click', () => {
        chart.adjust_bounds(-0.1, -0.1, 0.0, 0.0);
        chart.draw();
    });
    document.getElementById ("stretchY").addEventListener('click', () => {
        chart.adjust_bounds(0.0, 0.0, -0.1, -0.1);
        chart.draw();
    });
    document.getElementById ("shrinkX").addEventListener('click', () => {
        chart.adjust_bounds(0.1, 0.1, 0.0, 0.0);
        chart.draw();
    });
    document.getElementById ("shrinkY").addEventListener('click', () => {
        chart.adjust_bounds(0.0, 0.0, 0.1, 0.1);
        chart.draw();
    });
}

function setupCanvas() {
    const aspectRatio = canvas.width / canvas.height;
    const size = canvas.parentNode.offsetWidth * 0.7;
    canvas.style.width = size + "px";
    canvas.style.height = size / aspectRatio + "px";
    canvas.width = size;
    canvas.height = size / aspectRatio;
}

function plotEuler(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const formDataObj = Object.fromEntries(formData.entries());

    status.innerText = `Rendering...`;
    const start = performance.now();
	
    let len = euler(
        chart, 
        formDataObj.dxdt, 
        formDataObj.dydt,
        formDataObj.x_initial,
        formDataObj.y_initial,
        0.0, 
        formDataObj.delta_t,
        formDataObj.t_final,
    );
    chart.generate_bounds();
    chart.draw();
    const end = performance.now();
    status.innerText = `Rendered ${len} datapoints in ${Math.ceil(end - start)}ms`;
}

function plotRK(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const formDataObj = Object.fromEntries(formData.entries());

    status.innerText = `Rendering...`;
    const start = performance.now();
	
    let len = runge_kutta(
        chart, 
        formDataObj.dxdt, 
        formDataObj.dydt,
        formDataObj.x_initial,
        formDataObj.y_initial,
        0.0, 
        formDataObj.delta_t,
        formDataObj.t_final,
    );
    chart.generate_bounds();
    chart.draw();
    const end = performance.now();
    status.innerText = `Rendered ${len} datapoints in ${Math.ceil(end - start)}ms`;
}