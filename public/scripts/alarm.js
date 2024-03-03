
let alarms = JSON.parse(localStorage.getItem('alarms')) || [];

// function showAlarmPopup() {
//   const popup = document.getElementById('popup');
//   popup.style.display = 'block';
//   clearAlarmPopup();
// }

// function closePopup() {
//   const popup = document.getElementById('popup');
//   popup.style.display = 'none';
// }

 // Load alarms from localStorage when the page loads
 document.addEventListener('DOMContentLoaded', function() {
    updateAlarmList();
    checkAlarms();
  });

function clearAlarmPopup() {
  document.getElementById('alarmTime').value = '';
  document.querySelectorAll('#alarm-weekdays input').forEach(input => input.checked = false);
}

function setAlarm() {
  const alarmTime = document.getElementById('alarmTime').value;


  const selectedDays = Array.from(document.querySelectorAll('#alarm-weekdays input:checked')).map(input => parseInt(input.value));
  //console.log('Selected Days :', selectedDays1.length);
        if (!alarmTime || selectedDays.length === 0) {
            alert('Please set a valid alarm time and select at least one weekday.');
            return;
        }

        // Do something with the alarm time and selected weekdays
        console.log('Alarm Time:', alarmTime);
        

  const newAlarm = {
    id: Date.now(),
    time: alarmTime,
    days: selectedDays,
    enabled: true
  };

  alarms.push(newAlarm);
  localStorage.setItem('alarms', JSON.stringify(alarms));

  updateAlarmList();
  closePopup();
}


function updateAlarmList() {
  const alarmsDiv = document.getElementById('alarms');
  alarmsDiv.innerHTML = '';

  alarms.forEach(alarm => {
    const alarmItem_m = document.createElement('div');
      alarmItem_m.classList.add('alarm-item');

    const alarmItem = document.createElement('div');
      alarmItem.classList.add('alarmItem');

    const alarmOptions = document.createElement('div');
    alarmOptions.classList.add('alarmOptions');

    const enableDisableSwitch = document.createElement('label');
    enableDisableSwitch.classList.add('toggle-switch');
    enableDisableSwitch.innerHTML = `
      <input type="checkbox" ${alarm.enabled ? 'checked' : ''} onclick="toggleAlarm(${alarm.id})">
      <span class="slider round"></span>
    `;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('dlt_button');
    deleteButton.innerHTML = '<img src="Images/delete.png" alt="Delete Icon">';
    deleteButton.onclick = () => deleteAlarm(alarm.id);

    alarmOptions.appendChild(enableDisableSwitch);
    alarmOptions.appendChild(deleteButton);

    alarmItem.innerHTML = `
      ${alarm.time} 
    `;
    const weekdays = document.createElement('div');
      weekdays.classList.add('weekdays');
      weekdays.textContent = `${alarm.days.map(day => getDayName(day)).join(', ')}`;

    
      alarmItem.appendChild(alarmOptions);
      alarmItem_m.appendChild(alarmItem);
      alarmItem_m.appendChild(weekdays);

    alarmsDiv.appendChild(alarmItem_m);
  });

  // Add "Add Alarm" card at the end
//   const addAlarmCard = document.createElement('div');
//   addAlarmCard.classList.add('add-alarm-card');
//   addAlarmCard.onclick = () => showAlarmPopup();
//   addAlarmCard.textContent = 'Add Alarm';

//   alarmsDiv.appendChild(addAlarmCard);
}

function toggleAlarm(id) {
  const alarm = alarms.find(alarm => alarm.id === id);

  if (alarm) {
    alarm.enabled = !alarm.enabled;

    if (alarm.enabled) {
      // Set the alarm
      const now = new Date();
      const alarmTime = new Date(`${now.toDateString()} ${alarm.time}`);
      const timeUntilAlarm = alarmTime - now;

      if (timeUntilAlarm > 0) {
        setTimeout(() => showAlarmPopup(), timeUntilAlarm);
      }
    }

    localStorage.setItem('alarms', JSON.stringify(alarms));
    updateAlarmList();
  }
}

function deleteAlarm(id) {
  alarms = alarms.filter(alarm => alarm.id !== id);
  localStorage.setItem('alarms', JSON.stringify(alarms));
  updateAlarmList();
}

function getDayName(day) {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return daysOfWeek[day];
}

function showAlarmPopup() {
  const popup = document.getElementById('setAlarm-popup');
  popup.style.display = 'block';
  document.getElementById('overlay-alarmlist-popup').style.display = 'flex';
  // Play the alarm sound
 // const alarmSound = document.getElementById('alarmSound');
 // alarmSound.play();
}

function showAlarmPopup() {
    const alarmPopup = document.getElementById('alarmPopup');
    alarmPopup.style.display = 'block';
  
  }

function closeAlarmPopup() {
    const alarmPopup = document.getElementById('alarmPopup');
    alarmPopup.style.display = 'none';
   
  }

function closePopup() {
  const popup = document.getElementById('setAlarm-popup');
  popup.style.display = 'none';

  document.getElementById('overlay-alarmlist-popup').style.display = 'none';
  // Pause the alarm sound
  const alarmSound = document.getElementById('alarmSound');
  alarmSound.pause();
  alarmSound.currentTime = 0;
}

function checkAlarms() {
    setInterval(() => {
      const now = new Date();
      alarms.forEach(alarm => {
        if (alarm.enabled) {
          const alarmTime = new Date(`${now.toDateString()} ${alarm.time}`);
          const timeUntilAlarm = alarmTime - now;

          if (timeUntilAlarm > 0 && timeUntilAlarm < 1000) {
            // Time is up, show the popup and play the alarm sound
            showAlarmPopup();
            playAlarmSound();
          }
        }
      });
    }, 1000);
  }

  function playAlarmSound() {
    const alarmSound = document.getElementById('alarmSound');
    alarmSound.play();
  }

  function stopAlarm() {
    const alarmSound = document.getElementById('alarmSound');
    alarmSound.pause();
    alarmSound.currentTime = 0;
    closeAlarmPopup();
  }


$("#alarmList").addClass("thin");
// If user has Javascript disabled, the thick scrollbar is shown
$("#alarmList").mouseover(function(){
  $(this).removeClass("thin");
});
$("#alarmList").mouseout(function(){
  $(this).addClass("thin");
});
$("#alarmList").scroll(function () {
  $("#alarmList").addClass("thin");
});

// Using https://css-tricks.com/custom-scrollbars-in-webkit/ for basic custom scrollbars




// Close the popup if the overlay is clicked
document.getElementById('overlay-alarmlist-popup').addEventListener('click', function(event) {
  if (event.target === this) {
    closePopup();
  }
});



 // Function to get the current day (1-7, where 1 is Sunday and 7 is Saturday)
 function getCurrentDay() {
  return new Date().getDay();
}

// Set the checkbox as checked based on the current day
function setCheckboxBasedOnCurrentDay() {
  const currentDay = getCurrentDay();
  const checkbox = document.getElementById(`day${currentDay}`);
  
  if (checkbox) {
      checkbox.checked = true;
  }
}
//setCheckboxBasedOnCurrentDay();

