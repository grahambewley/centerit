const baseUrl = process.env.NODE_ENV === "production" 
    ? 'https://centerit.dev'
    : 'http://localhost:3000';

export default baseUrl;