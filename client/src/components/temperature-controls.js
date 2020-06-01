import React from "react"
import styled from "styled-components"

import Button from "./button"

const ControlsWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 200px;
  justify-content: space-between;
  margin-top: 20px;
`

const TemperatureControls = ({ onIncrease, onDecrease }) => (
  <ControlsWrapper>
    <Button key="+" onClick={onDecrease}>
      -
    </Button>
    <Button key="-" onClick={onIncrease}>
      +
    </Button>
  </ControlsWrapper>
)

export default TemperatureControls
