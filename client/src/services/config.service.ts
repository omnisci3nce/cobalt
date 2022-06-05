async function getConfig(key: string) {
  return await fetch(`/api/config/${key}`).then(res => res.json())
}

export { getConfig }