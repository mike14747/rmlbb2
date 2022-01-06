import PropTypes from 'prop-types';

const TableRenderer = (props) => {
    const { rows } = props.node;
    const [headingRow, ...rest] = rows;
    const dataRows = [...rest];
    return (<div className="tableWrapper">
        <table className="blockContentTable">
            <thead>
                <tr>
                    {headingRow?.cells.map((cell, index) => <th key={index}>{cell}</th>)}
                </tr>
            </thead>
            <tbody>
                {dataRows?.map((row, index) => <tr key={index}>{row.cells.map((cell, i) => <td key={i}>{cell}</td>)}</tr>)}
            </tbody>
        </table>
    </div>);
};

const BlockRenderer = (props) => {
    const { style } = props.node;

    if (style === 'h3') return <h3>{props.children}</h3>;
    if (style === 'h4') return <h4>{props.children}</h4>;
    if (style === 'h5') return <h5>{props.children}</h5>;
    if (style === 'h6') return <h6>{props.children}</h6>;

    if (style === 'blockquote') return <blockquote>{props.children}</blockquote>;

    // if (style === 'pre') return <pre style={{ color: '#232323', backgroundColor: '#ffffee', border: '1px #d3d3d3 solid', fontSize: '83.3%', padding: '0.5rem' }}><code>{props.children}</code></pre>;

    return <p>{props.children}</p>;
};

const small = (props) => {
    return <span style={{ fontSize: '83.3%' }}>{props.children}</span>;
};

const highlight = (props) => {
    return <span style={{ color: '#232323', backgroundColor: '#fffdd0', border: '1px #ff7518 dashed', padding: '0 0.25rem' }}>{props.children}</span>;
};

const serializers = {
    // eslint-disable-next-line react/display-name
    container: props => <>{props.children}</>,
    types: { block: BlockRenderer, table: TableRenderer },
    marks: { small, highlight },
};

TableRenderer.propTypes = {
    node: PropTypes.object,
};

BlockRenderer.propTypes = {
    node: PropTypes.object,
    children: PropTypes.array,
};

small.propTypes = {
    children: PropTypes.array,
};

highlight.propTypes = {
    children: PropTypes.array,
};

serializers.container.propTypes = {
    children: PropTypes.array,
};

export default serializers;
