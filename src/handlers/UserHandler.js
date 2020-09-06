const validateUser = (user) => {
    const errors = {
        errorsList: []
    };

    if (!user.firstName) {
        errors.firstName = {
            text: 'First name must be entered'
        };

        errors.errorsList.push({text: 'First name must be entered', href: '#first-name'});
    }

    if (!user.lastName) {
        errors.lastName = {
            text: 'Last name must be entered'
        };

        errors.errorsList.push({text: 'Last name must be entered', href: '#last-name'});
    }

    if (!user.email) {
        errors.email = {
            text: 'Email must be entered'
        };

        errors.errorsList.push({text: 'Email must be entered', href: '#email'});
    }    

    if (!user.contact) {
        errors.contact = {
            text: 'Contact number must be entered'
        };

        errors.errorsList.push({text: 'Contact number must be entered', href: '#contact-number'});
    }
    return errors;
}

module.exports = {
    validateUser
}