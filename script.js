const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');
const playlistItems = document.querySelectorAll('#playlist li');

// Song titles
const songs = ['hey', 'summer', 'ukulele'];

// Keep track of song
let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
  updateActiveSong();
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
}

// Update active song in the playlist
function updateActiveSong() {
  playlistItems.forEach((item, index) => {
    item.classList.toggle('active', index === songIndex);
  });
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Update time display for current and duration
function DurTime(e) {
  const { duration, currentTime } = e.srcElement;
  let sec;
  let sec_d;

  // Minutes and seconds for current time
  let min = currentTime ? Math.floor(currentTime / 60) : 0;
  min = min < 10 ? '0' + min : min;
  sec = currentTime ? Math.floor(currentTime % 60) : 0;
  sec = sec < 10 ? '0' + sec : sec;

  // Minutes and seconds for duration
  let min_d = duration ? Math.floor(duration / 60) : 0;
  min_d = min_d < 10 ? '0' + min_d : min_d;
  sec_d = duration ? Math.floor(duration % 60) : 0;
  sec_d = sec_d < 10 ? '0' + sec_d : sec_d;

  // Update DOM
  currTime.innerHTML = min + ':' + sec;
  durTime.innerHTML = min_d + ':' + sec_d;
}

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);

// Time of song
audio.addEventListener('timeupdate', DurTime);

// Playlist click event
playlistItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    songIndex = index;
    loadSong(songs[songIndex]);
    playSong();
  });
});
