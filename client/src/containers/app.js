import React, { useEffect } from "react"

import Wrapper from "../components/wrapper"
import CurrentTemperature from "../components/current-temperature"
import SetTemperature from "../components/set-temperature"
import LatestUpdateTime from "../components/latest-update-time"
import TemperatureControls from "../components/temperature-controls"

import { startPullingWithDelay$, changeTemperature$ } from "../state/local"
import {
  currentTemperature$,
  setTemperature$,
  latestUpdateTime$,
} from "../state/api"

import { useStream } from "../utils/hooks"

const App = () => {
  const [currentTemperature] = useStream(currentTemperature$)
  const [setTemperature] = useStream(setTemperature$)
  const [latestUpdateTime] = useStream(latestUpdateTime$)
  const increase = () => changeTemperature$.next(0.5)
  const decrease = () => changeTemperature$.next(-0.5)

  useEffect(() => {
    startPullingWithDelay$.next(0)
  }, [])

  return (
    <Wrapper>
      <SetTemperature>{setTemperature}</SetTemperature>
      <CurrentTemperature>{currentTemperature}</CurrentTemperature>
      <LatestUpdateTime>Latest update at {latestUpdateTime}</LatestUpdateTime>
      <TemperatureControls onIncrease={increase} onDecrease={decrease} />
    </Wrapper>
  )
}

export default App
