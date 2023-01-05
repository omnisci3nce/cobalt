async function getConfig(key: string) {
  return fetch(`/api/config/${key}`).then(res => res.json())
}

async function getConfigs(keys: string[]) : Promise<Record<string, any>> {
  const promises = keys.map(key => getConfig(key))
  const configs = await Promise.all(promises)
  return configs.reduce((acc, c, i) => ({
    ...acc,
    [keys[i]]: c
  }), {})
}

export { getConfig, getConfigs }