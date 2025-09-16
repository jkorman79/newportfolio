// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Smooth scrolling for anchor links
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

// Contact form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Create mailto link
        const subject = `Portfolio Contact from ${name}`;
        const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
        const mailtoLink = `mailto:josephkorman79@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        showNotification('Thank you! Your email client should open with a pre-filled message.', 'success');
    });
}

// Video portfolio category filtering
function filterVideos(category) {
    const videoItems = document.querySelectorAll('.video-item');
    const categoryButtons = document.querySelectorAll('.category-button');
    
    // Update active button
    categoryButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter videos
    videoItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (category === 'all' || itemCategory === category) {
            item.style.display = 'block';
            item.classList.add('fade-in-up');
        } else {
            item.style.display = 'none';
            item.classList.remove('fade-in-up');
        }
    });
}

// Video modal functionality
function openVideoModal(videoUrl) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        cursor: pointer;
    `;
    
    // Create video container
    const videoContainer = document.createElement('div');
    videoContainer.style.cssText = `
        position: relative;
        width: 90%;
        max-width: 800px;
        aspect-ratio: 16/9;
        background: #000;
        border-radius: 10px;
        overflow: hidden;
    `;
    
    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.src = videoUrl;
    iframe.style.cssText = `
        width: 100%;
        height: 100%;
        border: none;
    `;
    iframe.setAttribute('allowfullscreen', '');
    
    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        padding: 0;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Assemble modal
    videoContainer.appendChild(iframe);
    videoContainer.appendChild(closeBtn);
    modal.appendChild(videoContainer);
    document.body.appendChild(modal);
    
    // Close modal functionality
    function closeModal() {
        document.body.removeChild(modal);
    }
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeModal();
    });
}

// Add click handlers to video thumbnails and handle thumbnail fallbacks
document.addEventListener('DOMContentLoaded', function() {
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    videoThumbnails.forEach(thumbnail => {
        const videoUrl = thumbnail.getAttribute('data-video-url');
        if (videoUrl) {
            thumbnail.addEventListener('click', () => openVideoModal(videoUrl));
        }
        
        // Handle thumbnail fallbacks
        const img = thumbnail.querySelector('img');
        if (img) {
            // Add inline error handling for immediate fallback to ALL YouTube videos
            if (img.src.includes('youtube.com') && !img.hasAttribute('onerror')) {
                const videoId = extractVideoId(img.src);
                if (videoId) {
                    const fallbackUrl = buildYouTubeThumbnailUrl(videoId, 'hqdefault');
                    img.setAttribute('onerror', `this.src='${fallbackUrl}'`);
                }
            }
            
            img.addEventListener('error', async function() {
                // Check if it's a YouTube video
                const videoId = extractVideoId(img.src);
                if (videoId) {
                    try {
                        // Try to get the best available thumbnail
                        const bestThumbnail = await getBestYouTubeThumbnail(videoId);
                        if (bestThumbnail) {
                            img.src = bestThumbnail;
                        } else {
                            // If no thumbnail is available (private/restricted video), show placeholder
                            img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMTI1SDIyNVYxNzVIMTc1VjEyNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTE5NS4zNzUgMTQ1TDE4NSAxMzUuNjI1TDE3NSAxNDUuNjI1TDE5NS4zNzUgMTY1TDIyNSAxMzUuNjI1TDIxNSAxMjUuNjI1TDE5NS4zNzUgMTQ1WiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
                            img.alt = 'Video thumbnail not available (private/restricted)';
                        }
                    } catch (error) {
                        // Fallback for any errors
                        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMTI1SDIyNVYxNzVIMTc1VjEyNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTE5NS4zNzUgMTQ1TDE4NSAxMzUuNjI1TDE3NSAxNDUuNjI1TDE5NS4zNzUgMTY1TDIyNSAxMzUuNjI1TDIxNSAxMjUuNjI1TDE5NS4zNzUgMTQ1WiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
                        img.alt = 'Video thumbnail not available';
                    }
                } else {
                    // For Vimeo or other videos, show placeholder immediately
                    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMTI1SDIyNVYxNzVIMTc1VjEyNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTE5NS4zNzUgMTQ1TDE4NSAxMzUuNjI1TDE3NSAxNDUuNjI1TDE5NS4zNzUgMTY1TDIyNSAxMzUuNjI1TDIxNSAxMjUuNjI1TDE5NS4zNzUgMTQ1WiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
                    img.alt = 'Video thumbnail not available';
                }
            });
        }
    });
});

// Comprehensive function to extract video ID from any YouTube URL format
function extractVideoId(url) {
    if (!url) return null;
    
    // Handle different YouTube URL formats
    const patterns = [
        // Standard YouTube URLs: https://www.youtube.com/watch?v=VIDEO_ID
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|youtube\.com\/vi\/)([a-zA-Z0-9_-]{11})/,
        // Short URLs: https://youtu.be/VIDEO_ID
        /youtu\.be\/([a-zA-Z0-9_-]{11})/,
        // Embed URLs: https://www.youtube.com/embed/VIDEO_ID
        /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
        // Direct video URLs: https://www.youtube.com/v/VIDEO_ID
        /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
        // Thumbnail URLs: https://img.youtube.com/vi/VIDEO_ID/
        /img\.youtube\.com\/vi\/([a-zA-Z0-9_-]{11})/
    ];
    
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }
    
    return null;
}

// Function to build YouTube thumbnail URL
function buildYouTubeThumbnailUrl(videoId, quality = 'hqdefault') {
    if (!videoId) return null;
    
    const validQualities = ['maxresdefault', 'hqdefault', 'mqdefault', 'default'];
    if (!validQualities.includes(quality)) {
        quality = 'hqdefault';
    }
    
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

// Function to test thumbnail availability and get the best quality
async function getBestYouTubeThumbnail(videoId) {
    if (!videoId) return null;
    
    const qualities = ['maxresdefault', 'hqdefault', 'mqdefault', 'default'];
    
    for (const quality of qualities) {
        try {
            const thumbnailUrl = buildYouTubeThumbnailUrl(videoId, quality);
            const response = await fetch(thumbnailUrl, { method: 'HEAD' });
            if (response.ok) {
                return thumbnailUrl;
            }
        } catch (error) {
            // Continue to next quality
            continue;
        }
    }
    
    // If all qualities fail, return null (will trigger fallback)
    return null;
}

// Function to test and fix all thumbnails immediately
async function testAndFixThumbnails() {
    const allImages = document.querySelectorAll('.video-thumbnail img');
    
    for (const img of allImages) {
        if (img.src.includes('youtube.com')) {
            const videoId = extractVideoId(img.src);
            if (videoId) {
                try {
                    // Get the best available thumbnail
                    const bestThumbnail = await getBestYouTubeThumbnail(videoId);
                    if (bestThumbnail) {
                        img.src = bestThumbnail;
                    } else {
                        // If no thumbnail is available (private/restricted video), use fallback
                        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMTI1SDIyNVYxNzVIMTc1VjEyNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTE5NS4zNzUgMTQ1TDE4NSAxMzUuNjI1TDE3NSAxNDUuNjI1TDE5NS4zNzUgMTY1TDIyNSAxMzUuNjI1TDIxNSAxMjUuNjI1TDE5NS4zNzUgMTQ1WiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
                        img.alt = 'Video thumbnail not available (private/restricted)';
                    }
                } catch (error) {
                    // Fallback for any errors
                    img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgMTI1SDIyNVYxNzVIMTc1VjEyNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTE5NS4zNzUgMTQ1TDE4NSAxMzUuNjI1TDE3NSAxNDUuNjI1TDE5NS4zNzUgMTY1TDIyNSAxMzUuNjI1TDIxNSAxMjUuNjI1TDE5NS4zNzUgMTQ1WiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K';
                    img.alt = 'Video thumbnail not available';
                }
            }
        }
    }
}

// Utility function to update any YouTube URL to use proper thumbnail
function updateYouTubeThumbnailUrl(originalUrl, quality = 'hqdefault') {
    const videoId = extractVideoId(originalUrl);
    if (videoId) {
        return buildYouTubeThumbnailUrl(videoId, quality);
    }
    return originalUrl;
}

// Run thumbnail test after page loads
document.addEventListener('DOMContentLoaded', function() {
    // Run the test after a short delay to ensure all images are loaded
    setTimeout(testAndFixThumbnails, 1000);
});

// Copy email function
function copyEmail() {
    const email = 'josephkorman79@gmail.com';
    const emailLink = event.target.closest('.email-link') || document.querySelector('.email-link');
    
    // Use the modern Clipboard API if available
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(() => {
            showCopySuccess(emailLink);
        }).catch(() => {
            fallbackCopyTextToClipboard(email, emailLink);
        });
    } else {
        // Fallback for older browsers
        fallbackCopyTextToClipboard(email, emailLink);
    }
}

// Fallback copy function for older browsers
function fallbackCopyTextToClipboard(text, copyBtn) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess(copyBtn);
        } else {
            showCopyError(copyBtn);
        }
    } catch (err) {
        showCopyError(copyBtn);
    }
    
    document.body.removeChild(textArea);
}

// Show copy success feedback
function showCopySuccess(emailLink) {
    if (!emailLink) return;
    
    const originalIcon = emailLink.querySelector('i').outerHTML;
    const originalText = emailLink.querySelector('span').textContent;
    
    emailLink.classList.add('copied');
    emailLink.querySelector('i').className = 'fas fa-check';
    emailLink.querySelector('span').textContent = 'Copied!';
    
    setTimeout(() => {
        emailLink.classList.remove('copied');
        emailLink.querySelector('i').outerHTML = originalIcon;
        emailLink.querySelector('span').textContent = originalText;
    }, 2000);
}

// Show copy error feedback
function showCopyError(emailLink) {
    if (!emailLink) return;
    
    const originalIcon = emailLink.querySelector('i').outerHTML;
    const originalText = emailLink.querySelector('span').textContent;
    
    emailLink.style.background = '#fef2f2';
    emailLink.style.borderColor = '#fca5a5';
    emailLink.querySelector('i').className = 'fas fa-times';
    emailLink.querySelector('span').textContent = 'Error';
    
    setTimeout(() => {
        emailLink.style.background = '';
        emailLink.style.borderColor = '';
        emailLink.querySelector('i').outerHTML = originalIcon;
        emailLink.querySelector('span').textContent = originalText;
    }, 2000);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10001;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.project-card, .video-item, .skill-item');
    animateElements.forEach(el => observer.observe(el));
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Utility function to get YouTube thumbnail
function getYouTubeThumbnail(videoId, quality = 'maxresdefault') {
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

// Utility function to get YouTube embed URL
function getYouTubeEmbedUrl(videoId) {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
}

// Utility function to get Vimeo embed URL
function getVimeoEmbedUrl(videoId) {
    return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
}

// Handle external links
document.addEventListener('DOMContentLoaded', function() {
    const externalLinks = document.querySelectorAll('a[href^="http"]');
    externalLinks.forEach(link => {
        if (!link.hostname.includes(window.location.hostname)) {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
});

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'https://media.licdn.com/dms/image/D4E03AQF8QJ8QJ8QJ8Q/profile-displayphoto-shrink_400_400/0/1234567890?e=1234567890&v=beta&t=1234567890',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
        'https://img.youtube.com/vi/EC8i0ai-KR0/maxresdefault.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
document.addEventListener('DOMContentLoaded', preloadImages);

