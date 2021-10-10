import PropTypes from 'prop-types';

const small = (props) => {
    return <span style={{ fontSize: '75%' }}>{props.children}</span>;
};

small.propTypes = {
    children: PropTypes.array,
};

const serializers = {
    // eslint-disable-next-line react/display-name
    container: props => <>{props.children}</>,
    marks: { small },
};

export default serializers;
