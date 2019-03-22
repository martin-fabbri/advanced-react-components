import React, {memo} from 'react'
import styled from '@emotion/styled'
import Checkbox from './Checkbox'

const Button = styled('button')`
  font-weight: 400;
  color: white;
  font-size: 0.75em;
  border: 1px solid transparent;
  background-color: transparent;
  margin: 5px;
  cursor: pointer;
`
const Item = styled('li')`
  font-size: 1.75em;
  padding: 0.25em 0.25em 0.25em 0.5em;
  color: white;
  border-bottom: 1px solid white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-of-type {
    border-bottom: none;
  }
`

interface IProps {
  todo: any;
  onChange: any;
  onDelete: any;
}

export default memo(function TodoItem({ todo, onChange, onDelete }: IProps) {
  // @ts-ignore
  const t = this as any;
  console.log('TodoItem', todo.id)
  return (
    <Item key={todo.id}>
      <Checkbox
        id={todo.id}
        label={todo.text}
        checked={todo.completed}
        onChange={onChange.bind(t, todo.id)}
      />
      <Button onClick={onDelete.bind(t, todo.id)}>x</Button>
    </Item>
  )
})
// }, (prevProps: IProps, nextProps: IProps) => prevProps.todo === nextProps.todo)
