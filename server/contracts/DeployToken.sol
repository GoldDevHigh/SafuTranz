//SPDX-License-Identifier: MIT
pragma solidity 0.8.13;
import "./Token.sol";

contract DeployToken {

    address public feeWallet=0xC240181D20D4b4124db6BEA1344d2C1Fa0574979;
    
    function deploy() payable external returns (address tokenAddress)
        {
            require(msg.value>=0.3 ether, "not enough fee");
            payable(feeWallet).transfer(msg.value);
            bytes memory bytecode = type(StandardToken).creationCode;
            bytes32 salt = keccak256(
                abi.encodePacked(
                    msg.sender,
                    address(this),
                    block.number
                )
            );
            assembly {
                tokenAddress := create2(0, add(bytecode, 32), mload(bytecode), salt)
            }
            return tokenAddress;
        }
}