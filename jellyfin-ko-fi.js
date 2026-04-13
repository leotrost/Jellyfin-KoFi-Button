(function () {
    const kofiUsername = 'Your_Ko-Fi_Username'; // <--- CHANGE YOUR USERNAME HERE

    function injectTopBarKofi() {
        const headerRight = document.querySelector('.headerRight');
        const searchButton = document.querySelector('.headerSearchButton');
        
        if (headerRight && !document.querySelector('.kofi-topbar-btn')) {
            
            const kofiBtn = document.createElement('button');
            kofiBtn.className = 'headerButton headerButtonRight kofi-topbar-btn paper-icon-button-light';
            kofiBtn.setAttribute('is', 'paper-icon-button-light');
            kofiBtn.title = 'Support the Server';
            kofiBtn.innerHTML = `<span class="material-icons" style="color: #ff5e5b;">favorite</span>`;

            // When clicked, open the In-App Modal
            kofiBtn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();

                // Prevent opening multiple modals
                if (document.getElementById('kofi-modal-overlay')) return;

                // Create the darkened background overlay
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

                // Close the modal if the user taps the dark background
                overlay.onclick = function(event) {
                    if (event.target === overlay) {
                        document.body.removeChild(overlay);
                    }
                };

                // Create the widget container
                const modalContent = document.createElement('div');
                modalContent.style.position = 'relative';
                modalContent.style.width = '350px';
                modalContent.style.height = '600px';
                modalContent.style.maxHeight = '85vh'; // Fits on small phone screens
                modalContent.style.backgroundColor = '#f4f4f5'; 
                modalContent.style.borderRadius = '12px';
                modalContent.style.boxShadow = '0 10px 30px rgba(0,0,0,0.8)';
                modalContent.style.overflow = 'hidden';

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
                closeBtn.onclick = () => document.body.removeChild(overlay);

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
            };

            // Insert the Heart icon into the top menu
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
