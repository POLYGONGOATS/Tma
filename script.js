// script.js
document.addEventListener("DOMContentLoaded", function() {
    const stepCountDisplay = document.getElementById('step-count');
    const incrementButton = document.getElementById('increment-button');
    const convertButton = document.getElementById('convert-button');
    const stepsInput = document.getElementById('steps-input');
    const tokenResult = document.getElementById('token-result');
    const authButton = document.getElementById('auth-button');
    const authContainer = document.getElementById('auth-container');
    let stepCount = 0;

    // Step counting functionality
    incrementButton.addEventListener('click', function() {
        stepCount++;
        updateStepDisplay(stepCount);
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

    // Google Fit API integration
    authButton.addEventListener('click', function() {
        authenticate().then(loadClient).then(getSteps);
    });

    function authenticate() {
        return gapi.auth2.getAuthInstance()
            .signIn({scope: "https://www.googleapis.com/auth/fitness.activity.read"})
            .then(function() {
                console.log("Sign-in successful");
                authContainer.style.display = 'none';
            }, function(err) {
                console.error("Error signing in", err);
            });
    }

    function loadClient() {
        gapi.client.setApiKey(YOUR_API_KEY);
        return gapi.client.load("https://fitness.googleapis.com/$discovery/rest?version=v1")
            .then(function() {
                console.log("GAPI client loaded for API");
            }, function(err) {
                console.error("Error loading GAPI client for API", err);
            });
    }

    function getSteps() {
        return gapi.client.fitness.users.dataset.aggregate({
            "userId": "me",
            "resource": {
                "aggregateBy": [{
                    "dataTypeName": "com.google.step_count.delta",
                    "dataSourceId": "derived:com.google.step_count

