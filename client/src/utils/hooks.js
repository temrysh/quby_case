import { useState, useEffect } from "react"

export const useStream = (stream$) => {
  const [state, setState] = useState()
  useEffect(() => {
    const subscription = stream$.subscribe(setState)
    return () => subscription.unsubscribe()
  }, [stream$])
  return [state, (s) => stream$.next(s)]
}
