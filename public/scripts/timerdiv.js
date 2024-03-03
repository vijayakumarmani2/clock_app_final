const tmaxHours = 99;
    const tmaxMinutes = 59;
    const tmaxSeconds = 59;

    let ttimer;
    let tsecondsRemaining = 0;
    let tisRunning = false;
    let beepSound = document.getElementById('beep');
    function adjustTime(type, value) {
        const element = document.getElementById(type);
        let current = parseInt(element.innerText, 10) || 0;

        if (type === 'thours') {
            current = (current + value) % (tmaxHours + 1);
        } else if (type === 'tminutes' || type === 'tseconds') {
            current = (current + value) % (tmaxMinutes + 1);
        }

        current = current < 0 ? current + (type === 'hours' ? tmaxHours + 1 : tmaxMinutes + 1) : current;

        element.innerText = current < 10 ? '0' + current : current;
    }

    function setTimer() {
        const thours = parseInt(document.getElementById('thours').innerText, 10) || 0;
        const tminutes = parseInt(document.getElementById('tminutes').innerText, 10) || 0;
        const tseconds = parseInt(document.getElementById('tseconds').innerText, 10) || 0;

        const ttotalSeconds = thours * 3600 + tminutes * 60 + tseconds;

        if (ttotalSeconds > 0) {
            tsecondsRemaining = ttotalSeconds;
            updateDisplay();
        } else {
            alert('Please enter valid hours, minutes, and/or seconds.');
        }
    }

    function startPauseTimer() {
        if (tsecondsRemaining > 0) {
            if (tisRunning) {
                clearInterval(ttimer);
                document.getElementById('tstartPauseIcon').classList.remove('fa-pause');
                document.getElementById('tstartPauseIcon').classList.add('fa-play');
            } else {
                ttimer = setInterval(updateTimer, 1000);
                document.getElementById('tstartPauseIcon').classList.remove('fa-play');
                document.getElementById('tstartPauseIcon').classList.add('fa-pause');
            }
            tisRunning = !tisRunning;
        } else {
            alert('Please set a valid ttimer before starting.');
        }
    }

    function cancelTimer() {
        document.getElementById('beep').pause();
        clearInterval(ttimer);
        tisRunning = false;
        tsecondsRemaining = 0;
        updateDisplay();
        document.getElementById('tstartPauseIcon').classList.remove('fa-pause');
        document.getElementById('tstartPauseIcon').classList.add('fa-play');
    }

    function updateTimer() {
        if (tsecondsRemaining > 0) {
            tsecondsRemaining--;
            updateDisplay();

            if (tsecondsRemaining < 5) {
                playBeep();
            }
            
        } else {
            document.getElementById('beep').pause();
            clearInterval(ttimer);
            tisRunning = false;
            alert('Timer completed!');
            updateDisplay();
            document.getElementById('tstartPauseIcon').classList.remove('fa-pause');
            document.getElementById('tstartPauseIcon').classList.add('fa-play');
        }
    }

    function updateDisplay() {
        const thours = Math.floor(tsecondsRemaining / 3600);
        const tminutes = Math.floor((tsecondsRemaining % 3600) / 60);
        const tseconds = tsecondsRemaining % 60;

        document.getElementById('thours').innerText = thours < 10 ? '0' + thours : thours;
        document.getElementById('tminutes').innerText = tminutes < 10 ? '0' + tminutes : tminutes;
        document.getElementById('tseconds').innerText = tseconds < 10 ? '0' + tseconds : tseconds;

        const displayElement = document.getElementById('tdisplay');
        displayElement.innerText = (
            (thours < 10 ? '0' : '') + thours + ':' +
            (tminutes < 10 ? '0' : '') + tminutes + ':' +
            (tseconds < 10 ? '0' : '') + tseconds
        );
    }

    function playBeep() {
        
        document.getElementById('beep').play();
    }

    function showTimerPopup(){
        const popup = document.getElementById('timer-popup');
        popup.style.display = 'block';
        document.getElementById('overlay-timer-popup').style.display = 'flex';
      }
      
      function timer_closePopup() {
        cancelTimer();
        const popup = document.getElementById('timer-popup');
        popup.style.display = 'none';
      
        document.getElementById('overlay-timer-popup').style.display = 'none';
      }