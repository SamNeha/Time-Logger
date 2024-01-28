let timer;
let startTime;
let isTimerRunning = false;
let taskText, descriptionText;
let elapsedSeconds = 0;

function toggleTimer() {
    if (isTimerRunning) {
        stopTimer();
    } else {
        startTimer();
    }
}

function startTimer() {
    taskText = document.getElementById("taskField").value;
    descriptionText = document.getElementById("descriptionField").value;

    // // Display task and description
    // document.getElementById("taskDescription").innerHTML = "Task: " + taskText + "<br>Description: " + descriptionText;

    // Change the button to "Stop" and set color to red
    var startButton = document.getElementById("startButton");
    startButton.innerHTML = "Stop";
    startButton.style.backgroundColor = "red";

    // Start the timer
    startTime = new Date().getTime() - (elapsedSeconds * 1000); // Subtract elapsed time
    isTimerRunning = true;
    updateTimer();
}

function stopTimer() {
    isTimerRunning = false;
    clearInterval(timer);

    // Reset the button to "Start" and set color to green
    var startButton = document.getElementById("startButton");
    startButton.innerHTML = "Start";
    startButton.style.backgroundColor = "green";

    // Display values in the table and reset timer
    resetTimer();
}

function resetTimer() {
    if (taskText && descriptionText && elapsedSeconds > 0) {
        // Create a new row in the table
        var table = document.getElementById("logTableBody");
        var row = table.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        // Populate the cells with task, description, and time
        cell1.innerHTML = taskText;
        cell2.innerHTML = descriptionText;
        cell3.innerHTML = formatTime(Math.floor(elapsedSeconds / 3600)) + ":" +
                          formatTime(Math.floor((elapsedSeconds % 3600) / 60)) + ":" +
                          formatTime(elapsedSeconds % 60);

        // Clear text fields and reset timer
        document.getElementById("taskField").value = "";
        document.getElementById("descriptionField").value = "";
        document.getElementById("taskDescription").innerHTML = "";
        elapsedSeconds = 0;
    }
}

function updateTimer() {
    timer = setInterval(function() {
        if (isTimerRunning) {
            var currentTime = new Date().getTime();
            elapsedSeconds = Math.floor((currentTime - startTime) / 1000);

            var hours = Math.floor(elapsedSeconds / 3600);
            var minutes = Math.floor((elapsedSeconds % 3600) / 60);
            var seconds = elapsedSeconds % 60;

            document.getElementById("taskDescription").innerHTML = formatTime(hours) + ":" + formatTime(minutes) + ":" + formatTime(seconds);
        }
    }, 1000);
}

function formatTime(time) {
    return time < 10 ? "0" + time : time;
}
