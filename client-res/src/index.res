let _ = switch ReactDOM.querySelector("#root") {
| Some(element) => ReactDOM.render(<App />, element)
| None => ()
}