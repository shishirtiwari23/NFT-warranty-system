import { CurrentContext } from "../../utils";
import { useContext } from "react";

const Home = () => {
  const { connectToMetamask } = useContext(CurrentContext);

  return (
    <div>
      <button onClick={connectToMetamask}>Connect To Metamask</button>
      <div>Home </div>
    </div>
  );
};

export default Home;
