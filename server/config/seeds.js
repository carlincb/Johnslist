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
    const products = await Product.insertMany([
        {
            name: 'Broken Bench',
            image: '/images/seed-images/broken-bench.png',
            description: 'A broken bench that is green. Can be used as firewood or in a wood project.',
            price: 35.00,
            category: {
                name: 'Outdoor'
            }
        },
        {
            name: 'Worn Dining Chair',
            image: '/images/seed-images/worn-chair.png',
            description: 'A worn chair that appears to have originally had leather as it\'s fabric.',
            price: 10.00,
            category: {
                name: 'Household'
            }    
        },
        {
            name: 'Broken Desk',
            image: '/images/seed-images/broken-desk.png',
            description: 'This will bring back memories of highschool. Hopefully you don\'t get hurt when you sit.',
            price: 5.64,
            category: {
                name: 'Miscellaneous'
            }
        },
        {
            name: 'Broken Jar',
            images: '/images/seed-images/broken-jar.png',
            description: 'It might not hold liquid or pickles but you can find some use.',
            price: 0.45,
            category: {
                name: 'Collectible'
            }
        }
    ]);
    // /* remove the front comment '//' to get rid of this seed data if you forked this project

    process.exit();
});