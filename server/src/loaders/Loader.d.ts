export default interface Loader {
  async start(): Promise<void>
  async gracefulShutdown(): Promise<void>
}