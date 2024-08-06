import { useBearStore } from '@/store/counter'

export default function Home() {
  const { bears, increase } = useBearStore()

  function onHandleButtonClick() {
    increase(1)
  }
  return (
    <div>
      <div>this is home</div>
      <div>bears{bears}</div>
      <button onClick={onHandleButtonClick}>increase</button>
    </div>
  )
}
