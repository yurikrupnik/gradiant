import React from 'react';
import convert from 'color-convert';
import ColorHover from './ColorHover';
import DataArea from './DataArea';
import styles from './styles.scss';

const black = convert.keyword.hsl('black');

class ColorPickerContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: black,
            hover: [],
            x: 0,
            y: 0
        };

        this.mouseMoveBlock = this.mouseMoveBlock.bind(this);
        this.handleSelectColor = this.handleSelectColor.bind(this);
        this.handleResetCursor = this.handleResetCursor.bind(this);
        this.fillCanvas = this.fillCanvas.bind(this);
    }

    componentDidMount() {
        this.fillCanvas();
    }

    fillCanvas() {
        const canvas = this.refs.canvasBlock; // eslint-disable-line
        const wB = 100;
        const hB = 100;
        const ctxB = canvas.getContext('2d');
        ctxB.rect(0, 0, wB, hB);
        ctxB.fillStyle = 'rgb(255,0,0)';
        ctxB.fillRect(0, 0, wB, hB);
        const grdWhite = ctxB.createLinearGradient(0, 0, wB, 0);
        grdWhite.addColorStop(0, 'rgb(255,255,255)');
        grdWhite.addColorStop(1, 'transparent');
        ctxB.fillStyle = grdWhite;
        ctxB.fillRect(0, 0, wB, hB);
        const grdBlack = ctxB.createLinearGradient(0, 0, 0, hB);
        grdBlack.addColorStop(0, 'transparent');
        grdBlack.addColorStop(1, 'rgb(0,0,0)');
        ctxB.fillStyle = grdBlack;
        ctxB.fillRect(0, 0, wB, hB);
    }

    handleSelectColor(event) {
        const canvas = this.refs.canvasBlock; // eslint-disable-line
        const { offsetX, offsetY } = event.nativeEvent;
        const rgb = canvas.getContext('2d')
            .getImageData(offsetX, offsetY, 1, 1).data;
        const color = convert.rgb.hsl(rgb);
        this.setState({ color });
    }

    mouseMoveBlock(event) {
        const canvas = this.refs.canvasBlock; // eslint-disable-line
        const { offsetX, offsetY } = event.nativeEvent;
        const rgb = canvas.getContext('2d')
            .getImageData(offsetX, offsetY, 1, 1).data;
        const hover = convert.rgb.hsl(rgb);
        this.setState({
            hover,
            x: offsetX,
            y: offsetY
        });
    }

    handleResetCursor() {
        this.setState(({ hover: [] }));
    }

    render() {
        const {
            color, hover, x, y
        } = this.state;

        return (
            <div className={`container ${styles.relative}`}>
                <div className="row">
                    <div className="col-lg-1">
                        <canvas
                            id="picker"
                            height="100"
                            width="100"
                            ref="canvasBlock" /* eslint-disable-line */
                            onMouseMove={this.mouseMoveBlock}
                            onMouseLeave={this.handleResetCursor}
                            onClick={this.handleSelectColor}
                        />
                        <ColorHover
                            color={hover}
                            x={x}
                            y={y}
                        />
                    </div>

                    <div className="col-lg-1">
                        <DataArea color={color} />
                    </div>
                </div>
            </div>
        );
    }
}

export default ColorPickerContainer;
