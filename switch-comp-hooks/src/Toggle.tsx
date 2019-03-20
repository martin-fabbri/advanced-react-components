import React, { useContext, useState, useEffect, useMemo } from 'react'
import Switch from './Switch'

interface IContext {
  on: boolean
  toggle: () => void
}

interface IState extends IContext {}

type ChildrenFunc = (context: IContext) => IContext

interface IProps {
  on?: boolean
  onToggle: () => void
  children: React.ReactNode[]
}

const noop = () => {}

const ToggleContext = React.createContext<IContext>({
  on: false,
  toggle: noop,
})

type childrenProps = {
  children: string
}

function useToggleContext() {
  const context = useContext(ToggleContext)
  if (!context) {
    throw new Error(
      'Toggle compound components cannot render outside the Toggle Context.'
    )
  }
  return context
}

function Toggle(props: IProps) {
  const [on, setOn] = useState<boolean>(props.on || false)
  const toggle = () => setOn(!on)
  useEffect(() => {
    props.onToggle()
  }, [on])
  const value = useMemo(() => ({on,toggle}), [on]);
  return (
    <ToggleContext.Provider value={value}>
      {props.children}
    </ToggleContext.Provider>
  )
}

Toggle.On = (children: childrenProps) => {
  const { on } = useToggleContext()
  return on ? <p>{children.children}</p> : null
}

Toggle.Off = (children: childrenProps) => {
  const { on } = useToggleContext()
  return on ? null : <p>{children.children}</p>
}

Toggle.Button = () => {
  const { on, toggle } = useToggleContext()
  return <Switch on={on} onClick={toggle} />
}

export default Toggle
