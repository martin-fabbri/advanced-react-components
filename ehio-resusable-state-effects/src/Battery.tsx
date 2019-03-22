import React, { useEffect, useRef, useState } from 'react'
import BatteryIndicator from './BatteryIndicator'

interface NavigatorExt extends Navigator {
  getBattery(): Promise<any>
}
declare var navigator: NavigatorExt

interface IProps {}

interface IBatteryState {
  level: number
  charging: boolean
}

interface IBattery {
  level: number
  charging: boolean
  addEventListener(event: string, handler: any): void
  removeEventListener(event: string, handler: any): void
}

const useBattery = () => {
  const battery = useRef<IBattery>()
  const [state, setState] = useState<IBatteryState>({
    level: 0,
    charging: false,
  })

  const handleChange = ({ level, charging }: IBattery) => setState({ level, charging })

  useEffect(() => {
    navigator.getBattery().then(bat => {
      battery.current = bat
      if (battery.current) {
        battery.current.addEventListener('levelchange', handleChange)
        battery.current.addEventListener('chargingchange', handleChange)
        handleChange(battery.current)
      }
    })
    return () => {
      if (battery.current) {
        battery.current.removeEventListener('levelchange', handleChange)
        battery.current.removeEventListener('chargingchange', handleChange)
      }
    }
  }, [])

  return state
}

export default function Battery(props: IProps) {
  const batteryState = useBattery()

  return (
    <section>
      <BatteryIndicator {...batteryState} />
    </section>
  )
}
