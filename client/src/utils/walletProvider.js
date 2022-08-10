import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import WalletConnect from "@walletconnect/web3-provider";

export const providerOptions = {
 walletlink: {
   package: CoinbaseWalletSDK, 
   options: {
     appName: "Web 3 Modal",
     infuraId: "1aeac4a54ffc4cba91d13f02b8a4f1a6"
   }
 },
 walletconnect: {
   package: WalletConnect, 
   options: {
     infuraId: "1aeac4a54ffc4cba91d13f02b8a4f1a6"
   }
 }
};