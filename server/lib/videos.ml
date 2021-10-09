type video = {
  name: string;
  filepath: string;
  (* created_at: int;
  updated_at: int *)
} [@@deriving yojson { exn = true }]

let videos = ref [
  {
    name = "TT Video";
    filepath = "public/vid.mp4";
  }
]

let get_all_videos = Dream.get "/videos"
  (fun _ ->
    let videos = !videos in
    let json = [%to_yojson: video list] videos in
    let json_string = Yojson.Safe.to_string json in
    Dream.json json_string
  )

let create_video = Dream.post "/videos"
  (fun req ->
    let%lwt body = Dream.body req in
    let json =
      body
      |> Yojson.Safe.from_string in
    let video = video_of_yojson_exn json in
    `String video.name
    |> Yojson.Safe.to_string
    |> Dream.json
  )