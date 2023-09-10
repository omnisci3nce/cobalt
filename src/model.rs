pub struct VideoDetails {
    pub id: String,
    pub title: String,
    pub url: String,
    pub description: String,
    /// Video playing time in seconds
    pub playing_time: u32,
    // created_at
    // updated_at
}

impl VideoDetails {
    /// Return the playing time of the video as `minutes:seconds`
    pub fn playing_time_pretty(&self) -> String {
        format!("{}:{}", self.playing_time / 60, self.playing_time % 60)
    }
}
