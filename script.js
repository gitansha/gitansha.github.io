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
        'fraud-video': 'YOUR_VIDEO_URL_2',
        'metermatrix-video': 'YOUR_METERMATRIX_VIDEO_URL',
        'journey-video': 'YOUR_NTU_SIAE_VIDEO_URL'  // Add your NTU/Singapore Airlines video URL here
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

// Add this function to your existing script.js
function toggleCaseStudy(id) {
    const element = document.getElementById(id);
    element.classList.toggle('hidden');
    
    const button = event.currentTarget;
    const icon = button.querySelector('i');
    
    if (element.classList.contains('hidden')) {
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
        button.querySelector('span').textContent = 'View Detailed Case Study';
    } else {
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
        button.querySelector('span').textContent = 'Hide Detailed Case Study';
    }
}
