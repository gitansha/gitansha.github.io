// Optional: Add any interactive elements here if needed in the future.
AOS.init({
    duration: 1000,
    once: true
});

// Particle.js Configuration
particlesJS('particles-js', {
    particles: {
        number: { value: 80 },
        color: { value: '#6b46c1' },
        shape: { type: 'circle' },
        opacity: { value: 0.5 },
        size: { value: 3 },
        move: {
            enable: true,
            speed: 2
        }
    }
});

function openVideoModal(videoId) {
    const modal = document.getElementById('videoModal');

const videoContainer = modal.querySelector('.video-container');
    
    // Replace 'YOUR_VIDEO_URL' with your actual video URLs
    const videoUrls = {
        'estimate-video': 'https://drive.google.com/file/d/1ggEP0K2_Z_5KIQpZ7opCFBK-U0-alwKN/view',
        'fraud-video': 'YOUR_VIDEO_URL_2'
    };
    
    // Create iframe for video
    const iframe = document.createElement('iframe');
    iframe.src = videoUrls[videoId];
    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('frameborder', '0');
    
    // Clear previous content and add new video
    videoContainer.innerHTML = '';
    videoContainer.appendChild(iframe);
    
    modal.style.display = 'block';
}

// Close modal when clicking the close button or outside the modal
document.querySelector('.close-modal').addEventListener('click', () => {
    const modal = document.getElementById('videoModal');
    const videoContainer = modal.querySelector('.video-container');
    videoContainer.innerHTML = ''; // Remove video when closing
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    const modal = document.getElementById('videoModal');
    if (event.target === modal) {
        const videoContainer = modal.querySelector('.video-container');
        videoContainer.innerHTML = ''; // Remove video when closing
        modal.style.display = 'none';
    }
});

//
