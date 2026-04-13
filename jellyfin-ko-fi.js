(function () {
    const kofiUsername = 'YOUR_USER_NAME'; // <--- PUT YOUR KO-FI USERNAME HERE
    
    // Paste an image URL between the quotes below. 
    // Example: 'https://i.imgur.com/yourimage.png'
    // Leave it exactly as '' to use the default red heart icon.
    const customIconUrl = ''; 

    function injectTopBarKofi() {
        const headerRight = document.querySelector('.headerRight');
        const searchButton = document.querySelector('.headerSearchButton');
        
        if (headerRight && !document.querySelector('.kofi-topbar-btn')) {
            
            const kofiBtn = document.createElement('button');
            kofiBtn.className = 'headerButton headerButtonRight kofi-topbar-btn paper-icon-button-light';
            kofiBtn.setAttribute('is', 'paper-icon-button-light');
            kofiBtn.title = 'Support the Server';

            // --- The Icon Logic ---
            if (customIconUrl.trim() !== '') {
                kofiBtn.innerHTML = `<img src="${customIconUrl}" style="width: 24px; height: 24px; object-fit: contain; border-radius: 4px;" alt="Support">`;
            } else {
                kofiBtn.innerHTML = `<span class="material-icons" style="color: #ff5e5b;">favorite</span>`;
            }

            // When clicked, open the In-App Modal
            kofiBtn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();

                // Prevent opening multiple modals
                if (document.getElementById('kofi-modal-overlay')) return;

                // 1. Create the darkened background overlay
                const overlay = document.createElement('div');
                overlay.id = 'kofi-modal-overlay';
                overlay.style.position = 'fixed';
                overlay.style.top = '0';
                overlay.style.left = '0';
                overlay.style.width = '100vw';
                overlay.style.height = '100vh';
                overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                overlay.style.zIndex = '99999';
                overlay.style.display = 'flex';
                overlay.style.alignItems = 'center';
                overlay.style.justifyContent = 'center';
                
                // Animation defaults for the overlay (fade in)
                overlay.style.opacity = '0';
                overlay.style.transition = 'opacity 0.25s ease-out';

                // 2. Create the widget container
                const modalContent = document.createElement('div');
                modalContent.style.position = 'relative';
                modalContent.style.width = '350px';
                modalContent.style.height = '600px';
                modalContent.style.maxHeight = '85vh'; 
                modalContent.style.backgroundColor = '#f4f4f5'; 
                modalContent.style.borderRadius = '12px';
                modalContent.style.boxShadow = '0 10px 40px rgba(0,0,0,0.5)';
                modalContent.style.overflow = 'hidden';

                // Animation defaults for the modal (zoom in)
                modalContent.style.transform = 'scale(0.2)';
                modalContent.style.opacity = '0';
                // Using a slight cubic-bezier for a natural "spring" effect
                modalContent.style.transition = 'all 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.1)';

                // 3. The Close Logic (Animate out, then remove)
                const closeModal = function() {
                    overlay.style.opacity = '0';
                    modalContent.style.transform = 'scale(0.2)';
                    modalContent.style.opacity = '0';
                    
                    // Wait for the 250ms animation to finish before deleting the elements
                    setTimeout(() => {
                        if (document.body.contains(overlay)) {
                            document.body.removeChild(overlay);
                        }
                    }, 250); 
                };

                // Close if user taps the dark background
                overlay.onclick = function(event) {
                    if (event.target === overlay) closeModal();
                };

                // Close "X" Button
                const closeBtn = document.createElement('button');
                closeBtn.innerHTML = '✖';
                closeBtn.style.position = 'absolute';
                closeBtn.style.top = '10px';
                closeBtn.style.right = '15px';
                closeBtn.style.background = '#000';
                closeBtn.style.color = '#fff';
                closeBtn.style.border = 'none';
                closeBtn.style.borderRadius = '50%';
                closeBtn.style.width = '30px';
                closeBtn.style.height = '30px';
                closeBtn.style.cursor = 'pointer';
                closeBtn.style.zIndex = '100';
                closeBtn.style.transition = 'transform 0.2s';
                closeBtn.onmouseover = () => closeBtn.style.transform = 'scale(1.1)';
                closeBtn.onmouseout = () => closeBtn.style.transform = 'scale(1)';
                closeBtn.onclick = closeModal;

                // Embed the Ko-fi Widget directly
                const iframe = document.createElement('iframe');
                iframe.src = `https://ko-fi.com/${kofiUsername}/?hidefeed=true&widget=true&embed=true&preview=true`;
                iframe.style.width = '100%';
                iframe.style.height = '100%';
                iframe.style.border = 'none';

                // Put it all together
                modalContent.appendChild(closeBtn);
                modalContent.appendChild(iframe);
                overlay.appendChild(modalContent);
                document.body.appendChild(overlay);

                // 4. Trigger the Animations
                // We use requestAnimationFrame to ensure the browser has placed the invisible 
                // elements on the screen first, before we tell it to change to full size/opacity.
                requestAnimationFrame(() => {
                    overlay.style.opacity = '1';
                    modalContent.style.transform = 'scale(1)';
                    modalContent.style.opacity = '1';
                });
            };

            // Insert the icon into the top menu
            if (searchButton) {
                headerRight.insertBefore(kofiBtn, searchButton);
            } else {
                headerRight.appendChild(kofiBtn);
            }
        }
    }

    // Keep checking to ensure the button stays in the menu
    setInterval(injectTopBarKofi, 1000);
})();
