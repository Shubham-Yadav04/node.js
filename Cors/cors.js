const cors= require('cors')

// To enable CORS (Cross-Origin Resource Sharing) in an Express.js application, you can use the cors middleware. CORS is a security feature implemented by web browsers to restrict cross-origin HTTP requests from being executed unless the server explicitly allows them.


// How cors() Works
// The cors() middleware adds the necessary HTTP headers to your responses, allowing browsers to bypass the same-origin policy. By default, it enables all origins to access your resources.


// Defining the property in a CORS object 
const corsOptions = {
    origin: ['http://localhost:3000', 'http://example.com'], // Allow multiple origins
    methods: ['GET', 'POST'], // Allow only GET and POST requests
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
    credentials: true, // Allow cookies and authorization headers
    exposedHeaders: ['X-Custom-Header'], // Expose specific headers to the client
    maxAge: 3600, // Cache preflight request for 1 hour
    optionsSuccessStatus: 200 // Use 200 status for OPTIONS requests
};


// Enable CORS with the specified options
app.use(cors(corsOptions));
