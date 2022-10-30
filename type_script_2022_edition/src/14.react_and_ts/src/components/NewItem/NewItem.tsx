import { FC, FormEvent, useRef } from "react";

import "./NewTodo.css"

interface NewItemProps {
  addItem: (text: string) => void;
}

export const NewItem: FC<NewItemProps> = ({ addItem }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    const inputValue = inputRef.current?.value;

    if (inputValue) {
      addItem(inputValue)
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="form-control">
        <label htmlFor="text">
          List
        </label>
        <input ref={inputRef} type="text" id='text'/>
      </div>
      <button type="submit">
        Add
      </button>
    </form>
  )
}