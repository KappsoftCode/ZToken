const proxyContract = artifacts.require("ZProxy");
const tokenContract = artifacts.require("ZToken_V1");
const adminContract = artifacts.require("ZProxyAdmin");

module.exports = async function(deployer){
    const contract = new web3.eth.Contract(tokenContract.abi)
    const data = contract.methods.initialize("Z Token","Z",web3.utils.toWei('4000000000000000')).encodeABI();
    await deployer.deploy(adminContract);
    adminInstance = await adminContract.deployed();
    await deployer.deploy(tokenContract);
    await deployer.deploy(proxyContract,tokenContract.address,adminContract.address,data);
}
