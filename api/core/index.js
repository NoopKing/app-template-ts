import api from 'lambda-api'
const server = api()

// Define a route that handles POST requests
server.post('/', async (req, res) => {
  // Access dynamic values from the request body
  const value1 = req.body?.cc

  return { value: value1 };
});

// Declare your Lambda handler
export async function handler (event, context)  {
  // Run the request
  return await server.run(event, context);
};

