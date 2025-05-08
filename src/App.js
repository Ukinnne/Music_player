const playButton = document.getElementById('play-button');
        const playIcon = document.getElementById('play-icon');
        const pauseIcon = document.getElementById('pause-icon');
        let isPlaying = false;

        playButton.addEventListener('click', function() {
            isPlaying = !isPlaying;
            
            if (isPlaying) {
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
            } else {
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
            }
        });