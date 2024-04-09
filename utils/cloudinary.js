const cloudinary = require("cloudinary").v2;

cloudinary.config({ 
  cloud_name: 'dtmlfrdxm', 
  api_key: '396273762397521', 
  api_secret: '4KO54KkIrCuBOt0-D5WbC0fLjsQ' 
});

module.exports = cloudinary;
