class Chart {}
let euler = () => {};
let runge_kutta = () => {};

const canvas = document.getElementById("canvas");
const status = document.getElementById("status");
const error = document.getElementById("error");
let chart;

const form = document.getElementById('form');

export function setup(WasmChart, WasmEuler, WasmRK) {
    Chart = WasmChart;
    euler = WasmEuler;
    runge_kutta = WasmRK;
}

function setupCanvas() {
    const aspectRatio = canvas.width / canvas.height;
    const size = canvas.parentNode.offsetWidth * 0.7;
    canvas.style.width = size + "px";
    canvas.style.height = size / aspectRatio + "px";
    canvas.width = size;
    canvas.height = size / aspectRatio;
    chart.draw();
}

function plot(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const formDataObj = Object.fromEntries(formData.entries());

    status.innerText = `Rendering...`;
    const start = performance.now();
    const expectedLen = formDataObj.t_final / formDataObj.delta_t;
    let len;
    
    if (event.target.id == 'euler') {
        len = euler(
            chart, 
            formDataObj.dxdt, 
            formDataObj.dydt,
            formDataObj.x_initial,
            formDataObj.y_initial,
            0.0, 
            formDataObj.delta_t,
            formDataObj.t_final,
        );
    }
    else if (event.target.id == 'rk') {
        len = runge_kutta(
            chart, 
            formDataObj.dxdt, 
            formDataObj.dydt,
            formDataObj.x_initial,
            formDataObj.y_initial,
            0.0, 
            formDataObj.delta_t,
            formDataObj.t_final,
        );
    }

    if (len != expectedLen) {
        error.innerText = `Error: f64 overflow after ${len} iterations`;
    }
    else {
        error.innerText = '';
    }

    chart.generate_bounds();
    chart.draw();
    const end = performance.now();
    status.innerText = `Rendered ${len} datapoints in ${Math.ceil(end - start)}ms`;
    document.getElementById ("download").innerText = `Download (~${len * 50 / 1000000} mb)`;
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

    document.getElementById ("euler").addEventListener('click', plot);
    document.getElementById ("rk").addEventListener('click', plot);
    
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
    
    document.getElementById ("points").addEventListener('click', () => {
        const points = Array.from(chart.get_points());

        let w = window.open("");
        w.document.write(`
            <table style="width:50%">
            <tr>
                <td>T</td>
                <td>X</td>
                <td>Y</td>
            </tr>
        `);
        while (points.length > 0) {
            const t = points.shift();
            const x = points.shift();
            const y = points.shift();
            w.document.write(`
                <tr>
                    <td>${t}</td>
                    <td>${x}</td>
                    <td>${y}</td>
                </tr>
            `);
        }
        w.document.write("</table>");
    });
    document.getElementById ("download").addEventListener('click', () => {
        const points = Array.from(chart.get_points());
        let csvContent = "data:text/csv;charset=utf-8,";

        csvContent += "T,X,Y\r\n";
        for (let i = 0; i < points.length; i += 3) {
            const t = points[i];
            const x = points[i+1];
            const y = points[i+2];
            csvContent += `${t},${x},${y}\r\n`;
        }

        let encodedUri = encodeURI(csvContent);
        let link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "points.csv");
        document.body.appendChild(link);
        link.click();
    });
}