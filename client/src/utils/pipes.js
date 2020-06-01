import { pipe, from, throwError } from "rxjs"
import { switchMap, tap, retry, map, withLatestFrom } from "rxjs/operators"

export const datePipe = pipe(
  map((ts) => new Date(ts)),
  map((d) => `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`)
)

export const fetchPipe = pipe(
  switchMap(() =>
    from(fetch("http://localhost:9090/")).pipe(
      tap(({ status }) => {
        if (status === 202) throw throwError("202")
      }),
      switchMap((res) => from(res.json()))
    )
  ),
  retry()
)

export const patchPipe = pipe(
  switchMap((currentSetpoint) =>
    from(
      fetch("http://localhost:9090/", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ currentSetpoint }),
      })
    )
  ),
  retry()
)

export const changePipe = (stream$) =>
  pipe(
    withLatestFrom(stream$),
    map(([next, cur]) => cur * 10 + next * 10),
    map((n) => n / 10),
    tap((n) => stream$.next(n))
  )
