use wasm_bindgen::prelude::*;
use plotters::{prelude::*};
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
    canvas: HtmlCanvasElement,
    chart_width: f64, 
    chart_height: f64,
    chart_offset_x: f64, 
    chart_offset_y: f64,
    convert: Box<dyn Fn((i32, i32)) -> Option<(f64, f64)>>,
    dxdt: Box<dyn Fn(f64, f64)-> f64>, 
    dydt: Box<dyn Fn(f64, f64)-> f64>,
    lines: Vec<Line>,
}

#[wasm_bindgen]
pub struct Point {
    pub x: f64,
    pub y: f64,
}

struct Line {
    x_initial: f64,
    y_initial: f64,
    color: PaletteColor<plotters::style::Palette9999>,
}

#[wasm_bindgen]
impl Chart {
    pub fn new(canvas: HtmlCanvasElement) -> Self {
        Chart {
            canvas: canvas.clone(),
            chart_width: 20.0,
            chart_height: 20.0 * canvas.height() as f64 / canvas.width() as f64,
            chart_offset_x: 0.0, 
            chart_offset_y: 0.0,
            convert: Box::new(|_| None),
            dxdt: Box::new(|_, _| 0.0), 
            dydt: Box::new(|_, _| 0.0),
            lines: vec![],
        }
    }

    pub fn zoom(&mut self, out: bool, center_x: f64, center_y: f64) -> Result<(), JsError> {
        if out {
            // self.chart_offset_x -= (self.chart_offset_x - center_x) / 2.0;
            // self.chart_offset_y -= (self.chart_offset_y - center_y) / 2.0;
            self.chart_width /= 1.1;
            self.chart_height = self.chart_width * self.canvas.height() as f64 / self.canvas.width() as f64;
        }
        else {
            // self.chart_offset_x += self.chart_offset_x - center_x;
            // self.chart_offset_y += self.chart_offset_y - center_y;
            self.chart_width *= 1.1;
            self.chart_height = self.chart_width * self.canvas.height() as f64 / self.canvas.width() as f64;
        }
        self.full_draw()
    }

    pub fn move_offset(&mut self, x: f64, y: f64) -> Result<(), JsError> {
        let pixel_ratio = self.chart_width  / self.canvas.width() as f64;
        self.chart_offset_x += x * pixel_ratio;
        self.chart_offset_y += y * pixel_ratio;
        self.blank_draw()
    }

    // pub fn get_points(&self) -> Vec<f64> {
    //     self.points.iter().flat_map(|p| 
    //         std::iter::once(p.0)
    //             .chain(std::iter::once(p.0))
    //             .chain(std::iter::once(p.1)))
    //             .collect()
    // }

    pub fn coord(&self, x: i32, y: i32) -> Option<Point> {
        (self.convert)((x, y)).map(|(x, y)| Point { x, y })
    }

    pub fn clear(&mut self) -> Result<(), JsError> {
        self.lines.clear();
        self.full_draw()
    }

    pub fn quick_draw(&mut self) -> Result<(), JsError> {
        let backend = CanvasBackend::with_canvas_object(self.canvas.clone()).unwrap();
        let root = backend.into_drawing_area();

        let x_min = self.chart_offset_x - self.chart_width / 2.0;
        let x_max = self.chart_offset_x + self.chart_width / 2.0;
        let y_min = self.chart_offset_y - self.chart_height / 2.0;
        let y_max = self.chart_offset_y + self.chart_height / 2.0;

        let mut chart = ChartBuilder::on(&root)
            .margin(30)
            .build_cartesian_2d(x_min..x_max, y_min..y_max)?;

        let equation = self.lines.last().unwrap();
        let points = euler(&*self.dxdt, &*self.dydt, equation.x_initial, equation.y_initial, 0.01);
        if points.len() > 0 {
            chart.draw_series(std::iter::once(PathElement::new(points, &equation.color)))?;
        }

        root.present().expect("Failed to present");
        self.convert = Box::new(chart.into_coord_trans());

        Ok(())
    }

    pub fn blank_draw(&mut self) -> Result<(), JsError> {
        let backend = CanvasBackend::with_canvas_object(self.canvas.clone()).unwrap();
        let root = backend.into_drawing_area();
        root.fill(&WHITE)?;

        let x_min = self.chart_offset_x - self.chart_width / 2.0;
        let x_max = self.chart_offset_x + self.chart_width / 2.0;
        let y_min = self.chart_offset_y - self.chart_height / 2.0;
        let y_max = self.chart_offset_y + self.chart_height / 2.0;

        let mut chart = ChartBuilder::on(&root)
            .margin_top(30)
            .margin_right(30)
            .x_label_area_size(30)
            .y_label_area_size(30)
            .build_cartesian_2d(x_min..x_max, y_min..y_max)?;
        
        chart.configure_mesh().x_labels(5).y_labels(5).draw()?;

        let x_axis = vec![(x_min, 0.0), (x_max, 0.0)];
        let y_axis = vec![(0.0, y_min), (0.0, y_max)];
        let axis_style = ShapeStyle {
            color: BLACK.mix(1.0),
            filled: false,
            stroke_width: 20,
        };
        chart.draw_series(std::iter::once(PathElement::new(x_axis, axis_style)))?;
        chart.draw_series(std::iter::once(PathElement::new(y_axis, axis_style)))?;

        Ok(())
    }

    pub fn full_draw(&mut self) -> Result<(), JsError> {
        self.chart_height = self.chart_width * self.canvas.height() as f64 / self.canvas.width() as f64;

        let backend = CanvasBackend::with_canvas_object(self.canvas.clone()).unwrap();
        let root = backend.into_drawing_area();
        root.fill(&WHITE)?;

        let x_min = self.chart_offset_x - self.chart_width / 2.0;
        let x_max = self.chart_offset_x + self.chart_width / 2.0;
        let y_min = self.chart_offset_y - self.chart_height / 2.0;
        let y_max = self.chart_offset_y + self.chart_height / 2.0;

        let mut chart = ChartBuilder::on(&root)
            .margin_top(30)
            .margin_right(30)
            .x_label_area_size(30)
            .y_label_area_size(30)
            .build_cartesian_2d(x_min..x_max, y_min..y_max)?;
        
        chart.configure_mesh().x_labels(5).y_labels(5).draw()?;

        let x_axis = vec![(x_min, 0.0), (x_max, 0.0)];
        let y_axis = vec![(0.0, y_min), (0.0, y_max)];
        let axis_style = ShapeStyle {
            color: BLACK.mix(1.0),
            filled: false,
            stroke_width: 20,
        };
        chart.draw_series(std::iter::once(PathElement::new(x_axis, axis_style)))?;
        chart.draw_series(std::iter::once(PathElement::new(y_axis, axis_style)))?;
        
        for equation in &self.lines {
            let points = euler(&*self.dxdt, &*self.dydt, equation.x_initial, equation.y_initial, 0.01);
            if points.len() > 0 {
                chart.draw_series(std::iter::once(PathElement::new(points, &equation.color)))?;
            }
        }

        root.present().expect("Failed to present");
        self.convert = Box::new(chart.into_coord_trans());
        Ok(())
    }

    pub fn add_line(&mut self, x_initial: f64, y_initial: f64) -> Result<(), JsError> {
        let line = Line {
            x_initial,
            y_initial,
            color: Palette9999::pick(self.lines.len() % 7),
        };
        self.lines.push(line);
        self.quick_draw()
    }

    pub fn set_equations(&mut self, dxdt: String, dydt: String) -> Result<(), JsError> {
        self.dxdt = Box::new(input_function(dxdt)?);
        self.dydt = Box::new(input_function(dydt)?);
        self.clear()
    }
}

pub fn euler(
    f1: &dyn Fn(f64, f64)-> f64, 
    f2: &dyn Fn(f64, f64)-> f64,
    x_initial: f64, 
    y_initial: f64,
    delta_t: f64,
) -> Vec<(f64, f64)> {
    let mut x = x_initial;
    let mut y = y_initial;
    let mut points: Vec<(f64, f64)> = vec![];

    for _i in 0..1000 {
        let x_next = x + f1(x, y) * delta_t;
        let y_next = y + f2(x, y) * delta_t;

        if !(x_next.is_finite() && y_next.is_finite()) {
            break;
        }

        points.push((x_next, y_next));
        x = x_next;
        y = y_next;
    }

    points
}

pub fn runge_kutta(
    f1: &dyn Fn(f64, f64)-> f64, 
    f2: &dyn Fn(f64, f64)-> f64,
    x_initial: f64, 
    y_initial: f64,
    delta_t: f64,
) -> Vec<(f64, f64)> {
    let mut x = x_initial;
    let mut y = y_initial;
    let mut points: Vec<(f64, f64)> = vec![];

    for _i in 0..1000 {
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

        points.push((x_next, y_next));
        x = x_next;
        y = y_next;
    }
    
    points
}