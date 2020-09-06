const userFields = [
    "ID",
    "First Name",
    "Last Name",
    "Email",
    "Contact Number"
];

const formatData = (users) => {
    
    const formattedUsers = users.map(user => {
        return formatUser(user);
    });

    const response = [
        userFields,
        ...formattedUsers
    ].join('\n');

    return response;
}

const formatField = (field) => {
    return '"' + field + '"';
}

const formatFieldWithComma = (field) => {
    return '"' + field + '",';
}

const formatUser = (user) => {
    let output = "";
    output += formatFieldWithComma(user._id);
    output += formatFieldWithComma(user.firstName);
    output += formatFieldWithComma(user.lastName);
    output += formatFieldWithComma(user.email);
    output += formatField(user.contact);

    return output;
}

module.exports = {
    formatData
}