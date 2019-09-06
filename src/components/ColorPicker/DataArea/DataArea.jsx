import convert from 'color-convert';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.scss';

const ColorPickerDataArea = (props) => {
    const { color } = props;
    return (
        <>
            <div
                style={{
                    backgroundColor: `#${convert.hsl.hex(color)}`
                }}
                id="swatch"
                className={styles.root}
            />

            <div>
                <Input
                    id="hslString"
                    type="text"
                    readOnly
                    value={color}
                />
            </div>
        </>
    );
};

ColorPickerDataArea.propTypes = {
    color: PropTypes.arrayOf(PropTypes.number).isRequired
};

export default React.memo(ColorPickerDataArea);
