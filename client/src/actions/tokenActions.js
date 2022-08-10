import axios from 'axios';
import Web3 from 'web3';

import { GET_TOKEN, TOKEN_LOADING, SET_TOKEN, TOKEN_SIGN_DATA } from './types';

export const getTokenCurrent = () => (dispatch) => {
	dispatch(setTokenLoading());
	//   axios
	//     .get(`/api/getTokenContract`)
	//     .then(async (res) => {
	//       const bytecode = res.data.evm.bytecode.object;
	//       const abi = res.data.abi;
	//       const chainID = signer.provider._network.chainId; // TODO

	//       const web3 = new Web3(Web3.givenProvider);
	//       const deploy_contract = new web3.eth.Contract(abi);

	//       let payload = {
	//         data: "0x" + bytecode,
	//         arguments: [tokenName, symbol, decimals, totalSupply],
	//       };

	//       let parameter = {
	//         from: userAddress,
	//         gas: web3.utils.toHex(5000000),
	//         value: web3.utils.toWei("0.05", "ether"),
	//         gasPrice: web3.utils.toHex(web3.utils.toWei("50", "gwei")),
	//       };

	//       console.log(parameter);

	//       deploy_contract
	//         .deploy(payload)
	//         .send(parameter, (err, transactionHash) => {
	//           console.log("Transaction Hash :", transactionHash);
	//         })
	//         .on("confirmation", () => {})
	//         .then((newContractInstance) => {
	//           // console.log(newContractInstance);
	//           console.log(
	//             "Deployed Contract Address : ",
	//             newContractInstance.options.address
	//           );
	//           this.setState({
	//             tokenAddress: newContractInstance.options.address,
	//           });
	//           window.localStorage.setItem(
	//             "tokenAddress",
	//             newContractInstance.options.address
	//           );
	//           axios
	//             .post(`/api/addTokenAddress`, {
	//               userAddress: userAddress,
	//               tokenAddress: newContractInstance.options.address,
	//               chainID: chainID,
	//             })
	//             .then(() => {
	//               console.log("success");
	//               window.location.href = `/TokenRes`;
	//             })
	//             .catch((err) => console.log(err));
	//         });
	//     })
	//     .catch((err) => console.log(err));
};

export const getUserToken = (data) => (dispatch) => {
	console.log(data);
	dispatch({
		type: TOKEN_SIGN_DATA,
		payload: data
	});
};

export const setTokenLoading = () => {
	return {
		type: TOKEN_LOADING
	};
};
