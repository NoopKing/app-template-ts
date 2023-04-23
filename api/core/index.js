import api from 'lambda-api'
const server = api()
// Define a route
server.get('/', async (req, res) => {
  return { status: 'ok' };
});

// Declare your Lambda handler
export async function handler (event, context)  {
  // Run the request
  return await server.run(event, context);
};;

