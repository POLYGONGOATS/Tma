// script.js
document.addEventListener("DOMContentLoaded", function() {
    const stepCountDisplay = document.getElementById('step-count');
    const convertButton = document.getElementById('convert-button');
    const stepsInput = document.getElementById('steps-input');
    const tokenResult = document.getElementById('token-result');
    let stepCount = 0;
    let lastShakeTime = null;
    let lastAcceleration = { x: 0, y: 0, z: 0 };
    let stepDetected = false;

    // Update step count display
    function updateStepDisplay(count) {
        stepCountDisplay.textContent = count;
    }

    // Detect shake or step
    function detectStepOrShake(event) {
        const { acceleration } = event;
        const deltaX = Math.abs(acceleration.x - lastAcceleration.x);
        const deltaY = Math.abs(acceleration.y - lastAcceleration.y);
        const deltaZ = Math.abs(acceleration.z - lastAcceleration.z);

        if ((deltaX > 2 || deltaY > 2 || deltaZ > 2) && !stepDetected) {
            stepCount++;
            updateStepDisplay(stepCount);
            stepDetected = true;
            setTimeout(() => stepDetected = false, 1000);
        }

        const accelerationTotal = Math.sqrt(
            acceleration.x ** 2 + acceleration.y ** 2 + acceleration.z ** 2
        );

        if (accelerationTotal > 15) { // Threshold for shake detection
            const currentTime = Date.now();
            if (!lastShakeTime || (currentTime - lastShakeTime) > 2000) { // 2 seconds interval
                stepCount++;
                updateStepDisplay(stepCount);
                lastShakeTime = currentTime;
            }
        }

        lastAcceleration = { ...acceleration };
    }

    // Step conversion functionality
    convertButton.addEventListener('click', function() {
        const stepsToConvert = parseInt(stepsInput.value, 10);
        if (!isNaN(stepsToConvert) && stepsToConvert > 0) {
            const tokens = stepsToConvert / 100;
            tokenResult.textContent = `You get ${tokens} Stepr Tokens`;
        } else {
            tokenResult.textContent = 'Please enter a valid number of steps';
        }
    });

    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            button.classList.add('active');
            document.getElementById(button.dataset.tab).classList.add('active');
        });
    });

    // Listen to device motion events
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', detectStepOrShake);
    } else {
        alert('Device Motion not supported');
    }
});



