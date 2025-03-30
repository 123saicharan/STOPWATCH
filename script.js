let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let laps = [];

const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const millisecondsElement = document.getElementById('milliseconds');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');
const display = document.querySelector('.display');

function updateDisplay() {
    const totalMilliseconds = elapsedTime;
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((totalMilliseconds % 1000) / 10);

    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
    millisecondsElement.textContent = milliseconds.toString().padStart(2, '0');
}

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTimer, 10);
        
        startBtn.disabled = true;
        stopBtn.disabled = false;
        lapBtn.disabled = false;
        
        display.classList.add('running');
    }
}

function stopTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
        
        startBtn.disabled = false;
        stopBtn.disabled = true;
        
        display.classList.remove('running');
    }
}

function resetTimer() {
    stopTimer();
    elapsedTime = 0;
    updateDisplay();
    laps = [];
    lapsList.innerHTML = '';
    lapBtn.disabled = false;
}

function updateTimer() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    updateDisplay();
}

function recordLap() {
    if (isRunning) {
        const lapTime = elapsedTime;
        laps.push(lapTime);
        
        const totalSeconds = Math.floor(lapTime / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const milliseconds = Math.floor((lapTime % 1000) / 10);
        
        const lapItem = document.createElement('li');
        lapItem.innerHTML = `
            <span>Lap ${laps.length}</span>
            <span>${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}</span>
        `;
        
        lapsList.prepend(lapItem);
        
        // Add animation
        lapItem.style.opacity = '0';
        setTimeout(() => {
            lapItem.style.transition = 'opacity 0.3s ease';
            lapItem.style.opacity = '1';
        }, 10);
    }
}

// Event listeners
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);

// Initialize
updateDisplay();
stopBtn.disabled = true;
lapBtn.disabled = true;