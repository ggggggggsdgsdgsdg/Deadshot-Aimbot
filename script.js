(function() {
    'use strict';
 
    let aimbotEnabled = true;
    let uiVisible = true;
    let enemies = [true];
    const crosshair = document.querySelector('.game-crosshair'); // Assume we know this is static

    // Create the UI
    function createUI() {
        const container = document.createElement('div');
        container.id = 'helperUI';
        container.style.position = 'fixed';
        container.style.top = '10px';
        container.style.right = '10px';
        container.style.zIndex = '1000';
        container.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        container.style.color = 'white';
        container.style.padding = '10px';
        container.style.borderRadius = '5px';
        container.style.fontFamily = 'Arial, sans-serif';
 
        const aimbotButton = document.createElement('button');
        aimbotButton.textContent = 'Aimbot: OFF (Press B to enable)';
        aimbotButton.style.marginRight = '5px';
        aimbotButton.onclick = () => {
            aimbotEnabled = !aimbotEnabled;
            aimbotButton.textContent = aimbotEnabled ? 'Aimbot: ON (Press B to disable)' : 'Aimbot: OFF (Press B to enable)';
        };
 
        const toggleInfo = document.createElement('div');
        toggleInfo.textContent = 'Press F6 to hide/show this menu';
        toggleInfo.style.marginTop = '10px';
 
        const credits = document.createElement('div');
        
        credits.style.marginTop = '10px';
        credits.style.fontSize = 'smaller';
        credits.style.color = '#ccc';
 
        container.appendChild(aimbotButton);
        container.appendChild(toggleInfo);
        container.appendChild(credits);
        document.body.appendChild(container);
    }
 
    // Toggle UI visibility
    function toggleUI() {
        const container = document.getElementById('helperUI');
        container.style.display = uiVisible ? 'none' : 'block';
        uiVisible = !uiVisible;
    }
 
    // Function for Aimbot
    function aimbot() {
        if (!aimbotEnabled || enemies.length === 0) return;

        let nearestEnemy = null;
        let nearestDistanceSq = Infinity; // Use squared distance to avoid expensive square root calculation
 
        enemies.forEach(enemy => {
            const rect = enemy.getBoundingClientRect();
            const crosshairRect = crosshair.getBoundingClientRect();
            const dx = rect.left - crosshairRect.left;
            const dy = rect.top - crosshairRect.top;
            const distanceSq = dx * dx + dy * dy; // Squared distance calculation
 
            if (distanceSq < nearestDistanceSq) {
                nearestDistanceSq = distanceSq;
                nearestEnemy = enemy;
            }
        });
 
        if (nearestEnemy) {
            // Move crosshair towards the nearest enemy
            const enemyRect = nearestEnemy.getBoundingClientRect();
            crosshair.style.left = `${enemyRect.left + nearestEnemy.clientWidth / 2}px`;
            crosshair.style.top = `${enemyRect.top + nearestEnemy.clientHeight / 2}px`;
        }
    }

    // Function to update enemy list periodically
    function updateEnemies() {
        enemies = document.querySelectorAll('.enemy-character'); // Assume enemies are updated dynamically in the game
    }

    // Initialize the UI and run the functions periodically
    createUI();
    document.addEventListener('keydown', (e) => {
        if (e.key === 'F6') {
            toggleUI();
        }
        if (e.key === 'b' || e.key === 'B') {
            aimbotEnabled = !aimbotEnabled;
            const aimbotButton = document.querySelector('#helperUI button');
            aimbotButton.textContent = aimbotEnabled ? 'Aimbot: ON (Press B to disable)' : 'Aimbot: OFF (Press B to enable)';
        }
    });

    setInterval(aimbot, 200); // Run aimbot every 200ms instead of 100ms
    setInterval(updateEnemies, 500); // Update enemies list every 500ms
 
})();

