const start = document.getElementsByClassName("start")[0];
const lapbtn = document.getElementsByClassName("lapbtn")[0];
const minutes = document.getElementsByClassName("minutes")[0];
const second = document.getElementsByClassName("seconds")[0];
const miliSec = document.getElementsByClassName("mili-sec")[0];



let isPlay = false;
let min = 0;
let sec = 0;
let milisec = 0;
let interval;

const toggle = () => {
    if(!isPlay){
        start.innerHTML = 'Stop';
        interval = playmiliSec();
        isPlay = true;
    }else{
        start.innerHTML = 'Start';  
        clearInterval(interval);
        isPlay = false  ;
    }
}

const playmiliSec = () => {
    return setInterval(() => {
        if(milisec < 100){
            miliSec.innerHTML = ++milisec;
        }else{
            milisec = 0;
            if(sec < 60){
                second.innerHTML = ++sec;
            }else{
                sec = 0;
                if(min < 60){
                    minutes.innerHTML = ++min;
                }else{
                    min = 0;
                }
            }    
        } 
    },10)
}

// const pause = () => {
//     clearInterval(playmiliSec);
//     // minutes.innerHTML = `${min}`;
//     // second.innerHTML = `${sec}`;
//     // miliSec.innerHTML = `${milisec}`;
// }

start.addEventListener("click", toggle);

