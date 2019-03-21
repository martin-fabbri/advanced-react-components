import React, { useEffect, useRef, useState } from 'react'
import BatteryIndicator from './BatteryIndicator'

interface NavigatorExt extends Navigator {
  getBattery(): Promise<any>
}
declare var navigator: NavigatorExt

interface IProps {}

interface IState {
  level: number
  charging: boolean
}

interface IBattery {
  level: number
  charging: boolean
  addEventListener(event: string, handler: any): void
  removeEventListener(event: string, handler: any): void
}

export default function Battery(props: IProps) {
  const battery = useRef<IBattery>()
  const [state, setState] = useState({ level: 0, charging: false })

  const handleChange = ({ level, charging }: IBattery) => {
    setState({ level, charging })
  }

  const removeListeners = () => {
    if (battery.current) {
      battery.current.removeEventListener('levelchange', handleChange)
      battery.current.removeEventListener('chargingchange', handleChange)
    }
  }

  useEffect(() => {
    navigator.getBattery().then(bat => {
      battery.current = bat
      if (battery.current) {
        battery.current.addEventListener('levelchange', handleChange)
        battery.current.addEventListener('chargingchange', handleChange)
        handleChange(battery.current)
      }
      return removeListeners
    })
  }, [])

  return (
    <section>
      <BatteryIndicator {...state} />
    </section>
  )
}
