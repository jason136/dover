use std::io::{self, Write};
use meval::Expr;
use plotters::prelude::*;

fn input_function(name: &str) -> impl Fn(f64, f64) -> f64 {
    loop {
        let mut buffer = String::new();
        print!("{}: ", name);
        io::stdout().flush().unwrap();
        io::stdin().read_line(&mut buffer).unwrap();
        buffer = buffer.replace(")(", ")*(");

        let expr: Expr = match buffer.trim().parse() {
            Ok(r) => r,
            Err(e) => {
                println!("error in parsing function: {}", e);
                continue
            }
        };
        
        match expr.bind2("x", "y") {
            Ok(r) => break r,
            Err(e) => println!("error in binding function: {}", e)
        }
    }
}

fn input_value(name: &str) -> f64 {
    loop {
        let mut buffer = String::new();
        print!("{}: ", name);
        io::stdout().flush().unwrap();
        io::stdin().read_line(&mut buffer).unwrap();

        match buffer.trim().parse::<f64>() {
            Ok(r) => break r,
            Err(e) => println!("error in parsing value: {}", e)
        }
    }
}

fn main() -> Result<(), Box<dyn std::error::Error>> {

    let root = BitMapBackend::new("0.png", (640, 480)).into_drawing_area();
    root.fill(&WHITE)?;
    let mut chart = ChartBuilder::on(&root)
        .caption("y=x^2", ("sans-serif", 50).into_font())
        .margin(5)
        .x_label_area_size(30)
        .y_label_area_size(30)
        .build_cartesian_2d(-1f32..1f32, -0.1f32..1f32)?;

    chart.configure_mesh().draw()?;

    chart
        .draw_series(LineSeries::new(
            (-50..=50).map(|x| x as f32 / 50.0).map(|x| (x, x * x)),
            &RED,
        ))?
        .label("y = x^2")
        .legend(|(x, y)| PathElement::new(vec![(x, y), (x + 20, y)], &RED));

    chart
        .configure_series_labels()
        .background_style(&WHITE.mix(0.8))
        .border_style(&BLACK)
        .draw()?;

    root.present()?;

    Ok(())

    // let f1 = input_function("dx/dt");
    // let f2 = input_function("dy/dt");

    // // let t = input_value("initial t");
    // let mut x = input_value("initial x");
    // let mut y = input_value("initial y");
    // let dt = input_value("delta t");
    // let iter = input_value("iterations");

    // let mut x_values: Vec<f64> = vec![];
    // let mut y_values: Vec<f64> = vec![];

    // for _i in 0..iter as u32 + 1 {
    //     println!("x: {}  y: {}", x, y);

    //     // // Euler's Method
    //     // let x_next = x + f1(x, y) * dt;
    //     // let y_next = y + f2(x, y) * dt;

    //     // RK4, Runge-Kutta Method
    //     let xk1 = f1(x, y);
    //     let yk1 = f2(x, y);
    //     let xk2 = f1(x + dt / 2.0 * xk1, y + dt / 2.0 * yk1);
    //     let yk2 = f2(x + dt / 2.0 * xk1, y + dt / 2.0 * yk1);
    //     let xk3 = f1(x + dt / 2.0 * xk2, y + dt / 2.0 * yk2);
    //     let yk3 = f2(x + dt / 2.0 * xk2, y + dt / 2.0 * yk2);
    //     let xk4 = f1(x + dt * xk3, y + dt * yk3);
    //     let yk4 = f2(x + dt * xk3, y + dt * yk3);

    //     let x_next = x + dt / 6.0 * (xk1 + 2.0 * xk2 + 2.0 * xk3 + xk4);
    //     let y_next = y + dt / 6.0 * (yk1 + 2.0 * yk2 + 2.0 * yk3 + yk4);

    //     // assert!(f1(x, y) == x - 0.03 * x * y);
    //     // assert!(f2(x, y) == -0.4 * y + 0.1 * x * y);

    //     x_values.push(x_next);
    //     y_values.push(y_next);
    //     x = x_next;
    //     y = y_next;
    // }
}