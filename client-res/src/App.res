open Ancestor.Default

@react.component
let make = () => {
  <Grid>
    <Box
      columns=[#xs(#12), #md(#6), #lg(#4)]
      display=[#xs(#flex)]
      alignItems=[#xs(#center)]
      px=[#xs(8), #md(12)]
      mt=[#xs(12)]
    >
      {React.string("Hello")}
    </Box>

    <Box
      columns=[#xs(#12), #md(#6), #lg(#4)]
      display=[#xs(#flex)]
      alignItems=[#xs(#center)]
      py=[#xs(6), #md(8)]
      m=[#xs(12)]
    >
      {React.string("World")}
    </Box>
  </Grid>
}