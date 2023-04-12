'use client';

import { ForumForEdit } from '@/types/forum-types';
import EditForumForm from './EditForumForm';

import styles from '@/styles/admin.module.css';

export default function EditForumList({ forumList }: { forumList: ForumForEdit[] }) {
    return (
        <>
            {forumList && forumList.length > 0 &&
                forumList.map(forum => (
                    <div key={forum._id} className={styles.editItem}>
                        <EditForumForm forum={forum} />
                    </div>
                ))
            }
        </>
    );
}
