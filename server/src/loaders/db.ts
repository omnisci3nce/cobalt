import Database from "../lib/database";
import Logger from "../lib/logger";
import Loader from "./Loader";

export default <Loader>{
  start: async function() {
    Database.createPool()
    Logger.info('Connected to Postgres')
  },

  gracefulShutdown: async function() {
    Database.disconnect()
  }
}