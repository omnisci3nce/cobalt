open Ancestor.Default

@react.component
let make = () => {
  <Box
    py=[xs(1)]
    px=[xs(3)]
    borderBottom=[#xs((1->#px, #solid, #hex("#ddd")))]
    display=[xs(#flex)]
    justifyContent=[xs(#"space-between")]
  >
    {React.string("Cobalt")}
    <Box display=[xs(#flex)]> // Buttons
      <Box px=[xs(1)]><button>{React.string("About")}</button></Box>
      <button>{React.string("Upload")}</button>
    </Box>
  </Box>
}