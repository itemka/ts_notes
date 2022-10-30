import { FC } from "react";

import { ListItem } from "../../types/common";
import "./List.css";

interface ListProps {
  list: ListItem[];
  deleteItem: (id: string) => void;
}

export const List: FC<ListProps> = ({ list = [], deleteItem }) => {
  if (!list.length) {
    return null
  }

  return (
    <ul>
      {list.map(item => (
        <li key={item.id}>
          <span>
            {item.text}
          </span>
          <button onClick={deleteItem.bind(null, item.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}