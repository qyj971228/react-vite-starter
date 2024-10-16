import { useBearStore } from "@/store/counter";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import ChartUsage from "@/components/Chart/ChartUsage";

export default function Home() {
  const { bears, increase } = useBearStore();
  const navigate = useNavigate();

  function onHandleButtonClick() {
    increase(1);
  }

  function goToProfile() {
    navigate("/user");
  }

  return (
    <div>
      <div>this is home</div>
      <div>bears{bears}</div>
      <Button onClick={onHandleButtonClick}>increase</Button>
      <Button onClick={goToProfile}>go to user</Button>
      <ChartUsage />
    </div>
  );
}
