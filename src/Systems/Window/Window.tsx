/**
 * @file index.tsx
 * @author zhouqihang
 * @time 2021-05-27 19:23:43
 * @description Window组件
 */
import React, { Component, CSSProperties } from 'react';
import classnames from 'classnames';

import Header, { IHeaderEvents } from './Header';

const prefix = 'os-window';
interface IWindowProps extends IHeaderEvents {
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
  headerClass?: string;
  headerStyle?: CSSProperties;
  headerContent?: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  onSelected: React.MouseEventHandler<HTMLDivElement>;
}
interface IWindowState {
  width: number;
  height: number;
  left: number;
  top: number;
  /** 窗口正在缩放或移动中时，禁止窗口内部的内容被选中 */
  selectDisabled: boolean;
}

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

  // window容器ref对象
  private element: React.RefObject<HTMLDivElement> = React.createRef();

  /**
   * 获取窗口缩放的事件绑定函数，用于注册addEventListener
   * @param target HTMLDivElement
   * @returns (event: MouseEvent) => void
   */
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
   * 获取窗口移动的事件绑定函数，用于注册addEventListener
   * @param target HTMLDivElement
   * @returns (event: MouseEvent) => void
   */
  getWindowTranslateHandler = (target: HTMLDivElement) => {
    const div = this.element.current as HTMLDivElement;
    const desktop = document.querySelector<HTMLDivElement>('#os-desktop');
    const docker = document.querySelector<HTMLDivElement>('#os-docker');
    return (event: MouseEvent) => {
      if (!div || !desktop || !docker) {
        return;
      }

      const { clientX, clientY } = event;
      let movedX = clientX - this.startMoveX;
      const movedY = clientY - this.startMoveY;

      let left = this.currentLeft + movedX;
      // 右侧边界判断
      if (left + this.currentW > desktop.offsetWidth) {
        left = desktop.offsetWidth - this.currentW;
      }
      // 左侧边界判断
      else if (left < 0) {
        left = 0;
      }

      let top = this.currentTop + movedY;
      // 顶部边界判断
      if (top < STATUS_BAR_HEIGHT) {
        top = STATUS_BAR_HEIGHT
      }
      // 底部边界判断
      else if (top + this.currentH > desktop.offsetHeight - docker.offsetHeight) {
        top = desktop.offsetHeight - docker.offsetHeight - this.currentH;
      }

      this.setState({ top, left });

    }
  }

  /**
   * 给触发线添加鼠标移动事件，并且在document的mouseup事件触发时移除鼠标事件
   * @param e event
   */
  addMouseMoveEvent = (e: React.MouseEvent<HTMLDivElement>) => {
    const type = (e.target as HTMLDivElement).dataset.type;
    if (!type) return;

    this.startMoveX = e.clientX;
    this.startMoveY = e.clientY;
    this.setState({ selectDisabled: true })
    let eventHandler: (event: MouseEvent) => void = () => {};
    if (type === 'scale') {
      eventHandler = this.changeWindowSize(e.currentTarget);
    }
    else if ('translate' === type) {
      eventHandler = this.getWindowTranslateHandler(e.currentTarget);
    }

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

  renderHeader = () => {
    const {
      headerClass,
      headerContent,
      headerStyle,
      onShrink,
      onMagnify,
      onClose
    } = this.props;
    // TODO 最小化、最大化时不需要通知外部，关闭后通过回调告知外部清理数据
    return (
      <Window.Header
        style={headerStyle}
        className={headerClass}
        onMouseDown={this.addMouseMoveEvent}
        data-type="translate"
        onShrink={onShrink}
        onMagnify={onMagnify}
        onClose={onClose}
      >
        {headerContent}
      </Window.Header>
    )
  }

  render() {
    const {
      className,
      style,
      children,
      onClick,
      onSelected
    } = this.props;
    const { width, height, top, left, selectDisabled } = this.state;
    const styleProps = Object.assign({}, style, {
      width,
      height,
      top,
      left,
      userSelect: selectDisabled ? 'none': 'initial'
    });

    return (
      <div
        className={classnames(
          prefix,
          className
        )}
        style={styleProps}
        ref={this.element}
        onClick={onClick}
        onMouseDown={onSelected}
        data-type="window"
      >
        {/* 缩放窗口触发DOM */}
        <div className={prefix + '__line left'} data-direction="left" data-type="scale" onMouseDown={this.addMouseMoveEvent}></div>
        <div className={prefix + '__line right'} data-direction="right" data-type="scale" onMouseDown={this.addMouseMoveEvent}></div>
        <div className={prefix + '__line top'} data-direction="top" data-type="scale" onMouseDown={this.addMouseMoveEvent}></div>
        <div className={prefix + '__line bottom'} data-direction="bottom" data-type="scale" onMouseDown={this.addMouseMoveEvent}></div>
        <div className={prefix + '__line left-top'} data-direction="left-top" data-type="scale" onMouseDown={this.addMouseMoveEvent}></div>
        <div className={prefix + '__line right-top'} data-direction="right-top" data-type="scale" onMouseDown={this.addMouseMoveEvent}></div>
        <div className={prefix + '__line left-bottom'} data-direction="left-bottom" data-type="scale" onMouseDown={this.addMouseMoveEvent}></div>
        <div className={prefix + '__line right-bottom'} data-direction="right-bottom" data-type="scale" onMouseDown={this.addMouseMoveEvent}></div>
        {this.renderHeader()}
        <div className={prefix + '__content'}>
          {children}
        </div>
      </div>
    )
  }
}
export default Window;