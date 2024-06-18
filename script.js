let steps = 0;
let tokens = 0;

if (window.DeviceMotionEvent) {
    window.addEventListener("devicemotion", handleMotionEvent, true);
}

function handleMotionEvent(event) {
    let acceleration = event.acceleration;
    if (acceleration.x > 1 || acceleration.y > 1 || acceleration.z > 1) {
        steps++;
        updateSteps();
    }
}

function updateSteps() {
    document.getElementById('stepsCount').innerText = `${steps} / 5000`;
    if (steps >= 10) {
        tokens++;
        steps -= 10;
        updateCoins();
        alert(`1 token received in wallet! Total tokens: ${tokens}`);
    }
}

function updateCoins() {
    let coinsElement = document.getElementById('coinsValue');
    let currentCoins = parseInt(coinsElement.innerText.replace(/,/g, ''));
    currentCoins += 1;
    coinsElement.innerText = currentCoins.toLocaleString();
}




