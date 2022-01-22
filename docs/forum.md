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

### Switching over from MySQL to MongoDB

As of 2022-01-22, this is what the message forum contains:

463 topics
3698 posts
82 users (though many are bots and other not real users)
36 other users do not have access level 2 (meaning they are legit and the other 46 are not)

Queries to get the data:

```sql
SELECT f.forum_id, f.forum_name, t.topic_id, t.topic_title, p.post_id, p.post_subject, u.user_id, u.username 
FROM phpbb_topics AS t INNER JOIN phpbb_posts AS p USING (`topic_id`) INNER JOIN phpbb_forums AS f ON t.forum_id=f.forum_id INNER JOIN phpbb_users AS u ON u.user_id=p.poster_id 
ORDER BY t.topic_title ASC 
LIMIT 10000;
```

---

### MongoDB schema

-   Each forum should contain a property for the number of topics, posts and details of the last post (subject, username and date/time) in that forum.
