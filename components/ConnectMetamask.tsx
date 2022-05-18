import { ghostAPIUrl } from "@lib/processEnv";
import { useMetamask } from "@thirdweb-dev/react";

export const ConnectMetamask = () => {
  const connectWithMetamask = useMetamask();

  return(
    <button style={{ backgroundColor: "transparent" }} onClick={() => connectWithMetamask()}>Metamask</button>
  )
};