/**
 * @file Trigger.tsx
 * @author zhouqihang
 * @time 2021-05-20 16:00:00
 * @description 触发器组件，用于通过hover click focus等交互触发弹出层
 */
import React, { Component, CSSProperties, ReactNode, ReactElement, ReactHTMLElement, RefObject, createRef } from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';

import Popup from '../Popup';

const prefix = 'os-trigger';
interface IPosition {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}
export type TriggerType = 'click' | 'focus' | 'hover';

interface ITriggerProps {
  // className?: string;
  // style?: CSSProperties;
  /** 是否显示，传递此参数后组件将成为受控组件 */
  visible?: boolean;
  /** 弹出层 */
  content: ReactNode;
  trigger?: TriggerType;
  onChange?: (visible: boolean) => void;
  setPositions: (element: HTMLElement) => IPosition;
}

interface ITriggerStates {
  visible: boolean;
  position: IPosition | null;
}

class Trigger extends Component<ITriggerProps, ITriggerStates> {

  static defaultProps: Partial<ITriggerProps> = {
    trigger: 'hover'
  }

  static getDerivedStateFromProps = (nextProps: Readonly<ITriggerProps>, prevState: ITriggerProps) => {
    if ('visible' in nextProps) {
      return {
        visible: nextProps.visible
      }
    }
    return null;
  }

  private timer: number | null = null;

  private popupRef: RefObject<any> = createRef();

  constructor(props: ITriggerProps) {
    super(props);
    this.state = {
      visible: typeof this.props.visible === 'boolean' ? this.props.visible : false,
      position: null
    }
  }

  /**
   * register event for children element
   * if they already has an event
   * the func will be called
   * 
   * @param eventName register event name eg: onClick, onFocus...
   * @param visible popup visible, if undefined, it will be opposite
   * @return {function} react event function
   */
  registerTriggerEvent = (eventName: string, visible?: boolean) => (e: React.MouseEvent<HTMLElement>) => {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    const { children } = this.props;

    if (children && (children as ReactElement).props[eventName]) {
      (children as ReactElement).props[eventName](e);
    }

    let v: boolean = !this.state.visible;
    if ('boolean' === typeof visible) {
      v = visible;
    }

    // timer will be clear when is already existed.
    // when the visible state is the same, nothing todo
    // else toggle the visible state
    // this worked when mouse is moved between tooltip trigger and tooltip popup
    if (this.state.visible === v) {
      return;
    }
    this.timer = window.setTimeout(() => {
      this.togglePopupVisible(v);
      this.props.onChange && this.props.onChange(v)
    }, 0);
  }

  popupMounted = () => {
    this.props.setPositions(this.popupRef.current);
  }

  renderPopupContent = () => {
    const { visible } = this.state;
    if (!visible) {
      return null;
    }
    
    const { content, trigger } = this.props;
    let props: Record<string, any> = { ref: this.popupRef };
    if ('hover' === trigger) {
      props.onMouseEnter = this.registerTriggerEvent('onMouseEnter', true);
      props.onMouseLeave = this.registerTriggerEvent('onMouseLeave', false);
    }

    let element = null;
    if (React.isValidElement(content)) {
      element = React.cloneElement<any>(content, props)
    }

    return (
      <Popup visible key="content" mounted={this.popupMounted}>
        { element }
      </Popup>
    );
  }

  togglePopupVisible = (visible: boolean) => {
    this.setState({ visible }, () => {
      // when trigger is click and visible is true, add the click event for document
      // this will hidden popup when click the screen(not the popup self)
      // when visible is false, remove the click event for document
      if ('click' !== this.props.trigger) {
        return;
      }
      if (true === visible) {
        document.addEventListener('click', this.handleDocumentClick)
      }
      else {
        document.removeEventListener('click', this.handleDocumentClick);
      }
    })
  }


  /**
   * when click the screen
   * if click the trigger or popup, do nothing here
   */
  handleDocumentClick = (e: MouseEvent) => {
    if (this.props.trigger !== 'click') {
      return;
    }

    let node = e.target;
    let contains = false;
    const popupNode = findDOMNode(this.popupRef.current);
    const triggerNode = findDOMNode(this);
    while (node && (node as HTMLElement).parentNode) {
      if (node === popupNode || node === triggerNode) {
        contains = true;
        break;
      }
      node = (node as HTMLElement).parentNode;
    }
    if (!contains) {
      this.togglePopupVisible(false);
      this.props.onChange && this.props.onChange(false)
    }
  }

  /**
   * clearTimeout, remove document event listener
   */
  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    document.removeEventListener('click', this.handleDocumentClick);
  }

  render() {
    const { children, trigger } = this.props;

    // get trigger element
    let triggerEle = null;
    const childrenProps: any = {
      key: 'trigger'
    };
    if ('click' === trigger) {
      childrenProps.onClick = this.registerTriggerEvent('onClick');
    }
    else if ('focus' === trigger) {
      childrenProps.onFocus = this.registerTriggerEvent('onFocus', true);
      childrenProps.onBlur = this.registerTriggerEvent('onBlur', false);
    }
    else if ('hover' === trigger) {
      childrenProps.onMouseEnter = this.registerTriggerEvent('onMouseEnter', true);
      childrenProps.onMouseLeave = this.registerTriggerEvent('onMouseLeave', false);
    }

    if (React.isValidElement(children)) {
      triggerEle = React.cloneElement<any>(children, childrenProps);
    }

    // get popup content
    let popupContent = this.renderPopupContent();

    return [triggerEle, popupContent];
  }
}

export default Trigger;