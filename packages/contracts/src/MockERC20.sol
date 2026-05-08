// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "solmate/src/tokens/ERC20.sol";

contract MockERC20 is ERC20 {
    constructor() ERC20("Mock ZEN", "mZEN", 18) {
        _mint(msg.sender, 1000000 * 10**18);
    }
    
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
