let configState = document.getElementById('config-state');
let soundSelect = document.getElementById('sound-select');
let soundUpload = document.getElementById('sound-upload');
let waitTimeInput = document.getElementById('wait-time');
let soundLoopCheckbox = document.getElementById('sound-loop');
let startTrollBtn = document.getElementById('start-troll-btn');

startTrollBtn.addEventListener('click', () => {
  trollStateActive = !trollStateActive;
  startTrollBtn.textContent = trollStateActive ? 'Stop Troll Mode' : 'Start Troll Mode';

  if (trollStateActive) {
    document.querySelector("#page-content").style.display = "none";
    document.body.style.backgroundColor = "white";

    setTimeout(() => {
      document.body.innerHTML = '';
      document.addEventListener('mousemove', handleTrollState);
      document.addEventListener('keydown', handleTrollState);
    }, waitTime * 1000);

  } else {
    document.querySelector("#page-content").style.display = "block";
    document.body.style.backgroundColor = "#1a1a2e";
    document.removeEventListener('mousemove', handleTrollState);
    document.removeEventListener('keydown', handleTrollState);
    currentSound.pause();
    currentSound.currentTime = 0;
    soundPlaying = false;
  }
});

let sounds = {
  'Moan': 'Moan.mp3',
  //'fuck': 'fuck.mp3',
  //'badingading': 'badingading.mp3'
};

let currentSound = new Audio(sounds[soundSelect.value]);
let waitTime = 5;
let trollStateActive = false;
let soundPlaying = false;

soundSelect.addEventListener('change', (e) => {
  currentSound = new Audio(sounds[e.target.value]);
});

soundUpload.addEventListener('change', (e) => {
  let file = e.target.files[0];
  if (!file.type.startsWith('audio/')) {
    alert('Please upload an audio file.');
    return;
  }

  let reader = new FileReader();
  reader.onload = (e) => {
    currentSound = new Audio(e.target.result);
  };
  reader.readAsDataURL(file);
  soundSelect.value = '';
});

waitTimeInput.addEventListener('input', (e) => {
  waitTime = e.target.value;
});

function handleTrollState() {
  if (!trollStateActive || soundPlaying) return;

  soundPlaying = true;
  currentSound.play();
  currentSound.loop = soundLoopCheckbox.checked;
}