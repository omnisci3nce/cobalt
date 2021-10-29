open Ancestor.Default

@react.component
let make = () => {
  <Box
    py=[xs(4)]
    px=[xs(3)]
    bgColor=[xs(#hex("#eee"))]
  >
    {React.string("Video Grid")}
  </Box>
}