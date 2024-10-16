import { useState } from 'react'

type UseOppResult<T, K> = [T | K | boolean, () => void, () => void, () => void]

function useOpp<T = false, K = true>(status?: [T, K]): UseOppResult<T, K> {
  const DEFAULT: T | false = status ? status[0] : false
  const OPPOSITE: K | true = status ? status[1] : true

  const [state, setState] = useState<T | K | boolean>(DEFAULT)

  function opposite() {
    setState(state === DEFAULT ? OPPOSITE : DEFAULT)
  }

  function recover() {
    setState(DEFAULT)
  }

  function reverse() {
    setState(OPPOSITE)
  }

  return [state, recover, reverse, opposite]
}

export default useOpp
