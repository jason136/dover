class Chart {}

const canvas = document.getElementById("canvas");
const coord = document.getElementById("coord");
const plotType = document.getElementById("plot-type");
const status = document.getElementById("status");

const form = document.getElementById('form');
form.addEventListener('submit', updatePlot);

let chart = null;

export function setup(WasmChart) {
    Chart = WasmChart;
}

export function main() {
    setupUI();
    setupCanvas();
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

function setupCanvas() {
	const dpr = window.devicePixelRatio || 1.0;
    const aspectRatio = canvas.width / canvas.height;
    const size = canvas.parentNode.offsetWidth * 0.8;
    canvas.style.width = size + "px";
    canvas.style.height = size / aspectRatio + "px";
    canvas.width = size;
    canvas.height = size / aspectRatio;
}



function updatePlot(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formDataObj = Object.fromEntries(formData.entries());

    status.innerText = `Rendering...`;
    chart = null;
    const start = performance.now();
	
    const result = Chart.euler(
        canvas, 
        formDataObj.dxdt, 
        formDataObj.dydt,
        formDataObj.initial_x,
        formDataObj.initial_y,
        0.0, 
        formDataObj.delta_t,
        formDataObj.iter,
    );

    console.log(result);
	
    const end = performance.now();
    status.innerText = `Rendered in ${Math.ceil(end - start)}ms`;
}