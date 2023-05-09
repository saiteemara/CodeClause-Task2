$(".stopwatch-btn").click(function(){
    $(".outer-wrapper > div").slideUp();
    $(".stopwatch").slideDown();
    $(".type").html("stopwatch");
});
// back button
$(".back-btn").click(function(){
    $(".outer-wrapper > div").slideUp();
    $(".clock").slideDown();
    $(".type").html("stopwatch");
});
// timer button
$(".timer-btn").click(function(){
    $(".outer-wrapper > div").slideUp();
    $(".timer").slideDown();
    $(".type").html("stopwatch");
});

const addTrailingZero = (num) => {
    return num < 10 ? "0" + num : num;
};

const updateTime=()=>{
     const time = new Date();
     let hours = time.getHours();
     let minutes = time.getMinutes();
     let seconds = time.getSeconds();
     let ampm = hours >= 12 ? "PM" : "AM";
     let otherampm = hours >= 12 ? "AM" : "PM"; 

     hours = hours % 12 || 12

     hours = addTrailingZero(hours);
     minutes = addTrailingZero(minutes);
     seconds = addTrailingZero(seconds);

     $("#hour").html(hours);
     $("#min").html(minutes);
     $("#sec").html(seconds);
     $("#ampm").html(ampm);
     $("#other-ampm").html(otherampm);
};
// call the function
updateTime();

setInterval(updateTime, 1000);

// Stopwatch

let stopwatchHours = 0,
    stopwatchMinutes = 0,
    stopwatchSeconds = 0,
    stopwatchMiliSeconds = 0,
    stopwatchRunning = false,
    laps = 0,
    stopwatchInterval;

const stopwatch = () => { 
    // increase milisecond by one
    stopwatchMiliSeconds++;
    if(stopwatchMiliSeconds === 100){
        stopwatchSeconds++;
        stopwatchMiliSeconds = 0;
    }
    if(stopwatch === 60){
        stopwatchMinutes++;
        stopwatchSeconds = 0;
    }
    if(stopwatchMinutes === 60){
        stopwatchHours++;
        stopwatchMinutes = 0;
    }
    
    // show values on document
    $("#stopwatch-hour").html(addTrailingZero(stopwatchHours));
    $("#stopwatch-min").html(addTrailingZero(stopwatchMinutes));
    $("#stopwatch-sec").html(addTrailingZero(stopwatchSeconds));
    $("#stopwatch-ms").html(addTrailingZero(stopwatchMiliSeconds));
};
//function to start stopwatch

const startStopwatch = () => {
    if(!stopwatchRunning){
        stopwatchInterval = setInterval(stopwatch, 10);
        stopwatchRunning = true;
    }
};
// function to stop stopwatch
 
const stopStopwatch = () => {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
};

//reset stopwatch function
const resetStopwatch = () => {
    //clear intervaland set all values to default
    clearInterval(stopwatchInterval);
    
    stopwatchHours = 0;
    stopwatchMinutes = 0;
    stopwatchSeconds = 0;
    stopwatchMiliSeconds = 0;
    stopwatchRunning = false;
    laps = 0;
           //update values on document to 00
    $("#stopwatch-hour").html("00");
    $("#stopwatch-min").html("00");
    $("#stopwatch-sec").html("00");
    $("#stopwatch-ms").html("00");
    $(".laps").html("");
};

//start stopwatch on start button
$(".start-stopwatch").click(function(){
     startStopwatch();
     // hide start button
     $(".start-stopwatch").hide();
     $(".lap-stopwatch").show();

});
// reset stopwatch on reset button
$(".reset-stopwatch").click(function(){
    resetStopwatch();
    $(".start-stopwatch").show();
    $(".lap-stopwatch").hide();

});

$(".lap-stopwatch").click(function(){ // on lap button click
    laps++;
    $(".laps").prepend(
        `<div class="lap active">
        <p>lap ${laps}</p>
        <p>
           ${addTrailingZero(stopwatchHours)} :
           ${addTrailingZero(stopwatchMinutes)}:
           ${addTrailingZero(stopwatchSeconds)} :
           ${addTrailingZero(stopwatchMiliSeconds)}
        </p>
    </div>`
    );
});

// Timer

let time = 0,
    timerHours = 0,
    timerMinutes = 0,
    timerSeconds = 0,
    timerMilisecond = 0,
    timerInterval;

const getTime = () =>{
    time = prompt("Enter time in minutes");
      // convert time to seconds
      time = time *60;
      setTime();
};

const setTime = () => {
    timerHours = Math.floor(time / 3600);
    timerMinutes = Math.floor((time % 3600) / 60);
    timerSeconds = Math.floor(time % 60);

    //show user entered time on document
    $("#timer-hour").html(addTrailingZero(timerHours));
    $("#timer-min").html(addTrailingZero(timerMinutes));
    $("#timer-sec").html(addTrailingZero(timerSeconds));
    $("#timer-ms").html(addTrailingZero(timerMilisecond));
};

const timer = ()=>{
    timerMilisecond--;
    if(timerMilisecond === -1){
        timerMilisecond = 99;
        timerSeconds--;
    }
    if(timerSeconds === -1){
        timerSeconds = 59;
        timerMinutes--;
    }
    if(timerMinutes === -1){
        timerMilisecond = 59;
        timerHours--;
    }

    //update time
    $("#timer-hour").html(addTrailingZero(timerHours));
    $("#timer-min").html(addTrailingZero(timerMinutes));
    $("#timer-sec").html(addTrailingZero(timerSeconds));
    $("#timer-ms").html(addTrailingZero(timerMilisecond));
    timeup();
};

const startTimer =()=>{
   if(timerHours === 0 && timerMinutes === 0 && timerSeconds === 0 && timerMilisecond === 0){
        getTime(); 
    }else{
        timerInterval = setInterval(timer, 10);
        $(".start-timer").hide();
        $(".stop-timer").show();
    }
};

const stopTimer = () => {
    clearInterval(timerInterval);
    $(".start-timer").show();
    $(".stop-timer").show();
}

const resetTimer = () => {
    stopTimer();
    time = 0;
    setTime();
}
const timeup = () => {
    if(timerHours === 0 && 
        timerMinutes === 0 && 
        timerSeconds === 0 && 
        timerMilisecond === 0){
            resetTimer();
            alert("Time's up");
            
        }
};

$(".start-timer").click(function(){
     startTimer();
});

$(".stop-timer").click(function(){
    stopTimer();
});

$(".reset-timer").click(function(){
    resetTimer();
});
