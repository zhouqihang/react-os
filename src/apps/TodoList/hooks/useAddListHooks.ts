import React from 'react';


export function useAddListHooks() {
  const [showAdd, setAdd] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [date, setDate] = React.useState<number>(Date.now());

  return {
    showAdd,
    title,
    content,
    date,
    setAdd,
    setTitle,
    setContent,
    setDate
  }
}