import { Subject, BehaviorSubject, timer } from "rxjs"
import { switchMap, pluck, map, tap, debounceTime } from "rxjs/operators"

import { startPullingWithDelay$, changeTemperature$ } from "./local"
import { datePipe, fetchPipe, changePipe, patchPipe } from "../utils/pipes"

export const currentTemperature$ = new BehaviorSubject(null)
export const setTemperature$ = new BehaviorSubject(null)
export const latestUpdateTime$ = new BehaviorSubject(null)
export const apiState$ = new Subject()

apiState$.pipe(pluck("currentTemp")).subscribe(currentTemperature$)
apiState$.pipe(pluck("currentSetpoint")).subscribe(setTemperature$)
apiState$.pipe(pluck("timestamp"), datePipe).subscribe(latestUpdateTime$)

startPullingWithDelay$
  .pipe(switchMap((delay) => timer(delay, 2000).pipe(fetchPipe)))
  .subscribe(apiState$)

changeTemperature$
  .pipe(
    tap(() => startPullingWithDelay$.next(1500)),
    changePipe(setTemperature$),
    debounceTime(400),
    patchPipe
  )
  .subscribe()
