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
  };
  {
    name = "Dummy video2";
    filepath = "public/vid.mp4";
  };
  {
    name = "Cat video";
    filepath = "public/vid.mp4";
  };
  {
    name = "Yeehaaa";
    filepath = "public/vid.mp4";
  }
]

let get_all_videos = Dream.get "/videos"
  (fun _ ->
    let videos = !videos in
    let json = [%to_yojson: video list] videos in
    let json_string = Yojson.Safe.to_string json in
    let headers = [("Access-Control-Allow-Origin", "*")] in
    Dream.json
      ~headers:headers
      json_string
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

let upload_video = Dream.post "/videos/:id/upload"
(fun request ->
  let params_list = Dream.path request in
  let id = List.nth params_list 0 in
  (* match id with *)
  (* | Some id ->  *)
  print_string id;
    begin
    match%lwt Dream.multipart request with
    | `Ok ["video", _] -> Dream.html "Resdsdsa"
    | _ -> Dream.empty `Bad_Request;
    end
  (* | None -> Dream.json "Not found" *)
)