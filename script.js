const start = document.getElementsByClassName("start")[0];
const lapbtn = document.getElementsByClassName("lapbtn")[0];
const minutes = document.getElementsByClassName("minutes")[0];
const second = document.getElementsByClassName("seconds")[0];
const miliSec = document.getElementsByClassName("mili-sec")[0];



let isPlay = false;
let min = 0;
let sec = 0;
let milisec = 0;

const toggle = () => {
    if(!isPlay){
        start.innerHTML = 'Stop';
        const playMin = () => {
            setInterval(() => {
                minutes.innerHTML = min++
            }, 60000)
        }
        
        const playSec = () => {
            setInterval(() => {
                if(sec <= 60){
                    second.innerHTML = sec++;
                }else{
                    sec = 0;
                    playMin();
                } 
            }, 1000)
        }
        
        const playmiliSec = () => {
            setInterval(() => {
                if(milisec <= 100){
                    miliSec.innerHTML = milisec++;
                }else{
                    milisec = 0;
                    playSec();
                } 
            },10)
        }
        isPlay = true;
    }else{
        start.innerHTML = 'Start';
        playmiliSec();
        isPlay = false  ;
    }
}



start.addEventListener("click", toggle);

