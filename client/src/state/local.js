import { Subject } from "rxjs"
import { take, mapTo } from "rxjs/operators"

export const startPullingWithDelay$ = new Subject()
export const changeTemperature$ = new Subject()
