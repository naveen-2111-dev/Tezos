"use client"

import React, { useEffect } from 'react';
import { TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';
import {
  NetworkType,
} from "@airgap/beacon-dapp";


const Page = () => {
  const Tezos = new TezosToolkit("https://ghostnet.ecadinfra.com/");
  const [Address, setAddress] = React.useState("");

  const options = {
    name: "my dapp",
    iconUrl: 'https://taquito.io/img/favicon.svg',
    network: { type: NetworkType.GHOSTNET }, 
    enableMetrics: true,
  };

  const wallet = new BeaconWallet(options);

  useEffect(() => {
    const setupWallet = async () => {
      try {
        const activeAccount = await wallet.client.getActiveAccount();
        if (!activeAccount) {
          await wallet.requestPermissions({ network: options.network });
        }
        Tezos.setWalletProvider(wallet);
      } catch (error) {
        console.error("Error setting up wallet:", error);
      }
    };

    setupWallet();
  }, [wallet]); 


  const handleWallet  =async()=>{
    try{
      await wallet.requestPermissions({
        network:{
          type: NetworkType.GHOSTNET,
          rpcUrl: "https://ghostnet.ecadinfra.com",
        }
      })
      const address = await wallet.getPKH();
      setAddress(address);
    }catch(err){
      console.log("error",err)
    }
  }

  return (
    <div>
      <h1>Hello</h1>
      {Address && <p>Your address: {Address}</p>}
      <button onClick={handleWallet}>Connect Wallet</button>
    </div>
  );
};

export default Page;
