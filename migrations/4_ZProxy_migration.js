const proxyContract = artifacts.require("ZProxy");
const tokenContract = artifacts.require("ZToken_V1");
const adminContract = artifacts.require("ZProxyAdmin");

module.exports = async function (deployer, network) {
  let data;
  const contract = new web3.eth.Contract(tokenContract.abi);
  if (network === "ethereum" || network === "rinkeby") {
    data = contract.methods
      .initialize("Z Token", "Z", web3.utils.toWei("2000000000000000"))
      .encodeABI();
  } else {
    data = contract.methods
      .initialize("Z Token", "Z", web3.utils.toWei("1000000000000000"))
      .encodeABI();
  }

  await deployer.deploy(
    proxyContract,
    tokenContract.address,
    adminContract.address,
    data
  );
};
