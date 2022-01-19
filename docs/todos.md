Get the forgot username/password links working. (in progress)

Figure out a new message board solution that can have our old board imported into it.

Add a WYSIWYG that will be used for message board posting.

Add a "to top" button to all pages.

Figure out how to get the homepage test working in jest.

Fix the positioning of messages when you make a forgotten username or password request.

In the SignIn and SignInMini (should the SignInMini include it?) components, there needs to be a couple of links for users who have forgotten their login info. (Done in the SignIn component)

1.  One link for users who don't know their username.
    -   This link will ask a user to enter their email address.
    -   The username associated with that email address will be sent to that email address.
2.  Another link for users who don't know their password.
    -   This link will ask a user to enter their email address.
    -   An email will be sent to the entered email address with a link to change their current password.

Make sure nodemailer is working for forgotten username/password requests from users. (Done)

Figure out how to get the reset password link working in emails sent to users. (Done)

Added news items to sanity.io.

Add file downloads to sanity.io.
