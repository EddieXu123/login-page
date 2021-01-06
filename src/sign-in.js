const User = require('../../../databases/UserSchema');

module.exports = (app) => {
    /*
    Signup
    */

    app.post('/api/account/signup', (req, res, next) => {
        const { body } = req;
        const { 
            name,
            email,
            password
        } = body;

        if (!name) {
            return res.send({
                success: false,
                message: 'Error: First name missing'
            });
        }

        if (!email) {
            return res.send({
                success: false,
                message: 'Error: email missing'
            });
        }

        if (!password) {
            return res.send({
                success: false,
                message: 'Error: password missing'
            });
        }

        email = email.toLowerCase();

        // Steps:
        // 1. Verify email doesn't exist
        // 2. Save
        User.find({
            email: email
        }, (err, previousUsers) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
                
            } else if (previousUsers.length > 0) {
                return res.send({
                    success: false,
                    message: 'Error: Account already exists'
                });
            } else {
                const newUser = new User();
                newUser.email = email;
                newUser.name = name;
                newUser.password = newUser.generateHash(password);
                newUser.save((err, user) => {
                    if (err) {
                        return res.send({
                            success: false,
                            message: 'Error: Server error'
                        });
                    }

                    return res.send({
                        success: true,
                        message: 'Signed up'
                    });
                });
            }
        })


    });



}