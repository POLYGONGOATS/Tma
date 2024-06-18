
let steps = 0;
let isTracking = false;

document.getElementById('startBtn').addEventListener('click', function() {
    if (!isTracking) {
        isTracking = true;
        this.textContent = 'Stop Tracking';
        startTrackingSteps();
    } else {
        isTracking = false;
        this.textContent = 'Start Tracking';
        stopTrackingSteps();
    }
});

document.getElementById('convertBtn').addEventListener('click', function() {
    const tokens = Math.floor(steps / 100);
    alert(`You have earned ${tokens} Stepr Tokens!`);
    steps = 0;
    updateStepCounter();
});

function startTrackingSteps() {
    if ('Accelerometer' in window) {
        const accelerometer = new Accelerometer({ frequency: 1 });
        accelerometer.addEventListener('reading', () => {
            steps += 1;
            updateStepCounter();
        });
        accelerometer.start();
    } else {
        alert('Accelerometer not supported on this device.');
    }
}

function stopTrackingSteps() {
    if ('Accelerometer' in window) {
        const accelerometer = new Accelerometer({ frequency: 1 });
        accelerometer.removeEventListener('reading', updateStepCounter);
        accelerometer.stop();
    }
}

function updateStepCounter() {
    document.getElementById('stepCounter').textContent = `Steps: ${steps}`;
}
