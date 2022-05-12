const tokenContract = artifacts.require("ZToken_V1");

module.exports = async function(deployer){
    await deployer.deploy(tokenContract);
}
