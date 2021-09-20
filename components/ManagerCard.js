import PropTypes from 'prop-types';

import styles from '../styles/ManagerCard.module.css';

export default function ManagerCard({ manager }) {
    return (
        <div className={`${styles.card} ${manager.conference[0] === 'American' ? styles.americanCard : styles.nationalCard}`}>
            <div className={`${styles.heading} ${manager.conference[0] === 'American' ? styles.americanHeading : styles.nationalHeading}`}>
                <h5>
                    {manager?.team}
                    <span className={styles.abbrev}>
                        ({manager.abbreviation})
                    </span>
                </h5>
            </div>

            <div className={styles.body}>
                {manager.manager1}
            </div>

            <div className={styles.footing}>
                <p>
                    {manager?.conference[0]} Conference {manager?.division[0]}
                </p>
            </div>
        </div>
    );
}

ManagerCard.propTypes = {
    manager: PropTypes.object,
};
