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


const loadLapsFromLocalStorage = () => {
    const storedLapData = localStorage.getItem('lapData');
    if (storedLapData) {
        const lapData = JSON.parse(storedLapData);
        lapData.forEach((lap) => {
            addLapToUI(lap);
        });
    }
};


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
        localStorage.removeItem('lapData');
    }
});

const lap = () => {
    const lapData = {
        number: `#${++lapCount}`,
        timeStamp: `${min}:${sec}:${milisec}`,
    };
     
    addLapToUI(lapData);

    storeLapInLocalStorage(lapData);
};

loadLapsFromLocalStorage();

start.addEventListener("click", toggle);
lapbtn.addEventListener("click", lap);
