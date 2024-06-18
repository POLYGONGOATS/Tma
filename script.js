// script.js
document.addEventListener("DOMContentLoaded", function() {
    const stepCountDisplay = document.getElementById('step-count');
    const incrementButton = document.getElementById('increment-button');
    const convertButton = document.getElementById('convert-button');
    const stepsInput = document.getElementById('steps-input');
    const tokenResult = document.getElementById('token-result');
    let stepCount = 0;

    incrementButton.addEventListener('click', function() {
        stepCount++;
        stepCountDisplay.textContent = stepCount;
        stepCountDisplay.style.animation = 'none';
        setTimeout(() => {
            stepCountDisplay.style.animation = '';
        }, 10);
    });

    convertButton.addEventListener('click', function() {
        const stepsToConvert = parseInt(stepsInput.value, 10);
        if (!isNaN(stepsToConvert) && stepsToConvert > 0) {
            const tokens = stepsToConvert / 100;
            tokenResult.textContent = `You get ${tokens} Stepr Tokens`;
        } else {
            tokenResult.textContent = 'Please enter a valid number of steps';
        }
    });

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
});

