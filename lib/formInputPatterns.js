/* eslint-disable no-useless-escape */
// eslint-disable-next-line quotes
// const forumNamePattern = "^(?=.{1,25}$)[a-zA-Z0-9]+(?:[/' _-][a-zA-Z0-9]+)*$";
// eslint-disable-next-line quotes
const forumNamePattern = "[a-zA-Z0-9/' _-]{1,25}";
const forumNameErrorMsg = 'Forum name must be from 1 to 25 characters in length and not include any special characters other than forward slashes, apostrophes, dashes, spaces and underscores (but only 1 can be used consecutively). Must start and end with a letter or number.';

// eslint-disable-next-line quotes
const usernamePattern = "^(?=.{4,15}$)[a-zA-Z0-9]+(?:[ _-][a-zA-Z0-9]+)*$";
const usernameErrorMsg = 'Username must be from 4 to 15 characters in length and not include any special characters other than dashes, spaces and underscores (but only 1 can be used consecutively). Must start and end with a letter or number.';

// eslint-disable-next-line quotes
const passwordPattern = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]{8,20}$";
const passwordErrorMsg = 'Password must be from 8 to 20 characters in length.';
const repeatPassordErrorMsg = 'Passwords do not match.';

// eslint-disable-next-line quotes
const emailPattern = "^(?:[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]){1,64}@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$";
const emailErrorMsg = 'Please enter a valid email address.';

module.exports = {
    forumNamePattern,
    forumNameErrorMsg,
    usernamePattern,
    usernameErrorMsg,
    passwordPattern,
    passwordErrorMsg,
    repeatPassordErrorMsg,
    emailPattern,
    emailErrorMsg,
};
