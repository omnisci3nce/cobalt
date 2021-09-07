module App = {
  @react.component
  let make = () => {
    <React.Suspense fallback={<> </>}>
      <div>
        <h1>{React.string("Hello, Joshua!")}</h1>
      </div>
    </React.Suspense>
  }
}
switch ReactDOM.querySelector("#root") {
| Some(root) => ReactDOM.render(<App />, root)
| None => ()
}