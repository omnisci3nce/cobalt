import { createStyles, Group, Title, ActionIcon } from '@mantine/core';
import { SunIcon, MoonIcon } from '@modulz/radix-icons';
import VideoGrid from './components/VideoGrid';

const useStyles = createStyles((theme) => ({
  app: {
    minHeight: '100vh',
    backgroundColor: theme.colors.gray[1]
  },
  header: {
    borderBottomWidth: '1px',
    borderBottomColor: theme.colors.gray[3],
    borderBottomStyle: 'solid',
    padding: theme.spacing.sm,
    paddingLeft: theme.spacing.lg,
    paddingRight: theme.spacing.lg
  }
}));

function App() {
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <header className={classes.header}>
        <Group position="apart" withGutter>
          <Title order={4}>Cobalt</Title>
          <ActionIcon
            title='Toggle colour scheme'
            variant='outline'
            color='blue'
          >
            <MoonIcon style={{ width: 18, height: 18 }} />
          </ActionIcon>
        </Group>
      </header>
      <main>
        <VideoGrid />
      </main>
    </div>
  );
}

export default App;
