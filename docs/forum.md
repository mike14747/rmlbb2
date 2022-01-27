### Authentication

Sign in and Sign out via the normal website auth system.

---

### Data Modeling

-   There can be N Topics
-   A Topic can have N Comments.

---

### Authorization

-
-   Authenticated (Logged-in) users can read all Topics and Comments.
-   Authenticated (Logged-in) users can create a new Topic and leave a Comment in any Topic.
-   Authenticated (Logged-in) users can only update or delete their own Topics or Comments.

---

### Application UI

-   List Topics
-   View Topics with Comments
-   Add and delete records (Topic, Comment)

---

### Wish list items

-   Add support for drafts (saving your work before you post your message)
-   Add a way to preview your post before submitting it. I'm not sure this would be necessary depending upon the WYSIWYG I settle on.
-   Support for a Moderator group that can read, update, and delete all Topics and Comments in a certain form... even those of others.
-   Find a way to search posts.

---

### MongoDB schema

**Forums collection.**

-   \_id (the MongoDB ObjectId)
-   name
-   active (a boolean)
-   order (a number that will be the order it will appear in the forums list)
-   topics (total number of topics in that forum)
-   posts (total number of posts in that forum)
-   lastPost (details of the last post in that forum)
    -   topic
    -   \_id (topic id)
    -   userId or username ???
    -   dateTime (date and time)

**Topics collection.**

-   \_id (the MongoDB ObjectId)
-   topic
-   content
-   forum \_id
-   user \_id
-   replies (number)
-   views (number)

Users collection:

-   \_id (the MongoDB ObjectId)
-   username
-   password (hashed with bcryptjs)
-   email
-   resetPasswordEXpires (will only be present if a user submits a forgotten password request)
-   resetPasswordToken (will only be present if a user submits a forgotten password request)
-   role (user, admin, maybe more in the future)
-   active (a boolean that will be set to false when a manager leaves the league, but we still want to keep their posts)
-   registeredDate
-   posts (??? not sure if this should be stored)

---

### Switching over from MySQL to MongoDB

As of 2022-01-22, this is what the message forum contains:

463 topics
3698 posts
82 users (though many are bots and other not real users)
36 other users do not have access level 2 (meaning they are legit and the other 46 are not)

**Queries to get the data:**

User table notes:

-   There are 11 posts (although listed as having 16) made by user_id 1 (username: anonymous). The username associated with those posts is the Yankees. I'll have to get those integrated into the data.
-   Anonymous (user_id 1) is the only user_type of 2 (generally the bots type) that has made any posts. It seems like the easy fix for this to change the username of user_id 1 from anonymous to Yankees.

```sql
UPDATE phpbb_users SET user_type=1, username='Yankees', username_clean='yankees' WHERE user_id=1
```

Get all the user info:

```sql
SELECT u.user_id, u.username, u.user_email, u.user_regdate, COUNT(p.post_id) AS total_posts
FROM phpbb_users AS u INNER JOIN phpbb_posts AS p ON u.user_id=p.poster_id
WHERE user_type!=2
GROUP BY u.user_id
ORDER BY u.user_id ASC;
```

-   Change my "username" from "blaze" to "Blaze".
-   After getting all users, I'll need to manually add a "role" property to each. Everyone except myself will get a role of "user", while I'll get a role of "admin".
-   Delete the "admin" user.

user_types in phpbb:

-   0: regular, active user
-   1: inactive user
-   2: bots / crawlers
-   3: admin

Get all the topics:

```sql
SELECT t.topic_id, t.topic_title, t.topic_first_post_id AS post_id, t.topic_poster AS user_id, t.topic_first_poster_name AS username, t.topic_time, t.topic_views 
FROM phpbb_topics AS t
ORDER BY t.topic_id ASC
LIMIT 2000;
```

Get all the posts:

```sql
SELECT p.post_id, p.post_subject, p.post_time, p.post_text, f.forum_id, f.forum_name, u.user_id, u.username, t.topic_id 
FROM phpbb_posts AS p INNER JOIN phpbb_forums AS f USING (`forum_id`) INNER JOIN phpbb_users AS u ON p.poster_id=u.user_id INNER JOIN phpbb_topics AS t USING (`topic_id`) 
ORDER BY p.post_id ASC
LIMIT 5000;
```

Get all the forum info:

```sql
SELECT f.forum_id, f.forum_name, f.left_id AS `order`, f.forum_last_post_id, f.forum_last_poster_id AS user_id, f.forum_last_poster_name AS username, f.forum_last_post_subject, f.forum_last_post_time, f.forum_topics_approved AS topics, f.forum_posts_approved AS posts 
FROM phpbb_forums AS f
ORDER BY f.forum_id ASC
LIMIT 100;
```

---

publishedAt: { type: Date, default: Date.now() }

```js
{
  $jsonSchema: {
    title: "users",
    description: "Users for all protected pages of rmlbb.com",
    bsonType: "object",
    required: ["_id", "username", "password", "email"],
    properties: {
      _id: {
        bsonType: "objectId"
      },
      username: {
        bsonType: "string",
        minLength: 6,
        maxLength: 15,
        description: "Must be a string from 6 to 15 characters in length and is required"
      },
      password: {
        bsonType: "string",
        minLength: 60,
        maxLength: 60,
        description: "The hashed version must be a string, 60 characters in length and is required"
      },
      email: {
        bsonType: "string"
      },
      role: {
        bsonType: "string",
        enum: ["user", "admin"]
      },
      posts: {
        bsonType: "number"
      },
      resetPasswordEXpires: {
        bsonType: "date"
      }
    },
    additionalProperties: true
  }
}
```
