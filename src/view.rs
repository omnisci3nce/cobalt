use serde::Serialize;

use crate::model::VideoDetails;


#[derive(Serialize)]
pub struct VideoCard {
  pub title: String,
  pub description: String,
  pub playing_time: String,
}

impl From<&VideoDetails> for VideoCard {
    fn from(value: &VideoDetails) -> Self {
      Self { title: value.title.clone(), description: value.description.clone(), playing_time: value.playing_time_pretty() }
    }
}