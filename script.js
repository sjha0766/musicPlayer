var arr = [
  { songName: "Jale 2", url: "./songs/Jale 2.mp3", img: "./images/jale.jpg" },
  {
    songName: "Pehle Bhi main",
    url: "./songs/Pehle Bhi Main.mp3",
    img: "./images/animal.jpg",
  },
  {
    songName: "Ram siya ram",
    url: "./songs/Ram Siya Ram.mp3",
    img: "./images/ram.jpg",
  },
  {
    songName: "Arjan Valley",
    url: "./songs/Arjan Vailly Ne.mp3",
    img: "./images/animal.jpg",
  },
];

let currentIndex = 0; // Initialize current song index
let currentSongIndex = null;


const audioPlayer = document.getElementById('audio-player');

// Wait for the audio metadata to load


let showSongs = () => {
  var clutter = "";
  arr.forEach((song, index) => {
    getFormattedDuration(song.url, (minutes, seconds) => {
      const formattedDuration = `${minutes}:${seconds}`;
      clutter += `<div id=${index} class="song-card">
            <div class="part1">
                <img src=${song.img} alt="">
                <h2>${song.songName}</h2>
            </div>
            <h6>${formattedDuration}</h6>
        </div>`;
      document.querySelector("#all-songs").innerHTML = clutter;
    });
  });
};

function getFormattedDuration(url, callback) {
  const audio = new Audio(url);
  audio.addEventListener('loadedmetadata', () => {
    const durationInSeconds = audio.duration;
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    callback(minutes, seconds);
  });
}

document.querySelector("#all-songs").addEventListener("click", (e) => {
  let idx = e.target.id;
  currentIndex = parseInt(idx); // Update currentIndex to clicked song index
  let link = arr[idx].url;
  playSong(link, idx);
});

const playSong = (link, idx) => {
  audioPlayer.src = link;
  audioPlayer.play();
  updateImage(idx);
  document.getElementById("play").innerHTML = '<i class="ri-pause-fill"></i>';
};

const playNextSong = () => {
    currentIndex = (currentIndex + 1) % arr.length;
    let link = arr[currentIndex].url;
    playSong(link,currentIndex);
  };
  
  // Function to play previous song
  const playPreviousSong = () => {
    currentIndex = (currentIndex - 1 + arr.length) % arr.length;
    let link = arr[currentIndex].url;
    playSong(link,currentIndex);
    
  };

const updateImage = (index) => {
  if (currentSongIndex !== null) {
    // Remove previous song's image
    imgElement.remove();
  }
  // Create new image element
  imgElement = createImage(arr[index].img);
  // Append new image element to parent
  document.getElementById("left").appendChild(imgElement);
  currentSongIndex = index;
};

function createImage(src) {
  var img = document.createElement("img");
  img.src = src;
  return img;
}

// Function to play next song


let isPlaying = false;
document.getElementById("play").addEventListener("click", () => {
  const audioPlayer = document.getElementById("audio-player");
  if (!isPlaying) {
    audioPlayer.play();
    isPlaying = true;
    document.getElementById("play").innerHTML = '<i class="ri-pause-fill"></i>'; // Change play button to pause button icon
  } else {
    audioPlayer.pause();
    isPlaying = false;
    document.getElementById("play").innerHTML = '<i class="ri-play-fill"></i>'; // Change pause button to play button icon
  }
});
document.querySelector("#audio-player").addEventListener("ended", playNextSong);
document.querySelector("#forward").addEventListener("click", playNextSong);
document.querySelector("#backward").addEventListener("click", playPreviousSong);

showSongs();
