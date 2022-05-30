import CRUD from "../../lib/crud";
import { Video, VideoDetails, VideoDetailsSchema, VideoSchema } from "./video";

export default class VideosRepository extends CRUD<Video, VideoDetails> {
  constructor() {
    super('public.videos', VideoSchema, VideoDetailsSchema)
  }
}