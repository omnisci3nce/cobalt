import DatabaseLoader from "./db";

export async function loadAll() {
  await DatabaseLoader.start()
}

export async function shutdownAll() {
  await DatabaseLoader.gracefulShutdown()
}