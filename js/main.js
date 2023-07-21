/**
 * Interval which the clock will be updated (in milliseconds).
 */
 const clockInterval = 100;

 /**
  * Search engine query url
  */
 const searchEngineUrl = 'https://duckduckgo.com/?q=';
 
 const tabKeyCode = 9;
 const enterKeyCode = 13;
 const escapeKeyCode = 27;
 const searchBarElement = document.getElementById('search-bar');
 const clockElement = document.getElementById('clock');
 const formElement = document.getElementById('search-form');
 const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
 /**
  * Return a string containing the formatted current date and time.
  */
 function getDateTime() {
 
     const dateTime = new Date();
     let m = dateTime.getMonth();
     let day = dateTime.getDate();
     let month = monthName[m];
     let hour = dateTime.getHours();
     let minutes = dateTime.getMinutes();
     let seconds = dateTime.getSeconds();
 
     if (hour < 0) {
         hour = 24 + hour;
     }
 
     let date = (day) + ' ' + (month) + ' ' + dateTime.getFullYear();
     let time = (hour < 10 ? '0' + hour : hour) + ':' + (minutes < 10 ? '0' + minutes : minutes);
 
     return date + '\n' + time;
 }
 
 function setClock() {
     clockElement.innerText = getDateTime();
 }
 
 function search() {
     let value = searchBarElement.value;
     if (!value) {
         return;
     }
 
     if (value.startsWith('https://') || value.startsWith('http://')) {
         window.location = value;
     } else {
         window.location = searchEngineUrl + encodeURIComponent(value);
     }
 }
 
 
 setClock();
 
 setInterval(() => {
     setClock();
 }, clockInterval);
 
 searchBarElement.focus();
 searchBarElement.value = '';
 
 formElement.addEventListener('submit', (ev) => {
     ev.preventDefault();
     search();
 });
 
 document.addEventListener('keypress', (event) => {
     if (event.keyCode == escapeKeyCode) {
         searchBarElement.blur();
         searchBarElement.value = '';
     } else if (event.keyCode != tabKeyCode && event.keyCode != enterKeyCode) {
         searchBarElement.focus();
     }
 });

/**
chatgpt clock
**/

function updateTime() {
    const currentTime = new Date();
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');

    // Format time as military time (24-hour format)
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');

    // Format date as "day Month Year" (e.g., 21 July 2023)
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = currentTime.toLocaleDateString('en-US', options);

    // Display time and date
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    dateElement.textContent = formattedDate;
}

// Update time every second
setInterval(updateTime, 1000);

// Initial call to display the time immediately
updateTime();


