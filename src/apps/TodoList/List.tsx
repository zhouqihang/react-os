/**
 * @file List.tsx
 * @author zhouqihang
 * @time 2021-06-13 17:47:01
 * @description 
 */
import React, { FunctionComponent, CSSProperties } from 'react';
import classnames from 'classnames';
import { Button, Input, DatePicker } from 'antd';
import momentjs from 'moment';
import Trigger from '../../components/Trigger';
import Icon from '../../components/Icon';

import { useAddListHooks } from './hooks/useAddListHooks';


const prefix = 'os-app-todo_list';
export type statusType = 'todo' | 'done';
export interface IList {
  title: string;
  content: string;
  createTime: number;
  endTime: number;
  doneTime: number;
  status: statusType;
}
interface IListProps {
  className?: string;
  style?: CSSProperties;
  datas: IList[];
  addItem: (item: IList) => void;
  current: statusType;
  onOk: (createTime: number) => void;
}

const List: FunctionComponent<IListProps> = (props) => {
  const { className, style, addItem, datas, current, onOk } = props;

  const {
    showAdd,
    title,
    content,
    date,
    setAdd,
    setTitle,
    setContent,
    setDate
  } = useAddListHooks();

  function addHandler() {
    addItem({
      title,
      content,
      endTime: date,
      createTime: Date.now(),
      status: 'todo',
      doneTime: 0
    });
    setAdd(false);
    setTitle(''),
    setContent(''),
    setDate(Date.now())
  }

  function canSubmit() {
    return title && date && content;
  }

  const addNode = showAdd ? (
    <li className={prefix + '__form'} >
        <div>
          <div className="item">
            <Input type="text" placeholder="待办事项" value={title} bordered={false} onChange={(event) => setTitle(event.target.value)} />
          </div>
          <div className="item">
            <Input type="text" placeholder="备注" value={content} bordered={false} onChange={(event) => setContent(event.target.value)} />
          </div>
          <div className="item">
            过期时间：<DatePicker showTime bordered={false} onOk={(val) => setDate(val.valueOf())} placeholder="过期时间" />
            <Button type="primary" onClick={addHandler} disabled={!canSubmit}>add</Button>
          </div>
        </div>
      </li>
  ) : null;

  return (
    <ul
      className={classnames(
        prefix,
        className
      )}
      style={style}
    >
      {
        datas.map((item, index) => (
          <li className={prefix + '__item'} key={index}>
            <div className="content">
              <h4>{item.title}</h4>
              <p className={prefix + '__item_content'}>{item.content}</p>
              <p className={prefix + '__item_time'}>
                {current === 'todo' ? '过期' : '完成'}时间：{current === 'todo' ? format(item.endTime) : format(item.doneTime)} 
                创建时间：{format(item.createTime)}
              </p>
            </div>
            {
              item.status === 'todo' && (
                <div className="done" onClick={() => onOk(item.createTime)}>
                  <Icon name="ok" />
                </div>
              )
            }
          </li>
        ))
      }
      {addNode}
      <li className={prefix + '__create'}>
          <Button type="primary" block onClick={() => setAdd(true)}>
            新建待办事项
          </Button>
      </li>
    </ul>
  )
}

function format(date: number) {
  return momentjs(date).format('YYYY-MM-DD HH:mm:ss')
}

export default List;