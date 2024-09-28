const today = new Date();

// Get individual components
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
const day = String(today.getDate()).padStart(2, '0');
const hours = String(today.getHours()).padStart(2, '0');
const minutes = String(today.getMinutes()).padStart(2, '0');
const seconds = String(today.getSeconds()).padStart(2, '0');

// Format the date without spaces, slashes, or colons
export const formattedDate = `${year}${month}${day}${hours}${minutes}${seconds}`;

