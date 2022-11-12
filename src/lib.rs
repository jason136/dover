
use wasm_bindgen::prelude::*;
use plotters::prelude::*;
use plotters_canvas::CanvasBackend;
use web_sys::HtmlCanvasElement;
use meval::Expr;

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_u32(a: u32);

    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_many(a: &str, b: &str);
}

fn input_function(input: String) -> Result<impl Fn(f64, f64)-> f64, JsError> {
    let expression: Expr = input.trim().parse()?;
    let function = expression.bind2("x", "y")?;
    Ok(function)
}

fn draw(canvas: HtmlCanvasElement, points: Vec<(f64, f64)>) -> Result<(), JsError> {
    log("draw called");

    let x_values = points.iter().map(|p| p.0);
    let y_values = points.iter().map(|p| p.1);

    let min_x = x_values.clone().fold(f64::INFINITY, f64::min);
    let max_x = x_values.fold(f64::NEG_INFINITY, f64::max);
    let min_y = y_values.clone().fold(f64::INFINITY, f64::min);
    let max_y = y_values.fold(f64::NEG_INFINITY, f64::max);

    log("calculation finished");

    log(format!("minx: {} maxx: {} miny: {} maxy: {}", min_x, max_x, min_y, max_y).as_str());

    let backend = CanvasBackend::with_canvas_object(canvas).unwrap();
    let root = backend.into_drawing_area();
    root.fill(&WHITE)?;

    let mut chart = ChartBuilder::on(&root)
        .margin(20u32)
        .x_label_area_size(30u32)
        .y_label_area_size(30u32)
        .caption("Chart Name", ("sans-serif", 50))        
        .build_cartesian_2d(min_x..max_x, min_y..max_y)?;

    log("chart built");

    chart.configure_mesh().x_labels(3).y_labels(3).draw()?;

    chart.draw_series(std::iter::once(PathElement::new(points, &RED)))?;
    root.present()?;

    log("graph rendered");

    Ok(())
}

#[wasm_bindgen]
pub struct Chart {

}

#[wasm_bindgen]
impl Chart {
    pub fn euler(
        canvas: HtmlCanvasElement, 
        dxdt: String, 
        dydt: String,
        initial_x: f64, 
        initial_y: f64,
        initial_t: f64,
        delta_t: f64,
        iter: u32,
    ) -> Result<(), JsError> {
        let mut x = initial_x;
        let mut y = initial_y;
        let mut points: Vec<(f64, f64)> = vec![];

        let f1 = input_function(dxdt)?;
        let f2 = input_function(dydt)?;

        log(format!("x: {} y: {} dt: {} iter: {}", initial_x, initial_y, delta_t, iter).as_str());

        log(format!("function called iter: {}", iter).as_str());

        for _i in 0..iter {
            let mut x_next = x + f1(x, y) * delta_t;
            let mut y_next = y + f2(x, y) * delta_t;

            if x_next == f64::NEG_INFINITY {
                x_next = f64::MIN;
            }
            else if x_next == f64::INFINITY {
                x_next = f64::MAX;
            }
            if y_next == f64::NEG_INFINITY {
                y_next = f64::MIN;
            }
            else if y_next == f64::INFINITY {
                y_next = f64::MAX;
            }

            points.push((x_next, y_next));
            x = x_next;
            y = y_next;

            // log(format!("x: {}, y: {}", x, y).as_str());
        }

        log("drawing!");

        draw(canvas, points.clone())
    }

    pub fn runge_kutta(
        canvas: HtmlCanvasElement,
        dxdt: String, 
        dydt: String,
        initial_x: f64, 
        initial_y: f64,
        initial_t: f64,
        iter: u32,
        delta_t: f64,
    ) -> Result<(), JsError> {
        let mut x = initial_x;
        let mut y = initial_y;
        let mut points: Vec<(f64, f64)> = vec![];

        let f1 = input_function(dxdt)?;
        let f2 = input_function(dydt)?;

        for _i in 0..iter as u32 {
            let xk1 = f1(x, y);
            let yk1 = f2(x, y);
            let xk2 = f1(x + delta_t / 2.0 * xk1, y + delta_t / 2.0 * yk1);
            let yk2 = f2(x + delta_t / 2.0 * xk1, y + delta_t / 2.0 * yk1);
            let xk3 = f1(x + delta_t / 2.0 * xk2, y + delta_t / 2.0 * yk2);
            let yk3 = f2(x + delta_t / 2.0 * xk2, y + delta_t / 2.0 * yk2);
            let xk4 = f1(x + delta_t * xk3, y + delta_t * yk3);
            let yk4 = f2(x + delta_t * xk3, y + delta_t * yk3);

            let mut x_next = x + delta_t / 6.0 * (xk1 + 2.0 * xk2 + 2.0 * xk3 + xk4);
            let mut y_next = y + delta_t / 6.0 * (yk1 + 2.0 * yk2 + 2.0 * yk3 + yk4);

            if x_next == f64::NEG_INFINITY {
                x_next = f64::MIN;
            }
            else if x_next == f64::INFINITY {
                x_next = f64::MAX;
            }
            if y_next == f64::NEG_INFINITY {
                y_next = f64::MIN;
            }
            else if y_next == f64::INFINITY {
                y_next = f64::MAX;
            }

            points.push((x_next, y_next));
            x = x_next;
            y = y_next;
        }
        
        draw(canvas, points.clone())
    }
}