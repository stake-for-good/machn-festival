// SPDX-License-Identifier: MIT 
pragma solidity >=0.7.0 <0.9.0;

contract StakeForGood{

    struct Initiative{
        bytes32 name;
        uint256 totalStaked;
        uint256 interestCollected;
        address owner;
    }

    struct User{
        uint256 totalStaked;
        mapping(bytes32 => uint256) stakedPerInitiative;
    }

    mapping(address => User) public users;

    mapping(bytes32 => Initiative) public initiatives;
    bytes32[] public initiativeNames;

    function getInitiativeNames() public view returns(bytes32[] memory){
        return initiativeNames;
    }

    function getInitiative(bytes32 _initiativeName) public view returns(Initiative memory){
        return initiatives[_initiativeName];
    }

     function getInitiativeOwner(bytes32 _initiativeName) public view returns(address){
        return initiatives[_initiativeName].owner;
    }

    function createInitiative(bytes32 _initiativeName) public{
        initiatives[_initiativeName].name = _initiativeName;
        initiativeNames.push(_initiativeName);
        initiatives[_initiativeName].owner = msg.sender;
    }

    function stake(bytes32 _initiativeName) public payable{
        require(msg.value > 0, "You need to stake more than 0");
        users[msg.sender].totalStaked += msg.value;
        users[msg.sender].stakedPerInitiative[_initiativeName] += msg.value;
        initiatives[_initiativeName].totalStaked += msg.value;
        initiatives[_initiativeName].name = _initiativeName;
        if(initiatives[_initiativeName].totalStaked == msg.value) {
            initiativeNames.push(_initiativeName);
        }
    }

    function withdraw(bytes32 _initiativeName) public{
        require(users[msg.sender].stakedPerInitiative[_initiativeName] > 0, "You need to stake more than 0");
        uint256 amount = users[msg.sender].stakedPerInitiative[_initiativeName];
        users[msg.sender].stakedPerInitiative[_initiativeName] = 0;
        users[msg.sender].totalStaked -= amount;
        initiatives[_initiativeName].totalStaked -= amount;
        payable(msg.sender).transfer(amount);
    }
} 

