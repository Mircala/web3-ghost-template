import { useCoinbaseWallet } from "@thirdweb-dev/react";

export const ConnectCoinbaseWallet = () => {
  const connectWithCoinbaseWallet = useCoinbaseWallet();

  return (
    <button style={{ backgroundColor: "transparent" }} onClick={connectWithCoinbaseWallet}>Coinbase Wallet</button>
  );
};