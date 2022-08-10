### Need to do

Figure out a new message board solution that can have our old board imported into it. (in progress)

Add a WYSIWYG that will be used for message board posting. (in progress)

Write tests for all components in /components.

Figure out how to get the homepage test working in jest.

Add news items to sanity.io.

Add file downloads to sanity.io.

Add a transition effect for the TopInfo component when it's being closed.

Add 'link' (and maybe 'unlink') buttons to TiptapEditor. Also color and size?

Figure out a way to break up topics and replies so only X number of them show up per page.

Make an admin page to edit forums (specifically to change their active status). This will require a transaction in the serverless function because the active status will need to apply to all topics and replies within tha forum. This is done (you can edit the forum name and active status), but I need to update the regex for the forum name to allow for things like " / " to be part of a forum name.

Is there a way to merge some/most/all of the FormInput components into one?

Change the http POST methods to PUT on pages/routes that edit content.

---

### Done

Get the forgot username/password links working. (done, but required a lot of testing)

Should the SignInMini include links for users who have forgotten their login info. (Done in the SignIn component) I removed the SignInMini component from use because I reworked the way authenticated pages work.

Make the TopInfo, Authbar and Footer components not be full width.

Change over the directory and profile pages to the new authentication system.

Save the structure of the SignIn component to my component library as a possible dropdown menu. (it's been saved there)

Update managers in sanity.io. (I have a good flow for how to move the existing MySQL manager data to sanity. "/docs/directory.md")

Update events in sanity.io. (I have a good flow for how to move the existing MySQL manager data to sanity. "/docs/events.md")

Come up with a working way of filtering out duplicate homepage news item (in case a new item was added while someone was loading more)

Upgrade the mongodb driver from v3.6.6 to v4.3.1 (or higher)

Add a $lookup to get the username for the specific forum page to display it with the original topic... or... add the username to the topic. The latter would mean more would need to happen when a user changes their username. (I did the latter)

Style the "To main content" link. (it's a basic, but acceptable style)

Add a next-id (or nextId) collection in MongoDB. (the collection is named 'counters')

Figure out MongoDB transactions since several fields are embedded.

Add a check in the user serverless function to make sure the reset token is not expired.

Figure out an admin way to add users and forums.

Write schema validations for all MongoDB collections.

Upgrade next.js to v12.

Get a topic showing up on the [topicId] page.

Add a collection for the most recent 5 posts. (I ended up not doing this... instead I added a couple fields to the replies collection documents and wrote an aggregation to get them)

Add a "to top" button to all pages.

Reconcile the difference between the topic title max length between the FormInputForTopicTitle component (50) and MongoDB validation (100). (settled on 50 for all references to topic title and reply subject)

Get a topic showing up on the [topicId] page.
