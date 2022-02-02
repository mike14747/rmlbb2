### When someone adds a new topic

What needs to been changed in MongoDB when someone adds a new topic:

-   Increment that users **posts** total.
-   Increment that forums **topics** and **posts** totals.

---

### Topics vs Posts Totals in a Forum

Topics are the total number of new topics in a forum.

Posts are the total number of posts in a forum... which includes:

-   New topics
-   Replies to topics

Posts in kind of a combining of topics and replies.

Examples:

-   If a forum has 10 topics with no replies to any of them, they will be shown as 10 topics and 10 posts.
-   If a forum has 10 topics with 20 total replies to them, they will be shown as 10 topics and 30 posts.
-   If a forum has 1 topic with 100 replies to any of them, they will be shown as 1 topic and 101 posts.

---
