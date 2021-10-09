open Cobalt

let () =
  Dream.run
  @@ Dream.logger
  (* @@ Dream.origin_referer_check *)
  @@ Dream.memory_sessions
  @@ Dream.router [
    Dream.get "/login" (fun request ->
      match Dream.session "user" request with
      | None ->
        let%lwt () = Dream.invalidate_session request in
        let%lwt () = Dream.put_session "user" "alice" request in
        Dream.html "You weren't logged in; but now you are!"
  
      | Some username ->
        Printf.ksprintf
          Dream.html "Welcome back, %s!" (Dream.html_escape username));
    Videos.get_all_videos;
    Videos.create_video;
    Videos.get_token;
    Videos.upload_video;
    Dream.get "/static/**" (Dream.static "./static")
  ]
  @@ Dream.not_found