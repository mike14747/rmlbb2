# rmlbb2

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=f5f5f5 'Next.js')
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=000000 'JavaScript')
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=ffffff 'HTML5')
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=f5f5f5 'CSS3')
![Jest](https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=f5f5f5 'Jest')
![Testing Library](https://img.shields.io/badge/Testing%20Library-E33332?style=flat-square&logo=testinglibrary&logoColor=ffffff 'Testing Library')
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=f5f5f5 'Vercel')
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=ffffff 'MongoDB')
![Sanity.io](https://img.shields.io/badge/S-Sanity.io-000000.svg?style=flat-square&colorA=F03E2F 'Sanity.io')
![Node](https://img.shields.io/badge/Node-339933?style=flat-square&logo=nodedotjs&logoColor=ffffff 'Node')
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=f5f5f5 'ESLint')
![SVG](https://img.shields.io/badge/SVG-FFB13B?style=flat-square&logo=svg&logoColor=ffffff 'SVG')
![NextAuth](https://img.shields.io/badge/N-NextAuth-7C14D7.svg?style=flat-square&colorA=1BAFEF 'NextAuth')

---

### What is rmlbb2?

-   The new web app for the fantasy baseball league, the RML.
-   It will soon be replacing the original website that was long ago built in PHP, using 2 MySQL databases (one for the main website and one for the Message Forum) and hosted on a CPanel web host.

---

### Features

-   Built with Next.js and hosted on Vercel.
-   Uses NextAuth for user authentication and authorization.
-   Users can change their username, password and email from their profile page.
-   Users can also submit for a lost username and receive an email to the email associated with their account via NodeMailer with their username.
-   Users can also submit for a lost password and receive an email with a token (which expires in an hour) and a link to reset their password.
-   File downloads.
-   Private message forum (which was custom built from the ground up).
-   Private member directory.
-   The public pages are nearly all SSG pages. The private pages are static pages that use client-side hydration... which happens upon authenticated.
-   MongoDB (via Atlas) is the data storage solution for the message forum and user data.
-   Sanity.io CMS is used for the rest of the data. The Sanity dashboard is great for easily updating website content. It was broken up into 3 separate Sanity projects. The free plan at Sanity doesn't allow for having public content mixed with private content in the same project.
    -   The first is for the public website data (block content for several pages, upcoming events list, app settings, etc).
    -   The second is for the public file downloads.
    -   The third is a private project for accessing the secure manager directory information.

---

### Challenges with creating this app

The biggest challenges revolved around converting the old MySQL database data into forms suitable for use in MongoDB and Sanity.io CMS.

In fact, I created another app for the sole purpose of that data conversion. The conversion app was an Express server (backend-only) that accessed the MySQL data and converted it over to MongoDB _bson_ files and Sanity.io _ndjson_ files via numerous api routes and server functions.

Accessing and converting the PHPBB message board data was the trickiest data conversion. That database had information sprawled over 68 tables and 597 columns. Properly retrieving the necessary data via joins was only part of the problem.

The other part was in the way the PHPBB database stored the text content from all the message posts. It was stored in HTML, but in a special implementation of HTML... called BBCode. It had to be converted into regular HTML via more server functions.

The conversion app is in a private repo because it accesses private API data, but I can show the inner workings of it as needed.

The other huge challenge in building this app was creating my own private message forum from scratch. You must be logged in to not only make posts, but also to view the posts.

I ended up using _react-draft-wysiwyg_ to handle the user posts. The output is saved as HTML and uploaded to MongoDB.

---

### How you can use this project?

-   Clone the GitHub repo.
-   Install the necessary npm packages.

```bash
npm i
```

Include these **environmental variable** in your .env file:

```txt
MONGODB_URI=MONGODB_URI=remote_mongodb
MONGODB_DB=db_name
# ----------
SANITY_PUBLIC_QUERY_URL=<url>
SANITY_PUBLIC_MUTATION_URL=<url>
SANITY_PUBLIC_API_TOKEN=<token>
# ----------
SANITY_PRIVATE_QUERY_URL=<url>
SANITY_API_TOKEN=<token>
# ----------
SANITY_PRIVATE_MUTATION_URL=<url>
SANITY_PRIVATE_API_TOKEN=<token>
# ----------
NEXT_PUBLIC_BASE_FILE_QUERY_URL=<url>
NEXT_PUBLIC_BASE_FILE_DOWNLOAD_URL=<url>
# ----------
NEXTAUTH_URL=http://localhost:3000
JWT_SIGNING_PRIVATE_KEY=<key>
JWT_SECRET=<secret>
# ----------
NO_REPLY_EMAIL=<email>
NO_REPLY_EMAIL_PASSWORD=<password>
BASE_URL=http://localhost:3000
# ----------
INITIAL_NEWS_ITEMS=20
NEWS_ITEMS_INCREMENT=50
# ----------
```

The difficult part about using this project yourself is in setting up the remote data sources (MongoDB and Sanity.io.).

Both require very specific collections and schemas so the app can access them.

---

![rmlbb2](project_name.svg 'rmlbb2')
![by Mike Gullo](author.svg 'by Mike Gullo')

-   Live version: https://rmlbb2.vercel.app
-   This project's github repo: https://github.com/mike14747/rmlbb2
-   Me on github: https://github.com/mike14747
-   Contact me at: mgullo.dev@gmail.com

![GitHub last commit](https://img.shields.io/github/last-commit/mike14747/rmlbb2?style=for-the-badge)
