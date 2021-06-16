/**
 * @file TodoList.tsx
 * @author zhouqihang
 * @time 2021-06-13 17:15:28
 * @description 待办事项App
 */
import React, { Component, CSSProperties } from 'react';
import classnames from 'classnames';
import Window from '../../Systems/Window';
import List, { IList } from './List';
import Icon from '../../components/Icon';

const prefix = 'os-app-todo';
type menuType = 'todo' | 'done';
type statusType = menuType;

interface ITodoListProps {
}

interface ITodoListState {
  type: menuType;
  list: IList[];
}
class TodoList extends Component<ITodoListProps, ITodoListState> {

  constructor(props: ITodoListProps) {
    super(props);
    this.state = {
      type: 'todo',
      list: []
    }
  }

  changeType = (e: React.MouseEvent<HTMLLIElement>) => {
    const type = e.currentTarget.dataset.type;
    this.setState({
      type: type as menuType
    })
  }

  addTodoItem = (item: IList) => {
    this.setState(state => ({
      list: state.list.slice(0).concat(item)
    }));
  }

  doneHandler = (createTime: number) => {
    this.setState(state => ({
      list: state.list.map(item => {
        if (item.createTime === createTime) {
          item.doneTime = Date.now();
          item.status = 'done';
        }
        return item;
      })
    }));
  }

  render() {
    // const { className, style } = this.props;
    const { type, list } = this.state;
    const currentList = list.filter(item => item.status === type);
    return (
      <Window
        headerClass={prefix + '__window_header'}
      >
        <div className={prefix}>
          <ul className={prefix + '__menu'}>
            <li className={classnames({ active: type === 'todo'})} data-type="todo" onClick={this.changeType}>
              <Icon name="todo" />
              TODO
            </li>
            <li className={classnames({ active: type === 'done'})} data-type="done" onClick={this.changeType}>
              <Icon name="done" />
              DONE
            </li>
          </ul>
          <List datas={currentList} addItem={this.addTodoItem} current={type} onOk={this.doneHandler}></List>
        </div>
      </Window>
    )
  }
}

export default TodoList;