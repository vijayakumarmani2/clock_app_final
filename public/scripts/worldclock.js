function updateWorldTimeAndDate(timezone) {
    const now = new Date();
    const formattedwTime = now.toLocaleString('en-US', {
      timeZone: timezone,
      hour12: true,
      hour: 'numeric',
      minute: 'numeric'
    });
  
    // Format date
    const formattedwDate = now.toLocaleDateString('en-US', {
      timeZone: timezone,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).replace(/,/g, ''); // Replace all commas
    document.getElementById('worldtime').textContent =  formattedwTime;
    document.getElementById('worlddate').textContent = formattedwDate;
  }
  
  function showTimeZonePopup() {
    document.getElementById('worldtimezone-popup').style.display = 'block';
  }
  
  function updateTimeZone() {
    const selectedTimeZone = document.getElementById('worldtimezone-select').value;
    updateWorldTimeAndDate(selectedTimeZone);
  
    const timezoneLabel = document.getElementById('worldtimezone-label');
    timezoneLabel.textContent = selectedTimeZone.split('/')[1]; // Extracts the city name
    hideTimeZonePopup();
  }
  
  function hideTimeZonePopup() {
    document.getElementById('worldtimezone-popup').style.display = 'none';
  }
  
  
  
  // Update time and date every second
  setInterval(function() {
    updateWorldTimeAndDate(document.getElementById('worldtimezone-select').value);
  }, 1000);
  // Initial update with London timezone
  updateWorldTimeAndDate('Europe/London');