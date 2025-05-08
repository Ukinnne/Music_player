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

    // Play/Pause functionality
    playButton.addEventListener('click', function() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'block';
        } else {
            audioPlayer.pause();
            pauseIcon.style.display = 'none';
            playIcon.style.display = 'block';
        }
    });

    // Update progress bar
    audioPlayer.addEventListener('timeupdate', function() {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;
        const progressPercent = (currentTime / duration) * 100;
        
        progressBar.value = progressPercent;
        progressFill.style.width = `${progressPercent}%`;
        
        currentTimeElement.textContent = formatTime(currentTime);
        if (duration) {
            totalTimeElement.textContent = formatTime(duration);
        }
    });

    // Seek functionality
    progressBar.addEventListener('input', function() {
        const seekTime = (audioPlayer.duration / 100) * progressBar.value;
        audioPlayer.currentTime = seekTime;
    });

    // Volume functionality
    volumeBar.addEventListener('input', function() {
        audioPlayer.volume = volumeBar.value / 100;
        volumeFill.style.width = `${volumeBar.value}%`;
        
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
            audioPlayer.volume = 0;
            volumeBar.value = 0;
            volumeFill.style.width = '0%';
            volumeIcon.style.display = 'none';
            muteIcon.style.display = 'block';
        } else {
            audioPlayer.volume = 0.7;
            volumeBar.value = 70;
            volumeFill.style.width = '70%';
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
    audioPlayer.volume = 0.7;
});