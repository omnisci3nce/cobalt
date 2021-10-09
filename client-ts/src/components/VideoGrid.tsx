import { createStyles, Grid, Col, Paper, Text } from "@mantine/core"
import { useEffect, useState } from "react";

const useStyles = createStyles((theme) => ({
  grid: {
    padding: theme.spacing.lg
  },
}));

type Video = {
  id: string;
  name: string;
  filename: string
}

export default () => {
  const classes = useStyles()
  const [videos, setVideos] = useState<Video[]>([]);

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
      {videos.map(video => {
        return (
          <Col span={12} md={6} lg={3}>
            <Paper padding='md' shadow='lg'>
              <strong>{videos[0] ? <Text>{videos[0].name}</Text> : ''}</strong>
              {videos[0] ? <Text>{videos[0].filename}</Text> : ''}
            </Paper>
          </Col>
        )
      })}
    </Grid>
  )
}