import ConnectDropdown from "./ConnectDropdown";

import {
    useAddress,
    useDisconnect,
} from '@thirdweb-dev/react';

export const CreateMagicLink = () => {
    
    const address = useAddress();
    const disconnectWallet = useDisconnect();

    if (address) {
        return (
          <div style={{ backgroundColor: "rgba(0, 0, 0, 0)", color: "white", zIndex: "10", borderRadius: 11, padding: "0px 28px", maxWidth: "154px", margin: "auto" }} >
            <button style={{ fontSize: 16, borderRadius: 11, backgroundColor: 'black', color: "white", padding: "5px 11px", margin: "auto" }} onClick={disconnectWallet}>Disconnect</button>
          </div>
        );
    }
    
    return(
        <ConnectDropdown />
    )
}