import PropTypes from 'prop-types';
import { getFileTypeIcon } from '../lib/helpers/getFileTypeIcon';

import styles from '../styles/downloads.module.css';

const DownloadType = ({ downloads, label }) => {
    return (
        <div className={styles.typeContainer}>
            <h3>{label}</h3>
            {downloads.map(file => (
                <div className={styles.downloadContainer} key={file.key}>
                    <div className={styles.downloadInfo}>
                        <h4>{file.name}</h4>
                        {file.description && <p className={styles.downloadDesc}>{file.description}</p>}
                        <p className={styles.filenameText}>
                            <img className={styles.fileTypeIcon} aria-hidden="true" src={`/images/file-type-icons/${getFileTypeIcon(file.filename)}`} alt="" />
                            <a href={`${process.env.NEXT_PUBLIC_BASE_DOWNLOAD_URL}${file.ref.split('-').slice(1).join('.')}?dl=${file.filename}`}>
                                {file.filename}
                            </a>
                        </p>
                    </div>

                    <div>
                        <a className={styles.downloadLink} href={`${process.env.NEXT_PUBLIC_BASE_DOWNLOAD_URL}${file.ref.split('-').slice(1).join('.')}?dl=${file.filename}`}>
                            <img className={styles.downloadIcon} src="/images/download_icon.png" alt={`Download ${file.filename}`} title={`Download ${file.filename}`} />
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};

DownloadType.propTypes = {
    downloads: PropTypes.array,
    label: PropTypes.string,
};

export default DownloadType;
