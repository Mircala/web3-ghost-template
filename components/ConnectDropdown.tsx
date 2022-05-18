import React, { useState } from "react";
import styled from "styled-components";
import { ConnectWalletConnect } from "./ConnectWalletConnect";
import { ConnectCoinbaseWallet } from "./ConnectCoinbaseWallet";
import { ConnectMetamask } from "./ConnectMetamask";

const Main = styled("div")`
  font-family: sans-serif;
  height: 20vh;
`;

const DropDownContainer = styled("div")`
  width: 11em;
  margin: 0 auto;
  border-radius: 20px;
`;

const DropDownHeader = styled("div")`
  margin-bottom: 0.8em;
  padding: 1em 1.5em;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 400;
  font-size: 14px;
  color: #000000;
  border-radius: 20px;
  background-color: #ffffff;
  width: auto;
  text-align: center;
`;

const DropDownListContainer = styled("div")`
  position: absolute;
  z-index: 100;
  min-width: 11em;
  max-width: 11em;
  border-radius: 20px;
  `;

const DropDownList = styled("ul")`
  padding: 0;
  margin: 0;
  padding: 0.1em 1em;
  background: #ffffff;
  box-sizing: border-box;
  color: #3faffa;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
  border-radius: 20px;
`;

const ListItem = styled("li")`
  list-style: none;
  margin-bottom: 0.8em;
  background-color: black;
  &:hover {
    color: #ffffff;
  }
  border-radius: 11px;
  padding: 0.3em 1em;
`;

export default function ConnectDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const toggling = () => setIsOpen(!isOpen);

  return (
    <Main>
      <DropDownContainer>
        <DropDownHeader onClick={toggling}>
          Connect wallet
        </DropDownHeader>
        {isOpen && (
          <DropDownListContainer>
            <DropDownList>
                <ListItem>
                    <ConnectCoinbaseWallet />
                </ListItem>
                <ListItem>
                    <ConnectMetamask />
                </ListItem>
                <ListItem>
                    <ConnectWalletConnect />
                </ListItem>
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
    </Main>
  );
}