### Need to do

Add a $lookup to get the username for the specific forum page to display it with the original topic... or... add the username to the topic. The latter would mean more would need to happen when a user changes their username.

Figure out a new message board solution that can have our old board imported into it. (in progress)

Add a WYSIWYG that will be used for message board posting. (I think it'll need to be able to output html instead of block content)

Add a "to top" button to all pages.

Style the "To main content" link.

Write tests for all components in /components.

Figure out how to get the homepage test working in jest.

Add news items to sanity.io.

Add file downloads to sanity.io.

Write schema validations for all MongoDB collections. (in progress)

Add a transition effect for the TopInfo component when it's being closed.

Add a next-id (or nextId) collection in MongoDB.

Figure out an admin way to add users and forums.

Figure out MongoDB transactions since several fields are embedded.

Add link (and maybe unlink) buttons to TiptapEditor. Also color?

Figure out a way to break up topics and replies so only X number of them show up per page.

---

### Done

Get the forgot username/password links working. (done, but required a lot of testing)

Should the SignInMini include links for users who have forgotten their login info. (Done in the SignIn component) I removed the SignInMini component from use because I reworked the way authenticated pages work.

Make the TopInfo, Authbar and Footer components not be full width.

Change over the directory and profile pages to the new authentication system.

Save the structure of the SignIn component to my component library as a possible dropdown menu.

Update managers in sanity.io. (I have a good flow for how to move the existing MySQL manager data to sanity. "/docs/directory.md")

Update events in sanity.io. (I have a good flow for how to move the existing MySQL manager data to sanity. "/docs/events.md")

Come up with a working way of filtering out duplicate homepage news item (in case a new item was added while someone was loading more)

Upgrade the mongodb driver from v3.6.6 to v4.3.1 (or higher)
