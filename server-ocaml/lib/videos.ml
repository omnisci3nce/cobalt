let connection_url = "postgres://postgres:postgres@localhost:5433/cobalt"
let ( let* ) = Lwt.bind

exception Query_failed of string

let pool =
  match Caqti_lwt.connect_pool ~max_size:10 (Uri.of_string connection_url) with
  | Ok pool -> pool
  | Error err -> failwith (Caqti_error.show err)

let dispatch f =
  let* result = Caqti_lwt.Pool.use f pool in
  match result with
  | Ok data -> Lwt.return data
  | Error error -> Lwt.fail (Query_failed (Caqti_error.show error))

let report files =
  List.iter begin fun (name, content) ->
   let name =
           match name with
         | None -> "None"
          | Some name -> print_string name; name
       in
        (* print_endline (name ^ (String.length content |> string_of_int) ^  "bytes") *)
        let oc = open_out name in
          Printf.fprintf oc "%s" content;   
          close_out oc;
      end
    files
type video = {
  id: string;
  name: string;
  filename: string;
  (* created_at: int;
  updated_at: int *)
} [@@deriving yojson { exn = true }]

let videos = ref []


let insert_video v = videos := v :: !videos; Lwt.return_unit


let create_video = Dream.post "/videos"
  (fun req ->
    let%lwt body = Dream.body req in
    let json =
      body
      |> Yojson.Safe.from_string in
    let video = video_of_yojson_exn json in
    let* () = insert_video video in
    `String video.id
      |> Yojson.Safe.to_string
      |> Dream.json
  )

let get_token = Dream.get "/token" (fun request ->
    let token = Dream.csrf_token request in
    Dream.json token
  )

let upload_video = Dream.post "/videos/:id/upload"
(fun request ->
  let _ = Dream.csrf_token request in
  let params_list = Dream.path request in
  let _ = List.nth params_list 0 in
  (* match id with *)
  (* | Some id ->  *)
  (* print_string id; *)
    begin
    match%lwt Dream.multipart request with
    | `Ok ["video", files] -> report files;
        Dream.html "Uploaded!"
    | _ -> Dream.empty `Bad_Request;
    end
  (* | None -> Dream.json "Not found" *)
)


type error =
  | Database_error of string

let or_error m =
  match%lwt m with
  | Ok a -> Ok a |> Lwt.return
  | Error e -> Error (Database_error (Caqti_error.show e)) |> Lwt.return

let migrate_query =
  Caqti_request.exec
    Caqti_type.unit
    {|
      CREATE TABLE IF NOT EXISTS videos (
        id VARCHAR PRIMARY KEY NOT NULL,
        name VARCHAR,
        filename VARCHAR
      )
    |}

let ensure_table_exists =
  [%rapper
    execute
    {sql|
      CREATE TABLE IF NOT EXISTS videos (
        id VARCHAR PRIMARY KEY NOT NULL,
        name VARCHAR,
        filename VARCHAR
      )
    |sql}]
  ()

let migrate () =
  let migrate' (module C : Caqti_lwt.CONNECTION) =
    C.exec migrate_query ()
  in
  Caqti_lwt.Pool.use migrate' pool |> or_error

let read_all_messages () =
  let read_all =
    [%rapper
      get_many
        {sql|
          SELECT @string{id}, @string{name}, @string{filename}
          FROM videos
        |sql}
        record_out]
      ()
  in
  let* _ = dispatch ensure_table_exists in
  let* messages = dispatch read_all in
  messages
  (* |> List.map (fun { id; name; filename } -> { user_name; body }) *)
  |> Lwt.return

let get_all_videos = Dream.get "/videos"
  (fun _ ->
    let* videos = read_all_messages () in
    let json = [%to_yojson: video list] videos in
    let json_string = Yojson.Safe.to_string json in
    let headers = [("Access-Control-Allow-Origin", "*")] in
    Dream.json
      ~headers:headers
      json_string
  )

(* let get_all_videos () = Lwt.return (!videos) *)



(* let () = dispatch ensure_table_exists *)