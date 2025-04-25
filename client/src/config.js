// src/config.js

// const API_URI = 'https://expense-tracker-mu-six-78.vercel.app/'; // Replace with your actual API URI
const API_URI = import.meta.env.VITE_API_URI  // Default to localhost if not set

export default API_URI;
