use std::io::{self, Write};
use meval::Expr;

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

fn main() {
    let f1 = input_function("dx/dt");
    let f2 = input_function("dy/dt");

    // let t = input_value("initial t");
    let mut x = input_value("initial x");
    let mut y = input_value("initial y");
    let dt = input_value("delta t");
    let iter = input_value("iterations");

    let mut x_values: Vec<f64> = vec![];
    let mut y_values: Vec<f64> = vec![];

    for _i in 0..iter as u32 + 1 {
        println!("x: {}  y: {}", x, y);

        let x_next = x + f1(x, y) * dt;
        let y_next = y + f2(x, y) * dt;

        // assert!(f1(x, y) == x - 0.03 * x * y);
        // assert!(f2(x, y) == -0.4 * y + 0.1 * x * y);

        x_values.push(x_next);
        y_values.push(y_next);
        x = x_next;
        y = y_next;
    }
}