const db = require('./connection');
const { Category, Product, User } = require('../models');

db.once('open', async () => {
    //Uncomment the below line to clear the current categories
    //const clearCategories = await Category.deleteMany();

    //This is the seeds for the category. Edit here to change the categories then run 'npm run seed' to add them.
    const categories = await Category.insertMany([
        { name: 'Household' },
        { name: 'Clothing' },
        { name: 'Outdoor' },
        { name: 'Collectible' },
        { name: 'Appliances' },
        { name: 'Miscellaneous'}
    ]);

    console.log('The categories have been seeded.'); 

    // /* remove the front comment '//' to get rid of this seed data if you forked this project

    // /* remove the front comment '//' to get rid of this seed data if you forked this project

    process.exit();
});