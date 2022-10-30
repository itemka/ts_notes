import { FC, useState } from 'react';

import { List } from "./components/List";
import { NewItem } from "./components/NewItem";
import { ListItem } from "./types/common";

const App: FC = () => {
  const [list, setListItem] = useState<ListItem[]>([])

  const addItem = (text: string) => {
    const newItem: ListItem = {
      id: Date.now().toString(),
      text,
    }

    setListItem((prevState) => {
      return [newItem, ...prevState]
    });
  }

  const deleteItem = (id: string) => {
    setListItem((prevState) => {
      return prevState.filter(item => item.id !== id)
    })
  }

  return (
    <div className="App">
      <NewItem addItem={addItem} />
      <List list={list} deleteItem={deleteItem} />
    </div>
  );
}

export default App;
