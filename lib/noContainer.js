import PropTypes from 'prop-types';

const noContainer = {
    // eslint-disable-next-line react/display-name
    container: props => <>{props.children}</>,
};

noContainer.container.propTypes = {
    children: PropTypes.array,
};

export default noContainer;
