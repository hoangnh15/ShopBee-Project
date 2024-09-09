var Product = require('./dbmongo'); // Ensure this is correctly exporting a Mongoose model
var mongoose = require('mongoose');
mongoose.connect("mongodb+srv://shopbee:shopbee@shopbee.9jkd5.mongodb.net/")
  .then(() => {
      console.log("Connected to MongoDB");
  })
  .catch((err) => {
      console.log("Error connecting to MongoDB", err);
  });

var product = [
    new Product({
        origin: 'China',
        year: 2023,
        warranty_period: 12,
        size: '160.9 x 77.8 x 7.8 mm',
        weight: 201,
        material: 'aluminum',
        status: 'new',
    }),
    new Product({
        origin: 'Việt Nam',
        year: 2024,
        warranty_period: 2,
        size: '146.3 x 70.9 x 7.6 mm',
        weight: 168,
        material: 'steel',
        status: 'new',
    }),
];

async function saveProducts() {
    try {
        for (let i = 0; i < product.length; i++) {
            await product[i].save();
        }
        console.log('Done');
        mongoose.connection.close(); // Closing connection after saving all products
    } catch (err) {
        console.log('Error saving products:', err);
    }
}

saveProducts();