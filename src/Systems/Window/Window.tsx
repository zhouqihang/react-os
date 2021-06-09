/**
 * @file index.tsx
 * @author zhouqihang
 * @time 2021-05-27 19:23:43
 * @description Window组件
 */
import React, { Component, CSSProperties } from 'react';
import classnames from 'classnames';

import Header from './Header';

const prefix = 'os-window';
interface IWindowProps {
  className?: string;
  style?: CSSProperties;
  /** 窗口默认宽度 */
  defaultWidth?: number;
  /** 窗口默认高度 */
  defualtHeight?: number;
  /** 窗口最小宽度 */
  minWidth?: number;
  /** 窗口最小高度 */
  minHeight?: number;
}
interface IWindowState {
  width: number;
  height: number;
  left: number;
  top: number;
  /** 窗口正在缩放或移动中时，禁止窗口内部的内容被选中 */
  selectDisabled: boolean;
}

// TODO
// 移动功能
// head和footer自定义功能

const DEFAULT_WIDTH = 700;
const DEFAULT_HEIGHT = 500;
const MIN_WIDTH = 300;
const MIN_HEIGHT = 200;

const STATUS_BAR_HEIGHT = 25;

class Window extends Component<IWindowProps, IWindowState> {

  static defaultProps: Partial<IWindowProps> = {
    defaultWidth: DEFAULT_WIDTH,
    defualtHeight: DEFAULT_HEIGHT,
    minWidth: MIN_WIDTH,
    minHeight: MIN_HEIGHT
  }

  static Header: typeof Header;

  constructor(props: IWindowProps) {
    super(props);
    this.currentW = props.defaultWidth as number;
    this.currentH = props.defualtHeight as number;
    this.currentTop = STATUS_BAR_HEIGHT;
    this.currentLeft = 300;
    this.state = {
      width: this.currentW,
      height: this.currentH,
      left: this.currentLeft,
      top: this.currentTop,
      selectDisabled: false,
    }
  }

  // 用于记录窗口开始移动或缩放时的坐标值
  private startMoveX: number = 0;
  private startMoveY: number = 0;

  // 用于记录窗口开始移动或缩放时的尺寸数据
  private currentW: number;
  private currentH: number;
  private currentTop: number;
  private currentLeft: number;

  private element: React.RefObject<HTMLDivElement> = React.createRef();

  changeWindowSize = (target: HTMLDivElement) => {
    const direction = target.dataset.direction || '';
    const desktop = document.querySelector<HTMLDivElement>('#os-desktop');
    const statusBar = document.querySelector<HTMLDivElement>('#os-statusbar');
    const docker = document.querySelector<HTMLDivElement>('#os-docker');
    const div = this.element.current as HTMLDivElement;
    return (event: MouseEvent) => {
      if (!direction) {
        return;
      }
      if (!desktop || !statusBar || !docker) {
        return;
      }
  
      const { clientX, clientY } = event;
      let movedX = clientX - this.startMoveX;
      const movedY = clientY - this.startMoveY;
      console.log(movedX, movedY)
  
      if (direction.includes('right')) {
        let width = this.currentW + movedX;
        // 边界判断: 右侧超出屏幕外
        if (width + this.currentLeft > desktop.offsetWidth) {
          width = desktop.offsetWidth - this.currentLeft;
        }
        // 边界判断: 右侧小于最小宽度
        if (width < (this.props.minWidth as number)) {
          width = this.props.minWidth as number;
        }
        this.setState({ width });
      }
      if (direction.includes('left')) {
        let width = this.currentW - movedX;
        let left = this.currentLeft + movedX;
        // 边界判断，向右拖动时判断最小宽度
        if (width < (this.props.minWidth as number)) {
          width = this.props.minWidth as number;
          left = div.getBoundingClientRect().right - width;
        }
        // 边界判断，向左拖动时判断浏览器窗口
        if (left < 0) {
          left = 0;
          width = div.getBoundingClientRect().right;
        }
        this.setState({ width, left });
      }
      if (direction.includes('bottom')) {
        let height = this.currentH + movedY;
        // 边界判断: 下方超出屏幕外
        if (height + this.currentTop > desktop.offsetHeight - docker.getBoundingClientRect().height) {
          height = desktop.offsetHeight - this.currentTop - docker.getBoundingClientRect().height;
        }
        // 边界判断: 下方小于最小高度度
        if (height < (this.props.minHeight as number)) {
          height = this.props.minHeight as number;
        }
        this.setState({ height });
      }
      if (direction.includes('top')) {
        let height = this.currentH - movedY;
        let top = this.currentTop + movedY;
        // 边界判断，向下拖动时判断最小宽度
        if (height < (this.props.minHeight as number)) {
          height = this.props.minHeight as number;
          top = div.getBoundingClientRect().bottom - height;
        }
        // 边界判断，向上拖动时判断浏览器窗口
        if (top < STATUS_BAR_HEIGHT) {
          top = STATUS_BAR_HEIGHT;
          height = div.getBoundingClientRect().bottom - STATUS_BAR_HEIGHT;
        }
        this.setState({ height, top });
      }
    }
  }

  /**
   * 给触发线添加鼠标移动事件，并且在document的mouseup事件触发时移除鼠标事件
   * @param e event
   */
  addMouseMoveEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    this.startMoveX = e.clientX;
    this.startMoveY = e.clientY;
    this.setState({ selectDisabled: true })
    const eventHandler = this.changeWindowSize(e.currentTarget);
    document.addEventListener('mousemove', eventHandler);
    const _this = this;
    // 缩放完成，移除document上添加的事件，还原记录的位置数据
    function removeEvent() {
      document.removeEventListener('mousemove', eventHandler);
      document.removeEventListener('mouseup', removeEvent);
      _this.startMoveX = 0;
      _this.startMoveY = 0;
      _this.currentW = _this.state.width;
      _this.currentH = _this.state.height;
      _this.currentLeft = _this.state.left;
      _this.currentTop = _this.state.top;
      _this.setState({ selectDisabled: false })
    }
    document.addEventListener('mouseup', removeEvent);
  }

  render() {
    const {
      className,
      style,
      defaultWidth,
      defualtHeight,
      children
    } = this.props;
    const { width, height, top, left, selectDisabled } = this.state;
    const styleProps = Object.assign({}, style, {
      width,
      height,
      top,
      left,
      userSelect: selectDisabled ? 'none': 'initial'
    });
    // console.log(children)
    // TODO children.type.displayName === 'Window.Header'
    return (
      <div
        className={classnames(
          prefix,
          className
        )}
        style={styleProps}
        ref={this.element}
      >
        {/* 缩放窗口触发DOM */}
        <div className={prefix + '__line left'} data-direction="left" onMouseDown={this.addMouseMoveEvent}></div>
        <div className={prefix + '__line right'} data-direction="right" onMouseDown={this.addMouseMoveEvent}></div>
        <div className={prefix + '__line top'} data-direction="top" onMouseDown={this.addMouseMoveEvent}></div>
        <div className={prefix + '__line bottom'} data-direction="bottom" onMouseDown={this.addMouseMoveEvent}></div>
        <div className={prefix + '__line left-top'} data-direction="left-top" onMouseDown={this.addMouseMoveEvent}></div>
        <div className={prefix + '__line right-top'} data-direction="right-top" onMouseDown={this.addMouseMoveEvent}></div>
        <div className={prefix + '__line left-bottom'} data-direction="left-bottom" onMouseDown={this.addMouseMoveEvent}></div>
        <div className={prefix + '__line right-bottom'} data-direction="right-bottom" onMouseDown={this.addMouseMoveEvent}></div>
        {children}
      </div>
    )
  }
}
export default Window;