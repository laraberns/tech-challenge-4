const User = require('./models/user');

(async () => {

    const database = require('./db')
    await database.sync()

    try {
        // Create a user
        const newUser = await User.create({
            email: 'test2@example.com',
            password: 'password1233',
            type: 'client'
        });
        
        console.log('User created:', newUser.toJSON());
    } catch (error) {
        console.error('Error creating user:', error);
    }
})();
