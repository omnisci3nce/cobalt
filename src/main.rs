use std::sync::Arc;

use axum::{extract::State, response::Html, routing::get, Router};

use tera::{Context, Tera};

struct AppState {
    tera: Tera,
}

#[tokio::main]
async fn main() {
    // initialize tracing
    tracing_subscriber::fmt::init();

    // compile templates
    let mut tera = match Tera::new("templates/**/*.html") {
        Ok(t) => t,
        Err(e) => {
            println!("Parsing error(s): {}", e);
            ::std::process::exit(1);
        }
    };
    tera.autoescape_on(vec!["html", "sql"]);

    let shared_state = Arc::new(AppState { tera });

    // build our application with a route
    let app = Router::new()
        // `GET /` goes to `root`
        .route("/", get(root))
        .with_state(shared_state);

    // run it with hyper on localhost:3000
    axum::Server::bind(&"0.0.0.0:3000".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}

// basic handler that responds with index.html
async fn root(State(state): State<Arc<AppState>>) -> Html<String> {
    let ctx = Context::new();
    let s = state.tera.render("index.html", &ctx).unwrap();
    Html(s)
}
