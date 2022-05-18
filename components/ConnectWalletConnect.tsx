import { useWalletConnect } from "@thirdweb-dev/react";

export const ConnectWalletConnect = () => {
  const connectWithWalletConnect = useWalletConnect();

  return (
    <button style={{ backgroundColor: "transparent" }} onClick={connectWithWalletConnect}>WalletConnect</button>
  );
};