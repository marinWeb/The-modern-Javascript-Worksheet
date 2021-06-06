const durationInput = document.querySelector('#duration');
const startBtn = document.querySelector('#start');
const pauseBtn = document.querySelector('#pause');

const circle = document.querySelector('circle');

const perimeter = circle.getAttribute('r') * Math.PI *2;

circle.setAttribute('stroke-dasharray', perimeter);

let duration = 0;

const timer = new Timer(durationInput, startBtn, pauseBtn, {
    onStart(totalDuration){
        console.log('Timer has started !!!');
        duration = totalDuration;
    },

    onTick(timeRemaining){
        console.log('Timer just ticked down');
        circle.setAttribute('stroke-dashoffset', 
            perimeter * timeRemaining / duration -perimeter
        );
        
    },

    onComplete(){
        console.log('Timer Complete');
    }
});
