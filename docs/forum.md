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

Forums collection. Each forum should contain a property for:

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

Topics collection:

-   Each topic should contain a property for the number of replies (and possibly even views) each has.

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

Get all the posts:

```sql
SELECT f.forum_id, f.forum_name, t.topic_poster, t.topic_id, t.topic_title, p.post_id, p.post_subject, p.post_time, u.user_id, u.username
FROM phpbb_topics AS t INNER JOIN phpbb_posts AS p USING (`topic_id`) INNER JOIN phpbb_forums AS f ON t.forum_id=f.forum_id INNER JOIN phpbb_users AS u ON u.user_id=p.poster_id
ORDER BY t.topic_title ASC
LIMIT 10000;
```

Get all the forum info:

```sql

```

---
