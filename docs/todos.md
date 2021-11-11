Add the ability for managers to edit their username, password and email... plus we need a forgot username/password link.

Figure out a new message board solution that can have our old board imported into it.

Add a "to top" button to all pages.

Figure out how to get the homepage test working in jest.

Profile page:

-   Display 2 of the 3 pieces of data associated with a user's profile (username and email address).
-   Provide a way for a user to update their username and email address... as well as their password... which isn't displayed on the page.
-   If they wish to update their password, they'll need to enter it twice.
-   I need to add input validation on all fields. Actually, I need to also come up with rules for username and password lengths and allowed characters.

In the SignIn and SignInMini components, there needs to be a couple of links for users who have forgotten their login info.

1.  One link for users who don't know their username.
    -   This link will ask a user to enter their email address.
    -   The username associated with that email address will be sent to that email address.
2.  Another link for users who don't know their password.
    -   This link will ask a user to enter their email address.
    -   An email will be sent to the entered email address with a link to change their current password.

Look into nodemailer to send email from the website... specifically for forgotten username/password requests from users.

Added news items to sanity.io.

Add file downloads to sanity.io.
