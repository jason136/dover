class Chart {}
const canvas = document.getElementById("canvas");
const status = document.getElementById("status");
const error = document.getElementById("error");
let chart;

const form = document.getElementById('form');

export function setup(WasmChart) {
    Chart = WasmChart;
}

function setupCanvas() {
    let width = window.innerWidth - 60;
    let height = window.innerHeight - 100;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    canvas.width = width;
    canvas.height = height;
    chart.full_draw();
}

export function main() {
    chart = Chart.new(canvas);

    let example_dxdt = "y";
    let example_dydt = "-x-y";
    document.getElementById("dxdt").value = example_dxdt;
    document.getElementById("dydt").value = example_dydt;
    // document.getElementById("delta_t").value = "0.001";
    chart.set_equations(example_dxdt, example_dydt)

    status.innerText = "WebAssembly loaded!";
    setupCanvas();
    window.addEventListener("resize", setupCanvas);
    
    let last_mouse_x = null;
    let last_mouse_y = null;
    let drag = (e) => {
        e.preventDefault();
        if (last_mouse_x !== null) {
            const dx = e.offsetX - last_mouse_x;
            const dy = e.offsetY - last_mouse_y;
            chart.move_offset(-dx, dy);
            last_mouse_x += dx;
            last_mouse_y += dy;
        }
    };

    let require_full_draw = false;
    canvas.onmousedown = (e) => {
        e.preventDefault();
        
        if (e.button === 2) {
            canvas.addEventListener('contextmenu', (e) => e.preventDefault());
            last_mouse_x = e.offsetX;
            last_mouse_y = e.offsetY;
            window.addEventListener('mousemove', drag, true);
            require_full_draw = true;
        }
        if (e.button === 0) {
            let actualRect = canvas.getBoundingClientRect();
            let logicX = e.offsetX * canvas.width / actualRect.width;
            let logicY = e.offsetY * canvas.height / actualRect.height;
            const mouse_pos = chart.coord(logicX, logicY);
            chart.add_line(mouse_pos.x, mouse_pos.y);
        }
    };

    window.onmouseup = () => {
        if (require_full_draw) {
            chart.full_draw();
            require_full_draw = false;
        }
        last_mouse_x = null;
        last_mouse_y = null;
        canvas.removeEventListener('contextmenu', (e) => e.preventDefault());
        window.removeEventListener('mousemove', drag, true);
    }

    canvas.addEventListener('wheel', (e) => {
      e.preventDefault();

      let actualRect = canvas.getBoundingClientRect();
      let logicX = e.offsetX * canvas.width / actualRect.width;
      let logicY = e.offsetY * canvas.height / actualRect.height;
      const mouse_pos = chart.coord(logicX, logicY);
      chart.zoom((e.deltaY || -e.detail) < 0, mouse_pos.x, mouse_pos.y);
      error.innerText = `position: ${mouse_pos.x}, ${mouse_pos.y}`;
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

    document.getElementById ("reset").addEventListener('click', () => {
        chart.clear();
    });

    function load_functions() {
        const formData = new FormData(form);
        const { dxdt, dydt } = Object.fromEntries(formData.entries());
        let error = chart.set_equations(dxdt, dydt);
        console.log(error);
    }
    document.getElementById ("dxdt").addEventListener('change', (e) => load_functions());
    document.getElementById ("dydt").addEventListener('change', (e) => load_functions());
}