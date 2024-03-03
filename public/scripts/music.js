

document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("audio");
    
    const playPauseBtn = document.getElementById("playPauseBtn");

    const playPauseBtn_home = document.getElementById("playPauseBtn-home");
 //   const stopBtn = document.getElementById("stopBtn");
    const volumeSlider = document.getElementById("volumeSlider");
    const volumeSlider_home = document.getElementById("volumeSlider-home");
    const musicprogressbar = document.getElementById("music-progress-bar");
    const musicprogressbar_home = document.getElementById("music-progress-bar_home");
    const timeDisplay = document.getElementById("time-display");
    const timeDisplay_home = document.getElementById("time-display_home");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    const volumeBtn = document.getElementById("volumeBtn");

    const nextBtn_home = document.getElementById("nextBtn-home");
    const prevBtn_home = document.getElementById("prevBtn-home");
    const volumeBtn_home = document.getElementById("volumeBtn-home");

    const songTitle = document.getElementById("song-title");
    const songImage = document.getElementById("song-image");

    const songTitle_home = document.getElementById("song-title-home");
    const songArtist_home = document.getElementById("song-artist-home");
    const songImage_home = document.getElementById("song-image-home");

    const repeatBtn = document.getElementById("repeatBtn"); // Add this line
    const repeatBtn_home = document.getElementById("repeatBtn-home");
    const visualizerCanvas = document.getElementById("wave-canvas");
    const visualizerContext = visualizerCanvas.getContext("2d");
    const songListContainer = document.getElementById("songList");
    if (!audio) {
        console.error("Audio element not found!");
        return;
    }
    

    // Array of songs
// const songs = [
//     "Anbenum-MassTamilan.dev.mp3",
//     "lokiverse.mp3",
    
//     // Add more songs as needed
// ];


let audioContext, analyser, dataArray;



    let currentSongIndex = 0;
    let isRepeatOne = false; // Flag to indicate repeat one mode
    let isRepeatAll = false; // Flag to indicate repeat all mode

    function loadSong() {
        audio.src = audioList[currentSongIndex].src;
    audio.load();
      //  audio.src = songs[currentSongIndex];
       // audio.load();
        
        jsmediatags.read(audio.src, {
            onSuccess: function(tag) {
                const { tags } = tag;
              const { picture, artist, title } = tags;
              const image = tag.tags.picture;

              if (image) {
                const base64String = arrayBufferToBase64(image.data);
              //  const imgElement = document.createElement('img');
               // imgElement.src = 'data:' + image.format + ';base64,' + base64String;
                document.getElementById('songImage').src='data:' + image.format + ';base64,' + base64String;
                document.getElementById('songImage_home').src='data:' + image.format + ';base64,' + base64String;
                console.log(tag);
              } else {
                console.log('No album art found in the MP3 file.');
              }

               // Update artist information in the artistContainer
               if (artist) {
            songArtist_home.innerHTML = artist;
              } else {
                songArtist_home.innerHTML = 'Artist: Unknown';
              }

               // Update title information in the titleContainer
              if (title) {
                songTitle.innerHTML= title;
                songTitle_home.innerHTML= title;
              } else {
                songTitle.innerHTML= 'Title: Unknown';
                songTitle_home.innerHTML= 'Title: Unknown';
              }

            },
            onError: function(error) {
              console.log('Error reading MP3 file:', error.type, error.info);
            }
          });
        
    }

    function arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
      }
     

    playPauseBtn.addEventListener("click", function () {
        if (audioContext === undefined) {
            // Create the AudioContext only on the first play button click
            initAudioContext();
        }
        if (audio.paused) {
            loadSong();
            audio.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause button-icons delta"></i>';
            playPauseBtn_home.innerHTML = '<i class="fas fa-pause button-icons delta"></i>';
            visualize();
           // updateSongQueue();
            updatePlayingStatus();
            
        } else {
            audio.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play button-icons delta"></i>';
            playPauseBtn_home.innerHTML = '<i class="fas fa-play button-icons delta"></i>';
        }
    });

    playPauseBtn_home.addEventListener("click", function () {
        if (audioContext === undefined) {
            // Create the AudioContext only on the first play button click
            initAudioContext();
        }
        if (audio.paused) {
            loadSong();
            audio.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause button-icons delta"></i>';
            playPauseBtn_home.innerHTML = '<i class="fas fa-pause button-icons delta"></i>';
            visualize();
           // updateSongQueue();
            updatePlayingStatus();
            
        } else {
            audio.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play button-icons delta"></i>';
            playPauseBtn_home.innerHTML = '<i class="fas fa-play button-icons delta"></i>';
        }
    });

    // stopBtn.addEventListener("click", function () {
    //     audio.pause();
    //     audio.currentTime = 0;
    //     playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    //     updateSongQueue();
    // });

    nextBtn.addEventListener("click", function () {
        if (audioContext === undefined) {
            // Create the AudioContext only on the first play button click
            initAudioContext();
            visualize();
        }
        currentSongIndex = (currentSongIndex + 1) % audioList.length;
        loadSong();
        audio.play();
        //updateSongQueue();
        updatePlayingStatus();
        playPauseBtn.innerHTML = '<i class="fas fa-pause button-icons delta"></i>';
        playPauseBtn_home.innerHTML = '<i class="fas fa-pause button-icons delta"></i>';
    });

    nextBtn_home.addEventListener("click", function () {
        if (audioContext === undefined) {
            // Create the AudioContext only on the first play button click
            initAudioContext();
            visualize();
        }
        currentSongIndex = (currentSongIndex + 1) % audioList.length;
        loadSong();
        audio.play();
        //updateSongQueue();
        updatePlayingStatus();
        playPauseBtn.innerHTML = '<i class="fas fa-pause button-icons delta"></i>';
        playPauseBtn_home.innerHTML = '<i class="fas fa-pause button-icons delta"></i>';
    });

    prevBtn.addEventListener("click", function () {
        if (audioContext === undefined) {
            // Create the AudioContext only on the first play button click
            initAudioContext();
            visualize();
        }
        currentSongIndex = (currentSongIndex - 1 + audioList.length) % audioList.length;
        loadSong();
        audio.play();
        //updateSongQueue();
        updatePlayingStatus();
        playPauseBtn.innerHTML = '<i class="fas fa-pause button-icons delta"></i>';
        playPauseBtn_home.innerHTML = '<i class="fas fa-pause button-icons delta"></i>';
    });

    prevBtn_home.addEventListener("click", function () {
        if (audioContext === undefined) {
            // Create the AudioContext only on the first play button click
            initAudioContext();
            visualize();
        }
        currentSongIndex = (currentSongIndex - 1 + audioList.length) % audioList.length;
        loadSong();
        audio.play();
        //updateSongQueue();
        updatePlayingStatus();
        playPauseBtn.innerHTML = '<i class="fas fa-pause button-icons delta"></i>';
        playPauseBtn_home.innerHTML = '<i class="fas fa-pause button-icons delta"></i>';
    });

    repeatBtn.addEventListener("click", function () {
        toggleRepeatMode();
    });

    repeatBtn_home.addEventListener("click", function () {
        toggleRepeatMode();
    });
    volumeBtn.addEventListener("click", function () {
        volumeSlider.style.display = volumeSlider.style.display === 'none' ? 'block' : 'none';
    });

    volumeSlider.addEventListener("input", function () {
        audio.volume = volumeSlider.value;
    });

    volumeBtn_home.addEventListener("click", function () {
        volumeSlider_home.style.display = volumeSlider_home.style.display === 'none' ? 'block' : 'none';
    });

    volumeSlider_home.addEventListener("input", function () {
        audio.volume = volumeSlider_home.value;
    });

    musicprogressbar.addEventListener("input", function () {
        const seekTime = (audio.duration * (musicprogressbar.value / 100));
        audio.currentTime = seekTime;
    });

    musicprogressbar_home.addEventListener("input", function () {
        const seekTime = (audio.duration * (musicprogressbar_home.value / 100));
        audio.currentTime = seekTime;

    });
    
    audio.addEventListener("timeupdate", function () {
        const progressFill = document.querySelector('.progress-fill');
        const progressFill_home = document.querySelector('.progress-fill_home');
        const progress = (audio.currentTime / audio.duration) * 100;
       // musicprogressbar.style.width = progress + "%";
        progressFill.style.width = progress + '%';
        progressFill_home.style.width = progress + '%';

        musicprogressbar.value = progress;
        musicprogressbar.style.setProperty('--progress-bar-value', progress + '%');

        musicprogressbar_home.value = progress;
        musicprogressbar_home.style.setProperty('--progress-bar-value', progress + '%');

        const currentTime = formatTime(audio.currentTime);
        const totalDuration = formatTime(audio.duration);

        timeDisplay.textContent = currentTime + " / " + totalDuration;
        timeDisplay_home.textContent = currentTime + " / " + totalDuration;
    });

    audio.addEventListener("ended", function () {
        if (isRepeatOne) {
            audio.currentTime = 0; // Restart the current song
            loadSong();
            audio.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause button-icons delta"></i>';
        } else if (isRepeatAll) {
            currentSongIndex = (currentSongIndex + 1) % audioList.length;
            loadSong();
            audio.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause button-icons delta"></i>';
        } else {
            // If neither repeat one nor repeat all, move to the next song
            currentSongIndex = (currentSongIndex + 1) % audioList.length;
            loadSong();
            audio.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause button-icons delta"></i>';
        }
        updateSongQueue();
    });

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
    }

    function toggleRepeatMode() {
        if (isRepeatOne) {
            isRepeatOne = false;
            isRepeatAll = true;
            repeatBtn.innerHTML = '<i class="fas fa-repeat button-icons delta"></i>';
            repeatBtn_home.innerHTML = '<i class="fas fa-repeat button-icons delta"></i>';
        } else if (isRepeatAll) {
            isRepeatOne = false;
            isRepeatAll = false;
            repeatBtn.innerHTML = '<i class="fas fa-repeat button-icons delta"></i>';
            repeatBtn_home.innerHTML = '<i class="fas fa-repeat button-icons delta"></i>';
        } else {
            isRepeatOne = true;
            isRepeatAll = false;
            repeatBtn.innerHTML = '<i class="fas fa-redo-alt button-icons delta"></i>';
            repeatBtn_home.innerHTML = '<i class="fas fa-redo-alt button-icons delta"></i>';
        }
    }

    function initAudioContext() {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            const source = audioContext.createMediaElementSource(audio);
            source.connect(analyser);
            analyser.connect(audioContext.destination);
            analyser.fftSize = 256;
            dataArray = new Uint8Array(analyser.frequencyBinCount);
        } catch (e) {
            console.error("Web Audio API is not supported in this browser");
        }
    }

    function visualize() {
        analyser.getByteFrequencyData(dataArray);

        visualizerContext.clearRect(0, 0, visualizerCanvas.width, visualizerCanvas.height);

        const barWidth = (visualizerCanvas.width / analyser.frequencyBinCount) * 2.5;
        const barSpacing = 4;
        let x = 0;

        for (let i = 0; i < dataArray.length; i++) {
            const barHeight = dataArray[i] * 0.7; // scale the height of each bar by the amplitude
            const hue = i / dataArray.length * 360;

            visualizerContext.fillStyle = `hsl(${hue}, 100%, 50%)`;
            visualizerContext.fillRect(x, visualizerCanvas.height - barHeight / 2, barWidth, barHeight);

            x += barWidth + barSpacing;
        }

        requestAnimationFrame(visualize);
    }

    let audioList;
    
    async function updateSongQueue() {
        songListContainer.innerHTML = "";
        try {
            const audioListApi = '/api/audiolist';
            const response = await fetch(audioListApi);
           audioList = await response.json();
    
        audioList.forEach((song,index) => {
           
          const audioCard = document.createElement('div');
          audioCard.classList.add('audio-card');
    
         // const audioElement = document.createElement('audio');
          //audioElement.controls = true;
    
          // Set the type attribute dynamically based on the audio file extension
          const fileExtension = song.src.split('.').pop();
          audio.innerHTML = `<source id="audioSource" src="${song.src}" type="audio/${fileExtension}">`;
          
          const albumArtContainer = document.createElement('div');
          albumArtContainer.classList.add('album-art');
    
          const songinfo = document.createElement('div');
          songinfo.classList.add("songInfo");
    
          const artistContainer = document.createElement('div');
            artistContainer.textContent = 'Artist: Loading...'; // Initial text while fetching metadata
            artistContainer.style.marginTop = '5px';
    
            const titleContainer = document.createElement('div');
          titleContainer.classList.add('title');
          titleContainer.textContent = 'Title: Loading...';
          titleContainer.style.marginTop = '5px';
    
          // Fetch album art using jsmediatags
          jsmediatags.read(audio.querySelector('#audioSource').src, {
            onSuccess: function(tag) {
              const { tags } = tag;
              const { picture, artist, title } = tags;
              const image = tag.tags.picture;
                  
                    
              if (picture) {
                // Create a Blob from the album art data
                const albumArtBlob = new Blob([arrayBufferToBase64(picture.data)], { type: picture.format });
    
                // Create an img element
                const albumArtImg = document.createElement('img');
                albumArtImg.width = 100;
                albumArtImg.height = 100;
    
                // Set onload event for the image to ensure it's displayed only when loaded
                albumArtImg.onload = function() {
                  URL.revokeObjectURL(albumArtImg.src); // Release object URL after image is loaded
                };
                const base64String = arrayBufferToBase64(image.data);
                // Set the source to the Blob data URL
                albumArtImg.src ='data:' + image.format + ';base64,' + base64String;
                albumArtContainer.appendChild(albumArtImg);
              } else {
                albumArtContainer.textContent = 'No album art found.';
              }
    
              // Update artist information in the artistContainer
              if (artist) {
                  artistContainer.textContent = '' + artist;
                } else {
                  artistContainer.textContent = 'Artist: Unknown';
                }

                 // Update title information in the titleContainer
                if (title) {
                    titleContainer.textContent = ' ' + title;
                } else {
                    titleContainer.textContent = 'Title: Unknown';
                }
            },
            onError: function(error) {
              console.error('Error reading tags:', error);
              albumArtContainer.textContent = 'Error fetching audio data.';
            }
    
    
          });
    
          audioCard.appendChild(albumArtContainer);
          songinfo.appendChild(titleContainer);
          songinfo.appendChild(artistContainer);
          audioCard.appendChild(songinfo);
         
    
        //   audioCard.addEventListener('click', () => {
        //         loadAndPlayAudio(song.src);
        //       });
        audioCard.addEventListener('click', () => {
            playAudio(index);
             // Remove selected class from all audio cards
         document.querySelectorAll('.audio-card').forEach(card => card.classList.remove('selected'));

         // Add selected class to the clicked audio card
         audioCard.classList.add('selected');
           
         // console.log("clicked");
          });
    
              songListContainer.appendChild(audioCard);
        });
    } catch (error) {
          console.error('Error fetching audio list:', error);
        }
    }
    function playAudio(index) {
        if (audioList && audioList.length > 0 && index >= 0 && index < audioList.length) {
          currentAudioIndex = index;
          const selectedAudio = document.querySelectorAll('.audio-card')[index];
          const artistContainer = selectedAudio.querySelector('.album-art');
          currentSongIndex = (index ) % audioList.length;
          loadSong();
          audio.play();
          playPauseBtn.innerHTML = '<i class="fas fa-pause  button-icons delta"></i>';
          if (audioContext === undefined) {
            // Create the AudioContext only on the first play button click
            initAudioContext();
            visualize();
        }
          //visualize();
          //  updateSongQueue();
        } else {
          console.error('Invalid audio index or empty audioList.');
        }
      }

      // Add this function to update the playing status when the audio is played or paused
function updatePlayingStatus() {
    const audioCards = document.querySelectorAll('.audio-card');
    audioCards.forEach(card => card.classList.remove('selected'));
  
  
      const currentAudioCard = audioCards[currentSongIndex];
      if (currentAudioCard) {
        currentAudioCard.classList.add('selected');
      }
    
  }

    function playSong(index) {
        currentSongIndex = (index ) % audioList
        .length;
        loadSong();
        audio.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause  button-icons delta"></i>';
    }

    // Initialize the song queue on page load
    updateSongQueue();
    loadSong();

    
});






