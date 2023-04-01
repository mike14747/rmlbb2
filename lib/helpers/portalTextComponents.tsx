import { PortableTextComponents } from '@portabletext/react';

import styles from '../../styles/blockContent.module.css';

const portableTextComponents: PortableTextComponents = {
    types: {
        // this would be for special things like images and tables

        table: (props) => {
            const rows = props.value || [];
            const [headingRow, ...rest] = rows.rows;
            const dataRows = [...rest];
            return (<div className={styles.tableWrapper}>
                <table className={styles.blockContentTable}>
                    <thead>
                        <tr>
                            {headingRow?.cells.map((cell: string, index: number) => <th key={index}>{cell}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {dataRows?.map((row, index) => <tr key={index}>{row.cells.map((cell: string, i: number) => <td key={i}>{cell}</td>)}</tr>)}
                    </tbody>
                </table>
            </div>);
        },
    },
    marks: {
        // these are decorators and things that would be in inline content

        small: ({ children }) => <span style={{ fontSize: '83.3%' }}>{children}</span>,
        highlight: ({ children }) => <span style={{ color: '#232323', backgroundColor: '#fffdd0', border: '1px #ff7518 dashed', padding: '0 0.25rem' }}>{children}</span>,
    },
    block: {
        // these are for block level content

        h3: ({ children }) => <h3>{children}</h3>,
        h4: ({ children }) => <h4>{children}</h4>,
        h5: ({ children }) => <h5>{children}</h5>,
        h6: ({ children }) => <h6>{children}</h6>,
        blockquote: ({ children }) => <blockquote>{children}</blockquote>,
        p: ({ children }) => <p>{children}</p>,
    },
};

export default portableTextComponents;
