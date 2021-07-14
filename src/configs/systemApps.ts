import TodoList from '../apps/TodoList';

export default [
  {
    "name": "启动台",
    "icon": "icons-launchpad",
    "namespace": "react_os_launchpad",
    // TODO 启动台组件比较特殊，先用TODOList占位
    "component": TodoList
  },
  {
    "name": "待办事项",
    "icon": "backlog",
    "namespace": "react_os_todos",
    "component": TodoList
  }
]