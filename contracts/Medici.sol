
/**
 * @file Medici.sol
 * @author Paul Darbyshire <paul@lancorscientific.com>
 * @copyright Lancor Scientific Ltd. (c) 2018.
 * @version 1.0.1
 */
 
pragma solidity 0.4.24;

import "../node_modules/openzeppelin-solidity/contracts/lifecycle/Pausable.sol";
import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";

/**
 * @title Medici Pre-ICO Smart Contract
 * @dev The contract accepts deposits in ETH and then transfers them immediately to the designated 
 * wallet  address. Once the Cap or Closing Time is reached the Pre-ICO is finished. 
 * The account that deploys the contract is set as the owner. The owner is the only one who has 
 * the authority to set the following Parameters and Methods during the Pre-ICO. 
 * Parameters:
 - setClosingTime()
 - setCap()
 - setBonus()
 - setETHMin()
 * Methods:
 - pause()
 - unpause()
 */

 /**
 * @title Medici
 * @dev Base contract. 
 */
contract Medici is Pausable {
    using SafeMath for uint256; /// Avoids over and underflow issues

    uint256 public openingTime; /// Opening time [epoch]
    uint256 public closingTime; /// Closing time [epoch]
    address public wallet;      /// Wallet address to receive ETH
    uint256 public cap;         /// Cap amount (ETH)
    uint256 public bonus;       /// bonus amount (%)
    uint256 public ethMin;      /// minimum ETH amount accepted (ETH)
    uint256 public ETHRaised;   /// Amount of ETH raised
    
    /// Mapping of each ETH deposit to buyer address.
    mapping(address => uint256) public buyers; 
    // TODO: Back this up with address[] array or mapped array address, deposit
    
    /// Log events
    event ETHReceived(address indexed buyer, uint256 amount);
    event ETHTransfer(string message);
    event ResetCap(string message);
    event ResetBonus(string message);
    event ResetETHMIn(string message);
   
    /**
    * @dev Constructor for the Medici contract.
    * @param _openingTime   Opening time
    * @param _closingTime   Closing time
    * @param _wallet        Wallet address to receive ETH
    * @param _cap           Cap amount (ETH)
    * @param _bonus         Bonus amount (%)
    * @param _ethMin        Minimum ETH deposit accepted (ETH)
    */
    constructor(uint256 _openingTime, uint256 _closingTime, address _wallet, uint256 _cap, uint256 _bonus, uint256 _ethMin) public 
    {
        /// Checks...
        // solium-disable-next-line security/no-block-members
        require(_openingTime >= block.timestamp); /// POSIX timestamp
        require(_closingTime >= _openingTime);
        require(_wallet != address(0)); 
        require(_cap > 0);
        require(_bonus > 0);
        require(_ethMin > 0);

        openingTime = _openingTime;
        closingTime = _closingTime;
        wallet = _wallet;
        cap = _cap;
        bonus = _bonus;
        ethMin = _ethMin;
    }

    /**
    * @dev Fallback function for any ETH send transaction.
    */
    function () external payable {
        // Log ETH received through fallback function.
        emit ETHReceived(msg.sender, msg.value);
    }

    /**
    * @dev Set new Closing Tme 
    * @param _closingTime Closing time [Epoch]
    */
    function setClosingTime(uint256 _closingTime) external onlyOwner {
        /// Checks...
        require(_closingTime >= openingTime);
        // solium-disable-next-line security/no-block-members
        require(_closingTime >= block.timestamp);
        require(!hasClosed());

        closingTime = _closingTime;
    }

    /**
    * @dev Set new cap (ETH).
    * @param _cap Cap amount
    */
    function setCap(uint256 _cap) external onlyOwner {
        /// Checks...
        require(_cap != cap);
        emit ResetCap("Reset cap");
        cap = _cap;
    }

    /**
    * @dev Set new bonus (%).
    * @param _bonus Bonus amount
    */
    function setBonus(uint256 _bonus) external onlyOwner {
        /// Checks...
        require(_bonus != bonus);
        emit ResetBonus("Reset bonus");
        bonus = _bonus;
    }

    /**
    * @dev Set new ETH minium amount (ETH).
    * @param _ethMin ETH minimum amount
    */
    function setETHMin(uint256 _ethMin) external onlyOwner {
        /// Checks...
        require(_ethMin != ethMin);
        emit ResetETHMIn("Reset ETH Minimum");
        ethMin = _ethMin;
    }

    /**
    * @dev Checks whether cap has reached.
    * @return Cap reached
    */
    function capReached() public view returns (bool) {
        return ETHRaised >= cap;
    }

    /**
    * @dev Checks whether Pre-ICO closed.
    * @return Has Pre-ICO time elapsed
    */
    function hasClosed() public view returns (bool) {
        // solium-disable-next-line security/no-block-members
        return block.timestamp > closingTime; /// POSIX timestamp
    }
    
    /**
    * @dev Deposit ETH into wallet address.
    */
    function deposit() public payable whenNotPaused {
        // Checks...
        require(msg.sender != address(0) && msg.sender != address(this));
        require(msg.value > 0);
        require(msg.value >= ethMin);
        require(!capReached());
        require(!hasClosed());
        
        /// Increase ETH raised by deposit amount
        ETHRaised = ETHRaised.add(msg.value);

        /// Store buyers address & ETH amount deposited
        buyers[msg.sender] += msg.value; 
        
        /// Immediately transfer ETH deposited to wallet address
        forward(); /// Avoids re-entrancy attack!
        
        emit ETHTransfer("Transferred ETH to wallet");
    }
    
    /**
    * @dev Forward ETH to wallet address.
    */
    function forward() internal {
        wallet.transfer(msg.value);
    }
}
