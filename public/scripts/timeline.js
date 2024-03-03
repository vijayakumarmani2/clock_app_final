document.addEventListener("DOMContentLoaded", function () {
    const timelineContainer = document.querySelector(".timeline1");
    // Remove events from localStorage


    const events = getEvents1(); // Assuming you have a function to retrieve events from local storag
  console.log("events",events);
    // Add events to the timelin
    addEventsToTimeline(timelineContainer, events);
  });
  
  function addEventsToTimeline(container, events) {
    for (const month of events) {
      const timelineMonth = document.createElement("div");
      timelineMonth.classList.add("timeline-upcomming-month");
  
      // Display the upcoming months dynamically
      timelineMonth.textContent = month.month;
  
      timelineMonth.appendChild(createEventsCountSpan(month.events.length));
      container.appendChild(timelineMonth);
  
      for (const event of month.events) {
        const timelineSection = document.createElement("div");
        timelineSection.classList.add("timeline-section");
  
        const timelineDate = document.createElement("div");
        timelineDate.classList.add("timeline-event-date");
        timelineDate.textContent = event.date;
        timelineSection.appendChild(timelineDate);
  
        const row = document.createElement("div");
        row.classList.add("row");
  
        const col = document.createElement("div");
        col.classList.add("col-sm-4");
  
        const timelineBox = document.createElement("div");
        timelineBox.classList.add("timeline-box");
  
        const boxEventTitle = document.createElement("div");
        boxEventTitle.classList.add("box-event-title");
        boxEventTitle.textContent = event.title;
  
        const boxEventContent = document.createElement("div");
        boxEventContent.classList.add("box-event-content");
  
        for (const key in event.details) {
          const boxEventItem = document.createElement("div");
          boxEventItem.classList.add("box-event-item");
          const strong = document.createElement("strong");
          strong.textContent = `${key}: `;
          const value = document.createTextNode(event.details[key]);
          boxEventItem.appendChild(strong);
          boxEventItem.appendChild(value);
          boxEventContent.appendChild(boxEventItem);
        }
  
        timelineBox.appendChild(boxEventTitle);
        timelineBox.appendChild(boxEventContent);
        col.appendChild(timelineBox);
        row.appendChild(col);
        timelineSection.appendChild(row);
  
        container.appendChild(timelineSection);
      }
    }
  }
  
  function createEventsCountSpan(count) {
    const span = document.createElement("span");
    span.textContent = `${count} ${count === 1 ? "Event" : "Events"}`;
    return span;
  }
  
  function getEvents1() {
    // Retrieve events from local storage
    const storedEvents = localStorage.getItem("events");
    // Parse the JSON string or initialize an empty array if null
    return storedEvents ? JSON.parse(storedEvents) : [];
  }
  