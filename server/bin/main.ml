open Cobalt

let () =
  Dream.run
  @@ Dream.logger
  @@ Dream.router [
    Videos.get_all_videos;
    Videos.create_video
  ]
  @@ Dream.not_found