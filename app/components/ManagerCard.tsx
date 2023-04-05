import parse from 'html-react-parser';
import { ManagerObj } from '@/types/manager-types';

import styles from '@/styles/ManagerCard.module.css';

export default function ManagerCard({ manager }: { manager: ManagerObj}) {
    if (!manager) return (
        <div className={`${styles.card} ${styles.notSpecifiedCard}`}>
            <p className="error">
                No data found for this manager.
            </p>
        </div>
    );

    const conference = /^american|national$/i.test(manager.conference[0]) ? manager.conference[0].toLowerCase() : 'notSpecified';

    function parseManagers(managers: ManagerObj & { [key: string]: string | number | [] }) {
        let jsxStr = '';
        for (let i = 1; i <= 2; i++) {
            jsxStr += '<div className=' + styles.manager + '>';
            if (managers[`description${i}`]) jsxStr += '<p className=' + styles.description + '>' + managers[`description${i}`] + '</p>';
            if (managers[`manager${i}`]) jsxStr += '<p>' + managers[`manager${i}`] + '</p>';
            if (managers[`address${i}a`]) jsxStr += '<p className=' + styles.small + '>' + managers[`address${i}a`] + '</p>';
            if (managers[`address${i}b`]) jsxStr += '<p className=' + styles.small + '>' + managers[`address${i}b`] + '</p>';
            if (managers[`city${i}`] || managers[`state${i}`] || managers[`country${i}`] || managers[`zip${i}`]) {
                jsxStr += '<p className=' + styles.small + '>';
                if (managers[`city${i}`]) jsxStr += managers[`city${i}`];
                if (managers[`city${i}`] && managers[`state${i}`]) jsxStr += ', ';
                if (managers[`state${i}`]) jsxStr += managers[`state${i}`];
                if ((managers[`city${i}`] || managers[`state${i}`]) && managers[`country${i}`]) jsxStr += ' ';
                if (managers[`country${i}`]) jsxStr += managers[`country${i}`];
                if ((managers[`city${i}`] || managers[`state${i}`] || managers[`country${i}`]) && managers[`zip${i}`]) jsxStr += ' ';
                if (managers[`zip${i}`]) jsxStr += managers[`zip${i}`];
                jsxStr += '</p>';
            }
            if (managers[`phone${i}a`]) jsxStr += '<p>' + managers[`phone${i}a`] + '</p>';
            if (managers[`phone${i}b`]) jsxStr += '<p>' + managers[`phone${i}b`] + '</p>';
            if (managers[`email${i}a`]) jsxStr += '<p><a href="mailto:' + managers[`email${i}a`] + '">' + managers[`email${i}a`] + '</a></p>';
            if (managers[`email${i}b`]) jsxStr += '<p><a href="mailto:' + managers[`email${i}b`] + '">' + managers[`email${i}b`] + '</a></p>';
            jsxStr += '</div>';
        }
        return jsxStr;
    }

    return (
        <div className={`${styles.card} ${styles[conference + 'Card']}`}>
            {manager.team &&
                <div className={`${styles.heading} ${styles[conference + 'Heading']}`}>
                    <h5>
                        {manager.team}
                        <span className={styles.abbrev}>
                            ({manager.abbreviation})
                        </span>
                    </h5>
                </div>
            }

            <div className={styles.body}>
                {parse(parseManagers(manager))}
            </div>

            <div className={styles.footing}>
                <p>
                    {manager.conference[0]} Conference {manager.division[0]}
                </p>
            </div>
        </div>
    );
}
