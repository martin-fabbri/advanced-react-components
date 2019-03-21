import React, { Component } from 'react'
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

export default class Battery extends Component<IProps, IState> {
  private battery: IBattery | undefined
  constructor(props: IProps) {
    super(props)
    this.state = { level: 0, charging: false }
  }
  componentDidMount() {
    navigator.getBattery().then(bat => {
      this.battery = bat
      if (this.battery) {
        this.battery.addEventListener('levelchange', this.handleChange)
        this.battery.addEventListener('chargingchange', this.handleChange)
        this.handleChange(this.battery)
      }
    })
  }
  componentWillUnmount() {
    if (this.battery) {
      this.battery.removeEventListener('levelchange', this.handleChange)
      this.battery.removeEventListener('chargingchange', this.handleChange)
    }
  }
  handleChange = ({ level, charging }: any) => {
    this.setState({ level, charging })
  }
  render() {
    return (
      <section>
        <BatteryIndicator {...this.state} />
      </section>
    )
  }
}
