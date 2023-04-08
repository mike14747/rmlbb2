import { getMostRecentPostsForHomepage } from '@/lib/api/forum';

import sidebarStyles from '@/styles/Sidebar.module.css';

export const revalidate = 600;

export default async function BoardSidebarContent() {
    const recentPostsData = await getMostRecentPostsForHomepage();

    if (!recentPostsData) return <p className="error">An error occurred fetching data.</p>;

    if (recentPostsData.length === 0) return (
        <>
            <p>There are no recent posts to display.</p>
            <p>Check back again soon.</p>
        </>
    );

    return (
        <>
            {recentPostsData.map((post, index) => (
                <div className={sidebarStyles.recentPost} key={index}>
                    <p className={sidebarStyles.recentDate}><small>Date: </small>{post.dateStr}</p>
                    <p><small>Forum: </small>{post.forumName}</p>
                    <p><small>Author: </small>{post.username}</p>
                    <p><small>Topic: </small>{post.title}</p>
                    <p><small>Content: </small>{post.content}</p>
                </div>
            ))}
        </>
    );
}
