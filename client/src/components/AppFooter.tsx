import { ActionIcon, Footer, Group, Text } from "@mantine/core";
import { BrandGithub } from "tabler-icons-react";

export default function() {
  return (
    <Footer height={40} p='xs' sx={(theme) => ({
      color: theme.colorScheme === 'dark' ? theme.colors.blue[1] : theme.colors.blue[9]
    })}>
      <Group align='center'>
        <Text>Made by Omniscient</Text>
        <ActionIcon>
          <BrandGithub />
        </ActionIcon>
      </Group>
    </Footer>
  )
}