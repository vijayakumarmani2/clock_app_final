let stimer;
let sisRunning = false;
let sseconds = 0;
let laps = [];

function SWstartPause() {
  if (sisRunning) {
    clearInterval(stimer);
  } else {
    stimer = setInterval(SWupdateDisplay, 1000);
  }
  sisRunning = !sisRunning;
  updateStartPauseButton();
}

function SWstop() {
  clearInterval(stimer);
  sisRunning = false;
  sseconds = 0;
  laps = [];
  updateStartPauseButton();
  updateLapList();
  SWupdateDisplay();
}

function SWlap() {
  laps.push(formatTime(sseconds));
  updateLapList();
  SWupdateDisplay();
}

function SWupdateDisplay() {
  document.getElementById('display').innerText = formatTime(sseconds);
  sseconds++;
}

function updateStartPauseButton() {
  const startPauseButton = document.getElementById('startPauseButton');
  const iconClass = sisRunning ? 'fas fa-pause' : 'fas fa-play';
  startPauseButton.innerHTML = `<i class="${iconClass}"></i> ${sisRunning ? 'Pause' : 'Start'}`;
}

function updateLapList() {
  const lapListElement = document.getElementById('lapList');
  lapListElement.innerHTML = laps.map((lap, index) => {
    const iconClass = index === 0 ? 'fas fa-flag-checkered' : 'far fa-clock';
    return `<p><i class="${iconClass}"></i> Lap ${index + 1}: ${lap}</p>`;
  }).join('');
  lapListElement.scrollTop = lapListElement.scrollHeight; // Auto-scroll to the bottom
}

function formatTime(sseconds) {
  const hours = Math.floor(sseconds / 3600);
  const minutes = Math.floor((sseconds % 3600) / 60);
  const secs = sseconds % 60;

  return (
    (hours < 10 ? '0' : '') + hours + ':' +
    (minutes < 10 ? '0' : '') + minutes + ':' +
    (secs < 10 ? '0' : '') + secs
  );
}

function showStopwatchPopup(){
  const popup = document.getElementById('stopwatch-popup');
  popup.style.display = 'block';
  document.getElementById('overlay-stopwatch-popup').style.display = 'flex';
}

function stopwatch_closePopup() {
  SWstop();
  const popup = document.getElementById('stopwatch-popup');
  popup.style.display = 'none';

  document.getElementById('overlay-stopwatch-popup').style.display = 'none';
}