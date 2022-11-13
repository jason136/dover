class Chart {}
let euler = () => {};
let runge_kutta = () => {};

const canvas = document.getElementById("canvas");
const coord = document.getElementById("coord");
const plotType = document.getElementById("plot-type");
const status = document.getElementById("status");
let chart;

const form = document.getElementById('form');
form.addEventListener('submit', updatePlot);

export function setup(WasmChart, WasmEuler, WasmRK) {
    Chart = WasmChart;
    euler = WasmEuler;
    runge_kutta = WasmRK;
}

export function main() {
    setupUI();

    chart = Chart.new(canvas);
    document.getElementById("dxdt").value = "10*x-x*y";
    document.getElementById("dydt").value = "-0.1*y+x*y";
    document.getElementById("x_initial").value = "15";
    document.getElementById("y_initial").value = "15";
    document.getElementById("delta_t").value = "0.001";
    document.getElementById("t_final").value = "500";

    // setupCanvas();
}

function setupUI() {
    status.innerText = "WebAssembly loaded!";
    // plotType.addEventListener("change", updatePlot);
	// yaw.addEventListener("change", updatePlot);
	// pitch.addEventListener("change", updatePlot);
	// yaw.addEventListener("input", updatePlot);
	// pitch.addEventListener("input", updatePlot);
    // window.addEventListener("resize", setupCanvas);
    // window.addEventListener("mousemove", onMouseMove);
}

// function setupCanvas() {
// 	const dpr = window.devicePixelRatio || 1.0;
//     const aspectRatio = canvas.width / canvas.height;
//     const size = canvas.parentNode.offsetWidth * 0.8;
//     canvas.style.width = size + "px";
//     canvas.style.height = size / aspectRatio + "px";
//     canvas.width = size;
//     canvas.height = size / aspectRatio;
// }



function updatePlot(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());

    status.innerText = `Rendering...`;

    const start = performance.now();
	
    euler(
        chart, 
        formDataObj.dxdt, 
        formDataObj.dydt,
        formDataObj.x_initial,
        formDataObj.y_initial,
        0.0, 
        formDataObj.delta_t,
        formDataObj.t_final,
    );
    let end = performance.now();
    console.log(`Calculated in ${Math.ceil(end - start)}ms`)
    chart.generate_bounds();
    end = performance.now();
    console.log(`Bounds Generated in ${Math.ceil(end - start)}ms`)
    chart.draw();
    end = performance.now();
    console.log(`Drawn in ${Math.ceil(end - start)}ms`)
	
    end = performance.now();
    status.innerText = `Rendered in ${Math.ceil(end - start)}ms`;
}