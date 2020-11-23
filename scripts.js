const image = document.querySelector('img');
const title = document.querySelector('.title');
const artist = document.querySelector('.artist-name');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const prevBtn = document.querySelector('#prev');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#next');
const currentTimeEl = document.getElementsByClassName('current-time')[0];
const durationEl = document.getElementsByClassName('duration')[0];

// check if playing
let isPlaying = false;

// play
function playSong(){
    isPlaying = true;
    playBtn.classList.replace('fa-play-circle','fa-pause-circle');
    playBtn.setAttribute('title','Pause');
    music.play();
}

// pause
function pauseSong(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause-circle','fa-play-circle');
    playBtn.setAttribute('title','Play');
    music.pause();
}

// music
const songs = [
    {
        name:'jacinto-1',
        displayName:'Electric Chill machine',
        artist:'jacinto'
    },
    {
        name:'jacinto-2',
        displayName:'Electric Hot machine',
        artist:'jacinto'
    },
    {
        name:'jacinto-3',
        displayName:'Electric Breeze machine',
        artist:'jacinto'
    }
];

// current song
let songIndex = 0;

// previous song
function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// next song
function nextSong(){
    songIndex++;
    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// update dom
function loadSong(song){
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Update progress bar & time
function updateProgressBar(e){
    if(isPlaying){
        const { currentTime,duration } = e.srcElement;
        // update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;
        // calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`;
        }
        // delay switching duration element to avoid NAN
        if(durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // calculate display for current
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < 10){
            currentSeconds = `0${currentSeconds}`;
        }
        // delay switching current element to avoid NAN
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// on load - select first song
loadSong(songs[1])

// set progress bar
function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    music.currentTime = (clickX / width) * duration;
}

// play or pause event listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// event listener
prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
music.addEventListener('ended', nextSong);