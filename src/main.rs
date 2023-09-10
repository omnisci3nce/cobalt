use std::sync::Arc;

use axum::{extract::State, response::Html, routing::get, Router};

use model::VideoDetails;
use tera::{Context, Tera};
use view::VideoCard;
mod model;
mod view;
struct AppState {
    videos: Vec<VideoDetails>,
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

    let shared_state = Arc::new(AppState {
        tera,
        videos: vec![VideoDetails {
            id: "".into(),
            title: "My first video".into(),
            url: "".into(),
            description: "a video about cool stuff yo".into(),
            playing_time: 128,
        }],
    });

    // build our application with a route
    let app = Router::new().route("/", get(root)).with_state(shared_state);

    // run it with hyper on localhost:3000
    axum::Server::bind(&"0.0.0.0:3000".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}

// basic handler that responds with index.html
async fn root(State(state): State<Arc<AppState>>) -> Html<String> {
    let mut ctx = Context::new();
    let video_cards: Vec<VideoCard> = state.videos.iter().map(VideoCard::from).collect();
    ctx.insert("videos", &video_cards);
    let s = state.tera.render("index.html", &ctx).unwrap();
    Html(s)
}
