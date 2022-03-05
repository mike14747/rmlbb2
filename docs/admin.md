### Add new user flow chart

Enter username, password, email, active (default is true)... checking that each is valid.

There should also be a checkbox for whether an automated email should be sent to the new user (unchecked by default). If the new user in not active, this checkbox should be unchecked and grayed out.

The password will need to be salted/hashed before it goes into the database.

The new user will be added to MongoDB. If that is successful, the following should happen:

If the automated email is checked, an email will need to be sent to the new user with their credentials (username, unhashed password and email). The email should say something like:

```text
A new user account has been setup for you at https://rmlbb.com with the following credentials:

Username: ~username
Password: ~password
Email: ~email

Once you login, you should change your password immediately.

You can also change your username and/or email if you'd like.
```

---
