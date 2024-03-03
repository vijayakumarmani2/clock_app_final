function setSystemDateTime() {
    var selectedDateTime = document.getElementById("sysdatetime").value;

    // Send the selectedDateTime to the server using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/setsysDateTime', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log('System date and time updated successfully.');
        } else {
            console.error('Failed to update system date and time.');
        }
    };

    xhr.send(JSON.stringify({ datetime: selectedDateTime }));
}

function showSettingsPopup(){
    const popup = document.getElementById('settings-popup');
    popup.style.display = 'block';
    document.getElementById('overlay-settings-popup').style.display = 'flex';
  }
  
  function settings_closePopup() {
    
    const popup = document.getElementById('settings-popup');
    popup.style.display = 'none';
  
    document.getElementById('overlay-settings-popup').style.display = 'none';
  }