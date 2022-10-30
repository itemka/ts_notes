import { RequestHandler } from 'express';

import { ListItem } from '../models/list'

const LIST: ListItem[] = [];

export const createItem: RequestHandler = (req, res) => {
  const id = Date.now().toString();
  const { text } = req.body as Pick<ListItem, 'text'>;

  const newItem = new ListItem(id, text);

  LIST.unshift(newItem);

  res.status(201).json({
    message: 'Created a new list item.',
    createdListItem: newItem,
  })
}

export const getItem: RequestHandler = (req, res) => {
  res.status(200).json({
    list: LIST,
  })
}

export const updateItem: RequestHandler<Pick<ListItem, 'id'>> = (req, res) => {
  const { id } = req.params;
  const { text: updatedText } = req.body as Pick<ListItem, 'text'>;

  const idx = LIST.findIndex((item) => item.id === id);

  if (idx < 0) {
    throw new Error('Could not find list item.')
  }

  LIST[idx] = new ListItem(LIST[idx].id, updatedText);

  res.status(200).json({
    message: 'Updated',
    updatedListItem: LIST[idx],
  })
}

export const deleteItem: RequestHandler<Pick<ListItem, 'id'>> = (req, res) => {
  const { id } = req.params;

  const idx = LIST.findIndex((item) => item.id === id);

  if (idx < 0) {
    throw new Error('Could not find list item.')
  }

  LIST.splice(idx, 1);

  res.status(200).json({
    message: 'Deleted',
  })
}