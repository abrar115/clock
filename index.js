const number = document.querySelector('#fname');
const button = document.querySelector('.timer-button');
const button1 = document.querySelector('.reset-button')
button.addEventListener('click', () => {
    const fullnum = number.value.split(" ")
    let time = 0
    fullnum.forEach(e => {
        if (e.toLowerCase().includes("h")){
            hour = e.replace("h", "")
            time = time + parseInt(hour * 60 *60)
        }
        if (e.toLowerCase().includes("m")){
            min = e.replace("m", "")
            time = time + parseInt(min * 60)
        }
        if (e.toLowerCase().includes("s")){
            sec = e.replace("s", "")
            time = time + parseInt(sec)
        }
    });
    console.log(time)
     let count = parseInt(time, 10);
    const interval = setInterval(()=>{
    if (count > 0) {
     count--
     number.value = pretty(count)
     console.log(count)
    }
    else {
        clearInterval(interval)
        number.value = "Timer Done :D"
    }
     }, 1000); 

})

button1.addEventListener('click', ()=>{
    number.value = ""
})

function pretty(num){
    formated = ""
    if (num / 3600 >= 1){
       
        hour = Math.floor(num/3600)
        num = num % 3600
        formated = formated + hour.toString() + "h "

    }
    if (num % 60){
        min = Math.floor(num/60)
        num = num % 60
        formated = formated + min.toString() + "m "

    }
    if (num > 0 ){
        sec = num
        formated = formated + sec.toString() + "s"
       
    }
    return formated
}
console.log(pretty(4224))

const stopwatchDisplay = document.querySelector('.stopwatch-text');
const startBtn = document.querySelector('.stopwatch-start');
const pauseBtn = document.querySelector('.stopwatch-stop');
const resetBtn = document.querySelector('.stopwatch-reset');

let startTime = 0;
let elapsed = 0;
let intervalId = null;
let running = false;

function formatTime(ms) {
    return (ms / 1000).toFixed(2) + 's';
}

function updateDisplay() {
    const current = Date.now();
    stopwatchDisplay.textContent = formatTime(elapsed + (current - startTime));
}

startBtn.addEventListener('click', () => {
    if (!running) {
        startTime = Date.now();
        intervalId = setInterval(updateDisplay, 100);
        running = true;
    }
});

pauseBtn.addEventListener('click', () => {
    if (running) {
        clearInterval(intervalId);
        elapsed += Date.now() - startTime;
        stopwatchDisplay.textContent = `Paused at ${formatTime(elapsed)}`;
        running = false;
        pauseBtn.textContent = "Resume";
    } else {
        startTime = Date.now();
        intervalId = setInterval(updateDisplay, 100);
        running = true;
        pauseBtn.textContent = "Pause";
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(intervalId);
    startTime = 0;
    elapsed = 0;
    running = false;
    stopwatchDisplay.textContent = "0.00s";
    pauseBtn.textContent = "Pause";
});
