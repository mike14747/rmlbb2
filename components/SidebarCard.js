import PropTypes from 'prop-types';

import styles from '../styles/SidebarCard.module.css';

const colors = ['green', 'orange', 'blue', 'brown'];

export default function SidebarCard({ heading = null, subheading = null, color, children }) {
    const colorTheme = colors.includes(color) ? color : 'green';

    return (
        <div className={styles.cardContainer}>
            <div className={`${styles.card} ${styles[`${colorTheme}`]}`}>
                <div className={styles.headingContainer}>
                    {heading && <h4 className={styles.heading}>{heading}</h4>}
                    <div className={styles.down}></div>
                </div>

                <div className={styles.belowHeading}>
                    {subheading && <p className={styles.subHeading}>{subheading}</p>}

                    <div className={styles.body}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

SidebarCard.propTypes = {
    heading: PropTypes.string,
    subheading: PropTypes.string,
    color: PropTypes.string,
    children: PropTypes.any,
};
