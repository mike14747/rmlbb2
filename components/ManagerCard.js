import PropTypes from 'prop-types';

import styles from '../styles/ManagerCard.module.css';

export default function ManagerCard({ manager }) {
    return (
        <div className={styles.card}>
            <div className={styles.heading}>
                <h5>
                    {manager?.team}
                </h5>
                <p>
                    {manager?.conference} Conference
                </p>
                <p>
                    Division: {manager?.division}
                </p>
            </div>
        </div>
    );
}

ManagerCard.propTypes = {
    manager: PropTypes.object,
};
