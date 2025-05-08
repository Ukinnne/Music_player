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
        
        if (duration) {
            const progressPercent = (currentTime / duration) * 100;
            progressBar.value = progressPercent;
            progressFill.style.width = `${progressPercent}%`;
            
            currentTimeElement.textContent = formatTime(currentTime);
            totalTimeElement.textContent = formatTime(duration);
        }
    });

    // Когда трек закончился
    audioPlayer.addEventListener('ended', function() {
        pauseIcon.style.display = 'none';
        playIcon.style.display = 'block';
        progressBar.value = 0;
        progressFill.style.width = '0%';
        currentTimeElement.textContent = formatTime(0);
    });

    // Seek functionality
    progressBar.addEventListener('input', function() {
        const seekTime = (audioPlayer.duration * progressBar.value) / 100;
        audioPlayer.currentTime = seekTime;
    });

    progressBar.addEventListener('change', function() {
        const seekTime = (audioPlayer.duration * progressBar.value) / 100;
        audioPlayer.currentTime = seekTime;
    });

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
            // Save current volume before muting
            volumeBar.dataset.previousVolume = volumeBar.value;
            audioPlayer.volume = 0;
            volumeBar.value = 0;
            volumeFill.style.width = '0%';
            volumeIcon.style.display = 'none';
            muteIcon.style.display = 'block';
        } else {
            // Restore previous volume or default to 70
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
    audioPlayer.volume = 0.7;
    volumeBar.value = 70;
    volumeFill.style.width = '70%';
});