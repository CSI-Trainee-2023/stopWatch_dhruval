const start = document.getElementsByClassName("start")[0];
const lapbtn = document.getElementsByClassName("lapbtn")[0];
const minutes = document.getElementsByClassName("minutes")[0];
const second = document.getElementsByClassName("seconds")[0];
const miliSec = document.getElementsByClassName("mili-sec")[0];
const lapList = document.getElementsByClassName("lapList")[0];
const clearall = document.getElementsByClassName("clearAll")[0];

let isPlay = false;
let min = 0;
let sec = 0;
let milisec = 0;
let interval;
let lapCount = 0;

// Function to retrieve lap data from local storage and populate lap list
const loadLapsFromLocalStorage = () => {
    const storedLapData = localStorage.getItem('lapData');
    if (storedLapData) {
        const lapData = JSON.parse(storedLapData);
        lapData.forEach((lap) => {
            addLapToUI(lap);
        });
    }
};

// Function to add a lap to the UI
const addLapToUI = (lap) => {
    const li = document.createElement("li");
    const number = document.createElement("span");
    const timeStamp = document.createElement("span");

    li.setAttribute("class", "lap");
    number.setAttribute("class", "lapCount");
    timeStamp.setAttribute("class", "lapTime");

    number.innerHTML = lap.number;
    timeStamp.innerHTML = lap.timeStamp;

    li.append(number, timeStamp);
    lapList.append(li);
};

// Function to store lap data in local storage
const storeLapInLocalStorage = (lap) => {
    const storedLapData = localStorage.getItem('lapData');
    let lapData = [];
    if (storedLapData) {
        lapData = JSON.parse(storedLapData);
    }
    lapData.push(lap);
    localStorage.setItem('lapData', JSON.stringify(lapData));
};

const toggle = () => {
    if (!isPlay) {
        start.innerHTML = 'Stop';
        interval = playmiliSec();
        isPlay = true;
    } else {
        start.innerHTML = 'Start';
        clearInterval(interval);
        isPlay = false;
    }
};

const playmiliSec = () => {
    return setInterval(() => {
        if (milisec < 100) {
            miliSec.innerHTML = ++milisec;
        } else {
            milisec = 0;
            if (sec < 60) {
                second.innerHTML = ++sec;
            } else {
                sec = 0;
                if (min < 60) {
                    minutes.innerHTML = ++min;
                } else {
                    min = 0;
                }
            }
        }
    }, 10);
};

document.addEventListener('keydown', function (event) {
    if (event.key === 'R') {
        minutes.innerHTML = '00';
        second.innerHTML = '00';
        miliSec.innerHTML = '00';
    }
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'c') {
        lapList.innerHTML = '';
        // Clear lap data from local storage when clearing the list
        localStorage.removeItem('lapData');
    }
});

const lap = () => {
    const lapData = {
        number: `#${++lapCount}`,
        timeStamp: `${min}:${sec}:${milisec}`,
    };
    
    // Add lap data to UI
    addLapToUI(lapData);
    
    // Store lap data in local storage
    storeLapInLocalStorage(lapData);
};

// Load lap data from local storage when the page loads
loadLapsFromLocalStorage();

start.addEventListener("click", toggle);
lapbtn.addEventListener("click", lap);
