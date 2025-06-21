/**
 * Simple vanilla JavaScript lightbox for images
 * Replaces jQuery fancybox dependency
 */
(function() {
    'use strict';
    
    // Create lightbox elements
    function createLightbox() {
        const lightbox = document.createElement('div');
        lightbox.id = 'vanilla-lightbox';
        lightbox.style.display = 'none';
        lightbox.style.position = 'fixed';
        lightbox.style.zIndex = '9999';
        lightbox.style.width = '100%';
        lightbox.style.height = '100%';
        lightbox.style.top = '0';
        lightbox.style.left = '0';
        lightbox.style.backgroundColor = 'rgba(0,0,0,0.9)';
        lightbox.style.cursor = 'pointer';
        lightbox.style.display = 'flex';
        lightbox.style.alignItems = 'center';
        lightbox.style.justifyContent = 'center';
        lightbox.style.opacity = '0';
        lightbox.style.transition = 'opacity 0.3s ease';
        
        const img = document.createElement('img');
        img.id = 'vanilla-lightbox-img';
        img.style.maxWidth = '90%';
        img.style.maxHeight = '90%';
        img.style.transform = 'scale(0.9)';
        img.style.transition = 'transform 0.3s ease';
        img.style.boxShadow = '0 0 20px rgba(0,0,0,0.5)';
        
        const close = document.createElement('span');
        close.textContent = '×';
        close.style.position = 'absolute';
        close.style.top = '20px';
        close.style.right = '20px';
        close.style.fontSize = '40px';
        close.style.color = '#fff';
        close.style.cursor = 'pointer';
        
        lightbox.appendChild(img);
        lightbox.appendChild(close);
        document.body.appendChild(lightbox);
        
        return {
            container: lightbox,
            image: img,
            closeButton: close
        };
    }
    
    // Initialize lightbox functionality
    function initLightbox() {
        // Create lightbox elements if they don't exist
        const lightboxElements = createLightbox();
        const lightbox = lightboxElements.container;
        const lightboxImg = lightboxElements.image;
        const closeButton = lightboxElements.closeButton;
        
        // Find all images with data-fancybox attribute
        const images = document.querySelectorAll('.post-content img');
        
        // Add click event to each image
        images.forEach(function(img) {
            // Make images clickable
            img.style.cursor = 'pointer';
            
            img.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Set lightbox image source
                lightboxImg.src = this.src;
                
                // Show lightbox
                lightbox.style.display = 'flex';
                setTimeout(function() {
                    lightbox.style.opacity = '1';
                    lightboxImg.style.transform = 'scale(1)';
                }, 10);
            });
        });
        
        // Close lightbox when clicking on it
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox || e.target === closeButton) {
                lightbox.style.opacity = '0';
                lightboxImg.style.transform = 'scale(0.9)';
                setTimeout(function() {
                    lightbox.style.display = 'none';
                }, 300);
            }
        });
        
        // Close on ESC key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.style.display !== 'none') {
                lightbox.style.opacity = '0';
                lightboxImg.style.transform = 'scale(0.9)';
                setTimeout(function() {
                    lightbox.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Initialize after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLightbox);
    } else {
        initLightbox();
    }
})(); 