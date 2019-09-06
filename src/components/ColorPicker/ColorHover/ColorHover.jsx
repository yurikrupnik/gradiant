import React from 'react';
import PropTypes from 'prop-types';
import convert from 'color-convert';
import styles from './styles.scss';

const ColorHover = (props) => {
    const { x, y, color } = props;
    if (!color.length) {
        return null;
    }
    return (
        <div
            className={styles.root}
            style={{
                left: x,
                top: y,
                backgroundColor: `#${convert.hsl.hex(color)}`
            }}
        />

    );
};

ColorHover.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    color: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default React.memo(ColorHover);
