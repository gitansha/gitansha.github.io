// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Particle.js Configuration
particlesJS('particles-js', {
    particles: {
        number: { value: 80 },
        color: { value: '#6b46c1' },
        shape: { type: 'circle' },
        opacity: { 
            value: 0.5,
            random: true 
        },
        size: { 
            value: 3,
            random: true 
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#6b46c1',
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        }
    },
    retina_detect: true
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Progress bar
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('progressBar').style.width = scrolled + '%';
});

// Video Modal Functions
function openVideoModal(videoId) {
    const modal = document.getElementById('videoModal');
    const videoContainer = modal.querySelector('.video-container');
    
    // Video URLs - Replace these with your actual video links
    const videoUrls = {
        'feastie-video': 'YOUR_DROPBOX_LINK_HERE', // Add your Dropbox link here
        'plant-bot-video': 'YOUR_DROPBOX_LINK_HERE', // Add your Dropbox link here
        'estimate-video': 'https://drive.google.com/file/d/1ggEP0K2_Z_5KIQpZ7opCFBK-U0-alwKN/view',
        'metermatrix-video': 'YOUR_VIDEO_URL_HERE',
        'tableau': 'https://public.tableau.com/app/profile/gitansha.aggarwal/vizzes',
        'tedx-video': 'YOUR_DROPBOX_LINK_HERE' // Add your TEDx Dropbox link here
    };
    
    let videoUrl = videoUrls[videoId];
    
    // Convert Dropbox links to embeddable format
    // Dropbox share links need to be converted:
    // From: https://www.dropbox.com/s/XXXXX/video.mp4?dl=0
    // To: https://www.dropbox.com/s/XXXXX/video.mp4?raw=1
    if (videoUrl && videoUrl.includes('dropbox.com')) {
        videoUrl = videoUrl.replace('?dl=0', '?raw=1').replace('www.dropbox.com', 'dl.dropboxusercontent.com');
    }
    
    // Convert Google Drive links to embeddable format
    if (videoUrl && videoUrl.includes('drive.google.com/file/d/')) {
        const fileId = videoUrl.match(/\/d\/(.+?)\//);
        if (fileId) {
            videoUrl = `https://drive.google.com/file/d/${fileId[1]}/preview`;
        }
    }
    
    // For Tableau, open in new tab instead of modal
    if (videoId === 'tableau') {
        window.open(videoUrl, '_blank');
        return;
    }
    
    // Create iframe for video
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
        // YouTube videos
        let youtubeId = '';
        if (videoUrl.includes('youtu.be/')) {
            youtubeId = videoUrl.split('youtu.be/')[1].split('?')[0];
        } else if (videoUrl.includes('youtube.com/watch?v=')) {
            youtubeId = videoUrl.split('v=')[1].split('&')[0];
        }
        videoContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${youtubeId}" allowfullscreen frameborder="0"></iframe>`;
    } else if (videoUrl.includes('vimeo.com')) {
        // Vimeo videos
        const vimeoId = videoUrl.split('vimeo.com/')[1].split('?')[0];
        videoContainer.innerHTML = `<iframe src="https://player.vimeo.com/video/${vimeoId}" allowfullscreen frameborder="0"></iframe>`;
    } else if (videoUrl.includes('dropbox') || videoUrl.includes('drive.google.com')) {
        // Dropbox or Google Drive videos
        videoContainer.innerHTML = `<iframe src="${videoUrl}" allowfullscreen frameborder="0" allow="autoplay"></iframe>`;
    } else {
        // Direct video links or other embeddable sources
        videoContainer.innerHTML = `<iframe src="${videoUrl}" allowfullscreen frameborder="0"></iframe>`;
    }
    
    modal.style.display = 'block';
}

// Close modal when clicking the close button
document.querySelector('.close-modal').addEventListener('click', () => {
    const modal = document.getElementById('videoModal');
    const videoContainer = modal.querySelector('.video-container');
    videoContainer.innerHTML = ''; // Remove video when closing
    modal.style.display = 'none';
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (event) => {
    const modal = document.getElementById('videoModal');
    if (event.target === modal) {
        const videoContainer = modal.querySelector('.video-container');
        videoContainer.innerHTML = ''; // Remove video when closing
        modal.style.display = 'none';
    }
});

// Toggle Case Study Details
function toggleCaseStudy(id) {
    const element = document.getElementById(id);
    const button = event.currentTarget;
    const icon = button.querySelector('i');
    const textSpan = button.querySelector('span') || button.childNodes[0];
    
    element.classList.toggle('hidden');
    
    if (element.classList.contains('hidden')) {
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
        if (textSpan.nodeType === Node.TEXT_NODE) {
            button.childNodes[0].textContent = 'View Detailed Case Study ';
        } else {
            textSpan.textContent = 'View Detailed Case Study ';
        }
    } else {
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
        if (textSpan.nodeType === Node.TEXT_NODE) {
            button.childNodes[0].textContent = 'Hide Detailed Case Study ';
        } else {
            textSpan.textContent = 'Hide Detailed Case Study ';
        }
    }
}

// Contact Form Handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // You can integrate with a backend service here (e.g., EmailJS, Formspree, etc.)
    // For now, we'll just show an alert
    alert(`Thank you ${name}! Your message has been received. I'll get back to you soon!`);
    
    // Reset form
    this.reset();
});

// Add scroll reveal effect for stats
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                if (text.includes('+')) {
                    const number = parseInt(text);
                    animateValue(stat, 0, number, 2000);
                } else if (text.includes('%')) {
                    const number = parseInt(text);
                    animateValue(stat, 0, number, 2000, '%');
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsContainer = document.querySelector('.stats-container');
if (statsContainer) {
    statsObserver.observe(statsContainer);
}

function animateValue(obj, start, end, duration, suffix = '+') {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        obj.textContent = value + suffix;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Mobile menu toggle (if you want to add hamburger menu later)
// Uncomment and customize as needed
/*
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}
*/

console.log('Portfolio loaded successfully! 🚀');