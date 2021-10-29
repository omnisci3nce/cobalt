open Ancestor.Default

@react.component
let make = () => {
  <Box>
    <Header />
    <Box
      minH=[xs(#pct(100.0))]
    >
      <VideoGrid />
    </Box>
  </Box>
}