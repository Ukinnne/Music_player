document.addEventListener('DOMContentLoaded', function() {
    const audioPlayer = document.getElementById('audio-player');
    const playButton = document.getElementById('play-button');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    const progressBar = document.getElementById('progress-bar');
    const progressFill = document.querySelector('.progress-bar-fill');
    const currentTimeElement = document.getElementById('current-time');
    const totalTimeElement = document.getElementById('total-time');
    const volumeButton = document.getElementById('volume-button');
    const volumeIcon = document.getElementById('volume-icon');
    const muteIcon = document.getElementById('mute-icon');
    const volumeBar = document.getElementById('volume-bar');
    const volumeFill = document.querySelector('.volume-bar-fill');
    const playerModal = document.getElementById('player-modal');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const trackNameElement = document.getElementById('Track_Name');
    const artistNameElement = document.getElementById('Artist_Name');
    const albumCoverElement = document.getElementById('album-cover');
    const trackListContainer = document.getElementById('track-list');

    // Track database
    const tracks = [
        {
            trackName: "Пощады",
            artistName: "DK",
            mp3Src: "./music/poschady.mp3",
            coverSrc: "./images/SYNONIM.png"
        },
        {
            trackName: "KILL ME MAYBE",
            artistName: "CMH",
            mp3Src: "./music/KILL_ME_MAYBE.mp3",
            coverSrc: "./images/KILL_THIS_ALBUM.jpg"
        },
        {
            trackName: "Лох",
            artistName: "LIDA",
            mp3Src: "./music/loh.mp3",
            coverSrc: "./images/NEW_ROCK_STAR.jpg"
        }
    ];

    let currentTrackIndex = 0;
    let wasPlaying = false;

    // Function to load a track
    function loadTrack(index) {
        const track = tracks[index];
        audioPlayer.src = track.mp3Src;
        trackNameElement.textContent = track.trackName;
        artistNameElement.textContent = track.artistName;
        albumCoverElement.src = track.coverSrc;
        audioPlayer.currentTime = 0;
        progressBar.value = 0;
        progressFill.style.width = '0%';
        currentTimeElement.textContent = '0:00';
        totalTimeElement.textContent = '0:00';
        
        if (audioPlayer.paused) {
            pauseIcon.style.display = 'none';
            playIcon.style.display = 'block';
        } else {
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        }

        if (index === 0) {
            prevButton.disabled = true;
            prevButton.classList.add('disabled');
        } else {
            prevButton.disabled = false;
            prevButton.classList.remove('disabled');
        }
    }

    // Function to render track list
    function renderTrackList() {
        trackListContainer.innerHTML = '';
        tracks.forEach((track, index) => {
            const trackCard = document.createElement('div');
            trackCard.className = 'track-card';
            trackCard.innerHTML = `
                <img src="${track.coverSrc}" alt="${track.trackName} cover" class="track-cover">
                <div class="track-info">
                    <div class="track-name">${track.trackName}</div>
                    <div class="artist-name">${track.artistName}</div>
                </div>
            `;
            trackCard.addEventListener('click', () => {
                currentTrackIndex = index;
                loadTrack(currentTrackIndex);
                playerModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                audioPlayer.play();
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
                wasPlaying = true;
            });
            trackListContainer.appendChild(trackCard);
        });
    }

    // Render track list on page load
    renderTrackList();

    // Close modal when clicking on background
    playerModal.addEventListener('click', function(e) {
        if (e.target === playerModal || e.target.classList.contains('modal-background')) {
            playerModal.style.display = 'none';
            document.body.style.overflow = '';
            audioPlayer.pause();
            pauseIcon.style.display = 'none';
            playIcon.style.display = 'block';
            wasPlaying = false;
        }
    });

    // Play/Pause functionality
    playButton.addEventListener('click', function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
            wasPlaying = true;
        } else {
            audioPlayer.pause();
            pauseIcon.style.display = 'none';
            playIcon.style.display = 'block';
            wasPlaying = false;
        }
    });

    // Update progress bar
    audioPlayer.addEventListener('timeupdate', function() {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;
        
        if (duration) {
            const progressPercent = (currentTime / duration) * 100;
            progressBar.value = progressPercent;
            progressFill.style.width = `${progressPercent}%`;
            
            currentTimeElement.textContent = formatTime(currentTime);
            totalTimeElement.textContent = formatTime(duration);
        }
    });

    // When track ends, play next track
    audioPlayer.addEventListener('ended', function() {
        nextTrack();
    });

    // Seek functionality
    progressBar.addEventListener('input', function() {
        const seekTime = (audioPlayer.duration * progressBar.value) / 100;
        audioPlayer.currentTime = seekTime;
    });

    // Previous track
    prevButton.addEventListener('click', function() {
        if (currentTrackIndex > 0) {
            wasPlaying = !audioPlayer.paused;
            currentTrackIndex--;
            loadTrack(currentTrackIndex);
            if (wasPlaying) {
                audioPlayer.play();
            }
        }
    });

    // Next track
    nextButton.addEventListener('click', nextTrack);

    function nextTrack() {
        wasPlaying = !audioPlayer.paused;
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        loadTrack(currentTrackIndex);
        if (wasPlaying) {
            audioPlayer.play();
        }
    }

    // Volume functionality
    volumeBar.addEventListener('input', function() {
        const volumeValue = volumeBar.value;
        audioPlayer.volume = volumeValue / 100;
        volumeFill.style.width = `${volumeValue}%`;
        
        if (audioPlayer.volume === 0) {
            volumeIcon.style.display = 'none';
            muteIcon.style.display = 'block';
        } else {
            volumeIcon.style.display = 'block';
            muteIcon.style.display = 'none';
        }
    });

    // Mute/unmute
    volumeButton.addEventListener('click', function() {
        if (audioPlayer.volume > 0) {
            volumeBar.dataset.previousVolume = volumeBar.value;
            audioPlayer.volume = 0;
            volumeBar.value = 0;
            volumeFill.style.width = '0%';
            volumeIcon.style.display = 'none';
            muteIcon.style.display = 'block';
        } else {
            const previousVolume = volumeBar.dataset.previousVolume || 70;
            audioPlayer.volume = previousVolume / 100;
            volumeBar.value = previousVolume;
            volumeFill.style.width = `${previousVolume}%`;
            volumeIcon.style.display = 'block';
            muteIcon.style.display = 'none';
        }
    });

    // Format time (seconds to mm:ss)
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Initialize
    audioPlayer.volume = 0.5;
    volumeBar.value = 50;
    volumeFill.style.width = '50%';
    loadTrack(0);
});