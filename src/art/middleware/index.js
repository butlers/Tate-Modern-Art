
/*
    Here is where I would store multiple import/exports for different types of middleware
    Examples of different middleware I would think to be useful are:
    - rate limmiting middleware to throttle certain requests
    - schema validation middleware to ensure only veririfed fields are sent to our API for POST/PUT requests
    - restricting certain endpoints to only execute when passed in a valid api key
*/

const { wrapAsyncFunction } = require('./wrapAsyncFunction');


module.exports.wrapAsyncFunction = wrapAsyncFunction;
