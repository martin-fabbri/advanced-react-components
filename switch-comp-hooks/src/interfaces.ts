export interface Todo {
  id: string
  text: string
  completed: boolean
}

export type ActionType = 'add' | 'delete' | 'complete' | 'reset'

export interface TodoAction {
  type: ActionType
  payload?: any
}

export interface ITodoItemProps {
  id: string;
  completed: boolean;
  text: string;
}

export interface ITodoListProps {
  items: Todo[];
}