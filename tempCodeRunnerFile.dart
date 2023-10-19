function formatDateAndTime(date) {
  // Extract date components
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are 0-indexed
  const year = date.getFullYear() % 100; // Get the last two digits of the year

  // Format the date components as DD-MM-YY
  const formattedDate = `${day}-${month}-${year < 10 ? `0${year}` : year}`;

  // Extract time components
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  
  // Convert hours to 12-hour format
  hours = hours % 12;
  hours = hours || 12; // Handle midnight (0 hours)

  // Format the time components as HH:MM AM/PM
  const formattedTime = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`;

  // Concatenate date and time
  const concatenatedDateTime = `${formattedDate} ${formattedTime}`;

  return concatenatedDateTime;
}

const now = new Date(); // Create a Date object for the current date and time
const formattedDateTime = formatDateAndTime(now);

console.log(formattedDateTime);
