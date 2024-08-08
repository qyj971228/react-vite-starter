import { useBearStore } from '@/store/counter'
import { Button } from 'antd'

export default function Home() {
  const { bears, increase } = useBearStore()

  function onHandleButtonClick() {
    increase(1)
  }
  return (
    <div>
      <div>this is home</div>
      <div>bears{bears}</div>
      <Button onClick={onHandleButtonClick}>increase</Button>
    </div>
  )
}
