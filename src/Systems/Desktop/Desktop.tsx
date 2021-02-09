/**
 * @description 桌面组件
 * @author zhouqihang
 */
import React, { PureComponent, CSSProperties } from 'react';

interface IDesktopProps {
    /** background eg: url, color */
    background: string;
}

interface IDesktopState {
    style: CSSProperties;
}

const prefix = 'os-desktop';
const backgroundStyle = {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
}

class Desktop extends PureComponent<IDesktopProps, IDesktopState> {
    static defaultProps: Readonly<IDesktopProps> = {
        background: '#000',
    };

    static getDerivedStateFromProps(nextProps: Readonly<IDesktopProps>, prevState: IDesktopState) {
        if (nextProps.background !== prevState.style.background) {
            return {
                style: {
                    ...prevState,
                    background: nextProps.background
                }
            };
        }

        return null;
    }    

    constructor(props: Readonly<IDesktopProps>) {
        super(props);
        this.state = {
            style: {
                background: this.getBackgroundString(),
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }
        }
    }

    getBackgroundString = () => {
        if (/^.*\.(png|jpg|jpeg|gif|webp)$/i.test(this.props.background)) {
            return `url(${this.props.background})`;
        }

        return this.props.background;
    }

    render() {
        const { children } = this.props;
        const { style } = this.state;
        console.log(this.props, this.state);
        return (
            <section style={Object.assign({ background: this.getBackgroundString() }, backgroundStyle)} className={prefix}>
                {children}
            </section>
        )
    }
}

export default Desktop;