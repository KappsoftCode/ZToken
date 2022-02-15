const assert = require("assert");
const proxy = artifacts.require("ZProxy");
const ZToken = artifacts.require("ZToken_V1");

let ZTokenInstance;
let proxyInstance

beforeEach(async () => {
    proxyInstance = await proxy.deployed();
    ZTokenInstance = await ZToken.at(proxyInstance.address);
})

contract("ZToken Test", async accounts => {

    it('should initialize only once', async () => {
        try {
            await ZTokenInstance.initialize("Z Token", "Z", web3.utils.toWei('4000000000000000'));
            assert.fail()
        } catch (error) {
            assert.strictEqual(error.message, 'Returned error: VM Exception while processing transaction: revert Initializable: contract is already initialized -- Reason given: Initializable: contract is already initialized.')
        }
    })

    it("should return token initial call data", async () => {
        const name = await ZTokenInstance.name.call();
        const symbol = await ZTokenInstance.symbol.call();
        const totalSupply = await ZTokenInstance.totalSupply.call();
        const decimals = await ZTokenInstance.decimals.call();
        const owner = await ZTokenInstance.owner.call();
        const governor = await ZTokenInstance.governor();
        const initialDate = await ZTokenInstance.initialDate.call();
        const releaseDate = await ZTokenInstance.releaseDate.call();
        const initialDateNumber = web3.utils.hexToNumber(web3.utils.toHex(initialDate));
        assert.strictEqual("Z Token", name);
        assert.strictEqual("Z", symbol);
        assert.strictEqual("4000000000000000", web3.utils.fromWei(totalSupply, 'ether'));
        assert.strictEqual(18, web3.utils.hexToNumber(decimals));
        assert.strictEqual(accounts[0], owner);
        assert.strictEqual(accounts[0], governor);
    });

    it('should check total supply minted to owner', async () => {
        const owner = await ZTokenInstance.owner.call();
        const ownerBalance = await ZTokenInstance.balanceOf(owner);
        const totalSupply = await ZTokenInstance.totalSupply.call();
        assert.strictEqual(web3.utils.fromWei(totalSupply, 'ether'), web3.utils.fromWei(ownerBalance, 'ether'))
    });

    it('should transfer tokens', async () => {
        const balanceSpenderBefore = await ZTokenInstance.balanceOf(accounts[0]);
        const balanceRecieverBefore = await ZTokenInstance.balanceOf(accounts[1]);
        await ZTokenInstance.transfer(accounts[1], web3.utils.toWei('10000', 'ether'));
        const balanceSpenderAfter = await ZTokenInstance.balanceOf(accounts[0]);
        const balanceRecieverAfter = await ZTokenInstance.balanceOf(accounts[1]);
        assert.strictEqual('4000000000000000', web3.utils.fromWei(balanceSpenderBefore, 'ether'));
        assert.strictEqual('3999999999990000', web3.utils.fromWei(balanceSpenderAfter, 'ether'));
        assert.strictEqual('0', web3.utils.fromWei(balanceRecieverBefore, 'ether'));
        assert.strictEqual('10000', web3.utils.fromWei(balanceRecieverAfter, 'ether'));

    });

    it('should approve spending', async () => {
        await ZTokenInstance.approve(accounts[1], web3.utils.toWei('1000', 'ether'));
        const allowance = await ZTokenInstance.allowance(accounts[0], accounts[1]);
        assert.strictEqual('1000', web3.utils.fromWei(allowance, 'ether'))
    });

    it('is possible to increase or decrease allowance', async () => {
        await ZTokenInstance.decreaseAllowance(accounts[1], web3.utils.toWei('100', 'ether'));
        let allowance = await ZTokenInstance.allowance(accounts[0], accounts[1]);
        assert.strictEqual('900', web3.utils.fromWei(allowance, 'ether'));
        await ZTokenInstance.increaseAllowance(accounts[1], web3.utils.toWei('200', 'ether'));
        allowance = await ZTokenInstance.allowance(accounts[0], accounts[1]);
        assert.strictEqual('1100', web3.utils.fromWei(allowance, 'ether'));
    });

    it('allows transfer from approved spender', async () => {
        ``
        await ZTokenInstance.transferFrom(accounts[0], accounts[2], web3.utils.toWei('1000'), { from: accounts[1] });
        const recieverBalance = await ZTokenInstance.balanceOf(accounts[2]);
        const allowance = await ZTokenInstance.allowance(accounts[0], accounts[1]);
        assert.strictEqual('1000', web3.utils.fromWei(recieverBalance, 'ether'));
        assert.strictEqual('100', web3.utils.fromWei(allowance));

    });

    it('is burnable', async () => {
        await ZTokenInstance.burn(web3.utils.toWei('1000', 'ether'), { from: accounts[1] });
        const balance = await ZTokenInstance.balanceOf(accounts[1]);
        const totalSupply = await ZTokenInstance.totalSupply.call();
        assert.strictEqual('9000', web3.utils.fromWei(balance, 'ether'));
        assert.strictEqual('3999999999999000', web3.utils.fromWei(totalSupply, 'ether'));
    });

    it('allows burn from approved accounts', async () => {
        await ZTokenInstance.burnFrom(accounts[0], web3.utils.toWei('100', 'ether'), { from: accounts[1] });
        const balance = await ZTokenInstance.balanceOf(accounts[0]);
        const totalSupply = await ZTokenInstance.totalSupply.call();
        assert.strictEqual('3999999999988900', web3.utils.fromWei(balance, 'ether'));
        assert.strictEqual('3999999999998900', web3.utils.fromWei(totalSupply, 'ether'));
        const allowance = await ZTokenInstance.allowance(accounts[0], accounts[1]);
        assert.strictEqual('0', web3.utils.fromWei(allowance));
    })

    it('is Pausable', async () => {
        let paused = await ZTokenInstance.paused.call();
        assert.strictEqual(false, paused);
        await ZTokenInstance.pause();
        paused = await ZTokenInstance.paused.call();
        assert.ok(paused)
    });

    it("block transer during paused ", async () => {
        try {
            await ZTokenInstance.transfer(accounts[1], web3.utils.toWei('10000', 'ether'));
            assert.fail()
        } catch (error) {
            assert.strictEqual(error.message, 'Returned error: VM Exception while processing transaction: revert ERC20Pausable: token transfer while paused -- Reason given: ERC20Pausable: token transfer while paused.')
        }

    });

    it('is ownable', async () => {
        try {
            await ZTokenInstance.unpause({ from: accounts[1] });
            assert.fail();
        } catch (error) {
            if (error.code === 'ERR_ASSERTION')
                assert.fail('Test Failed')
            else {
                const unpause = await ZTokenInstance.unpause({ from: accounts[0] });
                assert.ok(unpause)
            }

        }
    });

    it('allow setting governor', async () => {
        try {
            await ZTokenInstance.setGovernor(accounts[1], { from: accounts[2] });
            assert.fail()
        } catch (error) {
            assert.strictEqual(error.message, 'Returned error: VM Exception while processing transaction: revert Ownable: caller is not the owner -- Reason given: Ownable: caller is not the owner.');
            const setGovernor = await ZTokenInstance.setGovernor(accounts[1], { from: accounts[0] });
            assert.ok(setGovernor);
        }
    });

    it('allow adding holder accounts', async () => {
        try {
            await ZTokenInstance.addHolder(accounts[4], { from: accounts[2] });
            assert.fail();
        } catch (error) {
            assert.strictEqual(error.message, 'Returned error: VM Exception while processing transaction: revert Caller is not an admin -- Reason given: Caller is not an admin.');
            const addHolderByOwner = await ZTokenInstance.addHolder(accounts[4], { from: accounts[0] });
            const addHolderByGovernor = await ZTokenInstance.addHolder(accounts[5], { from: accounts[1] });
            assert.ok(addHolderByOwner);
            assert.ok(addHolderByGovernor);
            const removeHolderByOwnwer = await ZTokenInstance.removeHolder(accounts[4], { from: accounts[0] });
            const removeHolderByGovernor = await ZTokenInstance.removeHolder(accounts[5], { from: accounts[1] });
            assert.ok(removeHolderByOwnwer);
            assert.ok(removeHolderByGovernor);
        }
    });

    it('allows locking of coins', async () => {
        await ZTokenInstance.addHolder(accounts[4], { from: accounts[0] });
        await ZTokenInstance.transfer(accounts[4], web3.utils.toWei('10000', 'ether'));
        try {
            await ZTokenInstance.transfer(accounts[0], web3.utils.toWei('10000', 'ether'), { from: accounts[4] });
        } catch (error) {
            assert.strictEqual(error.message, "Returned error: VM Exception while processing transaction: revert Holders can't transfer before release Date  -- Reason given: Holders can't transfer before release Date .");
        }

    });


})