/*
  XENON
    - ResponseBuilder Main Program
    - Uses the express response object to send back consistent information to the client side based on params provided
  XENON
 */

export const buildResponse = (res, json, status = 401, params) => {
  // Check if there is a res object that has been passed through
  if(!res) {
    return 'No response object found'
  }

  // Check if param body has been passed through. If not, send back empty response.
  if(!params) {
    res.send()
  }

  // Destructure params and get the success and message variables
  const {
    success,
    message
  } = params

  // Check if success and message exists
  if(!success || !message) {
    return 'Could not find the success and message variables'
  }

  // Build response based on the parameters
  if(!json) {
    return res
      .status(status)
      .send({
        success,
        message
      })
  } else {
    return res
      .status(status)
      .json({
        success,
        message
      })
  }
}
