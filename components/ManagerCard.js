import PropTypes from 'prop-types';

import styles from '../styles/ManagerCard.module.css';

export default function ManagerCard({ manager }) {
    console.log('manager:', manager);
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
                <div className={styles.manager}>
                    {manager.description1 &&
                        <p className={styles.description}>
                            {manager.description1}
                        </p>
                    }

                    <p>
                        {manager.manager1}
                    </p>

                    <p className={styles.small}>
                        {manager.address1a}
                    </p>

                    <p className={styles.small}>
                        {manager.address1b}
                    </p>

                    <p className={styles.small}>
                        {manager.city1}
                        {manager.city1 && manager.state1 ? <>, </> : <> </>}
                        {manager.state1}
                        <> </>
                        {manager.country1}
                        <> </>
                        {manager.zip1}
                    </p>

                    <p>
                        {manager.phone1a}
                    </p>

                    <p>
                        {manager.phone1b}
                    </p>

                    <p>
                        <a href={'mailto:' + manager.email1a}>
                            {manager.email1a}
                        </a>
                    </p>

                    <p>
                        {manager.email1b}
                    </p>
                </div>

                <div className={styles.manager}>
                    {manager.description2 &&
                        <p className={styles.description}>
                            {manager.description2}
                        </p>
                    }

                    <p>
                        {manager.manager2}
                    </p>

                    <p className={styles.small}>
                        {manager.address2a}
                    </p>

                    <p className={styles.small}>
                        {manager.address2b}
                    </p>

                    <p className={styles.small}>
                        {manager.city2}
                        <> </>
                        {manager.state2}
                        <> </>
                        {manager.country2}
                        <> </>
                        {manager.zip2}
                    </p>

                    <p>
                        {manager.phone2a}
                    </p>

                    <p>
                        {manager.phone2b}
                    </p>

                    <p>
                        <a href={'mailto:' + manager.email2a}>
                            {manager.email2a}
                        </a>
                    </p>

                    <p>
                        {manager.email2b}
                    </p>
                </div>
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
