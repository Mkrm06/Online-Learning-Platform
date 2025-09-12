document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("courseVideo");
  const playBtn = document.getElementById("playBtn");
  const seekBar = document.getElementById("seekBar");
  const timeLabel = document.getElementById("timeLabel");
  const muteBtn = document.getElementById("muteBtn");
  const fsBtn = document.getElementById("fsBtn");
  const playlist = document.getElementById("playlist");
  const notesBox = document.getElementById("notesBox");

  function fmtTime(s) {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec < 10 ? "0" : ""}${sec}`;
  }

  // Play / Pause
  playBtn.addEventListener("click", () => {
    if (video.paused) video.play();
    else video.pause();
  });
  video.addEventListener("play", () => (playBtn.innerHTML = '<i class="fa fa-pause"></i>'));
  video.addEventListener("pause", () => (playBtn.innerHTML = '<i class="fa fa-play"></i>'));

  // Update progress
  video.addEventListener("timeupdate", () => {
    seekBar.value = (video.currentTime / video.duration) * 100 || 0;
    timeLabel.textContent = `${fmtTime(video.currentTime)} / ${fmtTime(video.duration || 0)}`;
  });

  // Seek
  seekBar.addEventListener("input", () => {
    video.currentTime = (seekBar.value / 100) * video.duration;
  });

  // Mute
  muteBtn.addEventListener("click", () => {
    video.muted = !video.muted;
    muteBtn.innerHTML = video.muted
      ? '<i class="fa fa-volume-mute"></i>'
      : '<i class="fa fa-volume-up"></i>';
  });

  // Fullscreen
  fsBtn.addEventListener("click", () => {
    if (video.requestFullscreen) video.requestFullscreen();
  });

  // Playlist
  playlist.addEventListener("click", (e) => {
    if (e.target.matches("li")) {
      document.querySelectorAll("#playlist li").forEach(li => li.classList.remove("active"));
      e.target.classList.add("active");
      video.querySelector("source").src = e.target.dataset.src;
      video.load();
      video.play();
    }
  });
  // Click handler for lessons
document.querySelectorAll(".lesson-item").forEach(item => {
  item.addEventListener("click", function() {
    document.querySelectorAll(".lesson-item").forEach(el => el.classList.remove("active"));
    this.classList.add("active");
    console.log("Playing video:", this.dataset.src);
    // you can load video player here with this.dataset.src
  });
});


  // Notes (save in localStorage)
  notesBox.value = localStorage.getItem("courseNotes") || "";
  notesBox.addEventListener("input", () => {
    localStorage.setItem("courseNotes", notesBox.value);
  });
});
