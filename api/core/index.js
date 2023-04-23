import api from 'lambda-api'
api()
// Define a route
api.get('/', async (req, res) => {
  return { status: 'ok' };
});

// Declare your Lambda handler
exports.handler = async (event, context) => {
  // Run the request
  return await api.run(event, context);
};;

