const adminContract = artifacts.require("ZProxyAdmin");

module.exports = async function(deployer){
    await deployer.deploy(adminContract);
}