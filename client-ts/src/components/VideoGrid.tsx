import { createStyles, Grid, Col, Paper } from "@mantine/core"
import { useEffect, useState } from "react";

const useStyles = createStyles((theme) => ({
  grid: {
    padding: theme.spacing.lg
  },
}));

export default () => {
  const classes = useStyles()
  const [videos, setVideos] = useState<{ name: string, filepath: string}[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/videos')
      .then(resp => resp.json())
      .then(videos => {
        console.log(videos)
        setVideos(videos)
      })
  }, [])

  return (
    <Grid className={classes.grid}>
      <Col span={12} md={6} lg={3}>
        <Paper padding='md'>
          {videos[0] ? <p>{videos[0].name}</p> : ''}
        </Paper>
      </Col>
      <Col span={12} md={6} lg={3}>
        <Paper padding='md'>
          {videos[1] ? <p>{videos[1].name}</p> : ''}
        </Paper>
      </Col>
      <Col span={12} md={6} lg={3}>
      <Paper padding='md'>
          {videos[2] ? <p>{videos[2].name}</p> : ''}
        </Paper>
      </Col>
      <Col span={12} md={6} lg={3}>
      <Paper padding='md'>
          {videos[3] ? <p>{videos[3].name}</p> : ''}
        </Paper>
      </Col>
    </Grid>
  )
}