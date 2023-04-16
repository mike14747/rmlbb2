import { getFileTypeIcon } from '@/lib/helpers/getFileTypeIcon';
import { DownloadFile } from '@/types/download-types';
import Image from 'next/image';

import styles from '@/styles/downloads.module.css';

type DownloadsProps = {
    downloads: DownloadFile[];
    label: string;
}

export default function DownloadType({ downloads, label }: DownloadsProps) {
    return (
        <section className={styles.typeContainer}>
            <h3>{label}</h3>
            {downloads.map(file => (
                <div className={styles.downloadContainer} key={file.key}>
                    <div className={styles.downloadInfo}>
                        <h4>{file.name}</h4>
                        {file.description && <p className={styles.downloadDesc}>{file.description}</p>}
                        <p className={styles.filenameText}>
                            <Image
                                aria-hidden="true"
                                src={`/images/file-type-icons/${getFileTypeIcon(file.filename)}`}
                                alt=""
                                width={32}
                                height={32}
                                className={styles.fileTypeIcon}
                            />
                            <a href={`${process.env.NEXT_PUBLIC_BASE_FILE_DOWNLOAD_URL}${file.ref.split('-').slice(1).join('.')}?dl=${file.filename}`}>
                                {file.filename}
                            </a>
                        </p>
                    </div>

                    <div>
                        <a className={styles.downloadLink} href={`${process.env.NEXT_PUBLIC_BASE_FILE_DOWNLOAD_URL}${file.ref.split('-').slice(1).join('.')}?dl=${file.filename}`}>
                            <Image
                                src="/images/download_icon.png"
                                alt={`Download ${file.filename}`}
                                title={`Download ${file.filename}`}
                                width={48}
                                height={48}
                                className={styles.downloadIcon}
                            />
                        </a>
                    </div>
                </div>
            ))}
        </section>
    );
}
