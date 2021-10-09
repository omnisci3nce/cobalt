import { createStyles, Group, Title, ActionIcon, Button } from '@mantine/core';
import { SunIcon, MoonIcon } from '@modulz/radix-icons';
import VideoGrid from './components/VideoGrid';

const useStyles = createStyles((theme) => ({
  app: {
    minHeight: '100vh',
    backgroundColor: theme.colors.dark[8]
  },
  header: {
    borderBottomWidth: '1px',
    borderBottomColor: theme.colors.dark[3],
    borderBottomStyle: 'solid',
    padding: theme.spacing.sm,
    paddingLeft: theme.spacing.lg,
    paddingRight: theme.spacing.lg,
    backgroundColor: theme.colors.dark[7]
  }
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <header className={classes.header}>
        <Group position="apart" withGutter>
          <Title order={4}>Cobalt</Title>
          <Group>
            <Button>Upload</Button>
            <ActionIcon
              title='Toggle colour scheme'
              variant='outline'
              color='blue'
            >
              <MoonIcon style={{ width: 18, height: 18 }} />
            </ActionIcon>
          </Group>
        </Group>
      </header>
      <main>
        <VideoGrid />
      </main>
    </div>
  );
}

export default App;
