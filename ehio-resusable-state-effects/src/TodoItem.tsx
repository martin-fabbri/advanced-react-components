import React, {memo, useRef, useState, useEffect} from 'react'
import styled from '@emotion/styled'
import { keyframes } from "@emotion/core"
import Checkbox from './Checkbox'
import elementResizeEvent from 'element-resize-event'

const Button = styled('button')`
  font-weight: 400;
  color: white;
  font-size: 0.75em;
  border: 1px solid transparent;
  background-color: transparent;
  margin: 5px;
  cursor: pointer;
`

const moveAnimation = keyframes`
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 50px 50px;
  }
`;

export const Item = styled("li")`
  font-size: 1.75em;
  padding: 0.25em 0.25em 0.25em 0.5em;
  color: white;
  border-bottom: 1px solid white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  &:before {
    content: ${(props: any) => (props.striped ? `""` : "normal")};
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-image: linear-gradient(
      -45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
    );
    background-size: 53px 53px;
    animation: move 2s linear infinite;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    overflow: hidden;
    animation: ${(props: any) => (props.animating ? moveAnimation : "none")} 2s linear
      infinite;
  }

  &:last-of-type {
    border-bottom: none;
  }
`;


interface IProps {
  todo: any;
  onChange: any;
  onDelete: any;
}

const noop = () => {};

export default memo(function TodoItem({ todo, onChange, onDelete }: IProps) {
  // @ts-ignore
  const t = this as any;
  console.log('TodoItem', todo.id)
  const wrapperRef = useRef<Element>();
  const [{height, width}, setSize] = useState({width: 0, height: 0});
  useEffect(() => {
    const element = wrapperRef.current;
    if (!element) {
      return;
    }
    const updateSize = () => {
      setSize({
        height: element ? element.clientHeight : 0,
        width: element ? element.clientWidth : 0,
      })
    }
    updateSize()
    elementResizeEvent(element, updateSize)
    // @ts-ignore
    return () => elementResizeEvent.unbind(wrapperRef.current, noop)
  }, [])
  return (
    <Item key={todo.id} striped={height > 53} animating={true} ref={wrapperRef}>
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
