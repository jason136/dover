
use wasm_bindgen::prelude::*;
use plotters::prelude::*;
use plotters_canvas::CanvasBackend;
use web_sys::HtmlCanvasElement;
use meval::Expr;

#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

// #[wasm_bindgen]
// extern "C" {
//     #[wasm_bindgen(js_namespace = console)]
//     fn log(s: &str);

//     #[wasm_bindgen(js_namespace = console, js_name = log)]
//     fn log_u32(a: u32);

//     #[wasm_bindgen(js_namespace = console, js_name = log)]
//     fn log_many(a: &str, b: &str);
// }

fn input_function(input: String) -> Result<impl Fn(f64, f64)-> f64, JsError> {
    let expression: Expr = input.trim().parse()?;
    let function = expression.bind2("x", "y")?;
    Ok(function)
}

#[wasm_bindgen]
pub struct Chart {
    points: Box<Vec<(f64, f64, f64)>>,
    canvas: HtmlCanvasElement,
    x_max: f64,
    x_min: f64,
    y_max: f64,
    y_min: f64,
}

#[wasm_bindgen]
impl Chart {
    pub fn new(canvas: HtmlCanvasElement) -> Self {
        Chart { 
            points: Box::new(vec![]), 
            canvas,
            x_max: 0.0,
            x_min: 0.0,
            y_max: 0.0,
            y_min: 0.0,
        }
    }

    pub fn adjust_bounds(&mut self, left: f64, right: f64, top: f64, bottom: f64) {
        let width = (self.x_max - self.x_min).abs();
        let height = (self.y_max - self.y_min).abs();

        self.x_max = self.x_max + width * right;
        self.x_min = self.x_min - width * left;
        self.y_max = self.y_max + height * top;
        self.y_min = self.y_min - height * bottom;
    }

    pub fn get_points(&self) -> Vec<f64> {
        self.points.iter().flat_map(|p| 
            std::iter::once(p.0)
            .chain(std::iter::once(p.1))
            .chain(std::iter::once(p.2))).collect()
    }

    pub fn generate_bounds(&mut self) {
        let t_values: Vec<f64> = self.points.iter().cloned().map(|p| p.0).collect();
        let x_values = self.points.iter().cloned().map(|p| p.1);
        let y_values = self.points.iter().cloned().map(|p| p.2);

        let mut x_max = x_values.clone().fold(f64::NEG_INFINITY, f64::max);
        let mut x_min = x_values.clone().fold(f64::INFINITY, f64::min);
        let mut y_max = y_values.clone().fold(f64::NEG_INFINITY, f64::max);
        let mut y_min = y_values.clone().fold(f64::INFINITY, f64::min);
        x_max = f64::min((x_max + (x_max - x_min) * 0.1).ceil(), f64::MAX);
        x_min = f64::max((x_min - (x_max - x_min) * 0.1).floor(), f64::MIN);
        y_max = f64::min((y_max + (y_max - y_min) * 0.1).ceil(), f64::MAX);
        y_min = f64::max((y_min - (y_max - y_min) * 0.1).floor(), f64::MIN);

        let mut t_max = f64::max(t_values[0], t_values[t_values.len() - 1]);
        let mut t_min = f64::min(t_values[0], t_values[t_values.len() - 1]);
        t_max = f64::min(t_max + (t_max - t_min) * 0.1, f64::MAX);
        t_min = f64::max(t_min - (t_max - t_min) * 0.1, f64::MIN);

        self.x_max = t_max;
        self.x_min = t_min;
        self.y_max = f64::max(x_max, y_max);
        self.y_min = f64::min(x_min, y_min);
    }

    pub fn draw(&self) -> Result<(), JsError> {  
        if self.points.len() == 0 {
            return Ok(())
        }
        
        let backend = CanvasBackend::with_canvas_object(self.canvas.clone()).unwrap();
        let root = backend.into_drawing_area();
        root.fill(&WHITE)?;
    
        let mut chart = ChartBuilder::on(&root)
            .margin(20u32)
            .x_label_area_size(30u32)
            .y_label_area_size(30u32)
            // .caption("Chart Name", ("sans-serif", 50))        
            .build_cartesian_2d(self.x_min..self.x_max, self.y_min..self.y_max)?;
        
        chart.configure_mesh().x_labels(3).y_labels(3).draw()?;

        let x_points: Vec<(f64, f64)> = self.points.iter().cloned().map(|p| (p.0, p.1)).collect();
        let y_points: Vec<(f64, f64)> = self.points.iter().cloned().map(|p| (p.0, p.2)).collect();
    
        chart.draw_series(std::iter::once(PathElement::new(x_points, &RED)))?;
        chart.draw_series(std::iter::once(PathElement::new(y_points, &BLUE)))?;
        root.present()?;

        Ok(())
    }
}

#[wasm_bindgen]
pub fn euler(
    chart: &mut Chart, 
    dxdt: String, 
    dydt: String,
    x_initial: f64, 
    y_initial: f64,
    t_initial: f64,
    delta_t: f64,
    t_final: f64,
) -> Result<usize, JsError> {
    let mut x = x_initial;
    let mut y = y_initial;
    let mut t = t_initial;
    let mut points: Vec<(f64, f64, f64)> = vec![];

    let f1 = input_function(dxdt)?;
    let f2 = input_function(dydt)?;

    for _i in 0..(t_final / delta_t) as u32 {
        t = t + delta_t;
        let x_next = x + f1(x, y) * delta_t;
        let y_next = y + f2(x, y) * delta_t;

        if !(x_next.is_finite() && y_next.is_finite()) {
            break;
        }

        points.push((t, x_next, y_next));
        x = x_next;
        y = y_next;
    }

    let len = points.len();
    chart.points = Box::new(points);

    Ok(len)
}

#[wasm_bindgen]
pub fn runge_kutta(
    chart: &mut Chart, 
    dxdt: String, 
    dydt: String,
    x_initial: f64, 
    y_initial: f64,
    t_initial: f64,
    delta_t: f64,
    t_final: f64,
) -> Result<usize, JsError> {
    let mut x = x_initial;
    let mut y = y_initial;
    let mut t = t_initial;
    let mut points: Vec<(f64, f64, f64)> = vec![];

    let f1 = input_function(dxdt)?;
    let f2 = input_function(dydt)?;

    for _i in 0..(t_final / delta_t) as u32 {
        t = t + delta_t;
        let xk1 = f1(x, y);
        let yk1 = f2(x, y);
        let xk2 = f1(x + delta_t / 2.0 * xk1, y + delta_t / 2.0 * yk1);
        let yk2 = f2(x + delta_t / 2.0 * xk1, y + delta_t / 2.0 * yk1);
        let xk3 = f1(x + delta_t / 2.0 * xk2, y + delta_t / 2.0 * yk2);
        let yk3 = f2(x + delta_t / 2.0 * xk2, y + delta_t / 2.0 * yk2);
        let xk4 = f1(x + delta_t * xk3, y + delta_t * yk3);
        let yk4 = f2(x + delta_t * xk3, y + delta_t * yk3);

        let x_next = x + delta_t / 6.0 * (xk1 + 2.0 * xk2 + 2.0 * xk3 + xk4);
        let y_next = y + delta_t / 6.0 * (yk1 + 2.0 * yk2 + 2.0 * yk3 + yk4);

        if !(x_next.is_finite() && y_next.is_finite()) {
            break;
        }

        points.push((t, x_next, y_next));
        x = x_next;
        y = y_next;
    }
    
    let len = points.len();
    chart.points = Box::new(points);

    Ok(len)
}