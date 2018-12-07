import globalState from '../globalState'

/**
 * If `timer` parameter is set, returns number of milliseconds of timer remained.
 * Otherwise, returns undefined.
 */
export const getTimerLeft = () => {
  return globalState.timeout && globalState.timeout.getTimerLeft()
}

/**
 * Stop timer. Returns number of milliseconds of timer remained.
 * If `timer` parameter isn't set, returns undefined.
 */
export const stopTimer = () => {
  return globalState.timeout && globalState.timeout.stop()
}

/**
 * Resume timer. Returns number of milliseconds of timer remained.
 * If `timer` parameter isn't set, returns undefined.
 */
export const resumeTimer = () => {
  return globalState.timeout && globalState.timeout.start()
}

/**
 * Resume timer. Returns number of milliseconds of timer remained.
 * If `timer` parameter isn't set, returns undefined.
 */
export const toggleTimer = () => {
  const timer = globalState.timeout
  return timer && (timer.running ? timer.stop() : timer.start())
}

/**
 * Increase timer. Returns number of milliseconds of an updated timer.
 * If `timer` parameter isn't set, returns undefined.
 */
export const increaseTimer = (n) => {
  return globalState.timeout && globalState.timeout.increase(n)
}

/**
 * Retun boolean with status of timer. Returned value is true (timer running)
 * or false (timer paused). If `timer` parameter isn't set, returns undefined
 */
export const getTimerRunningStatus = () => {
  return globalState.timeout && globalState.timeout.getTimerRunningStatus()
}
