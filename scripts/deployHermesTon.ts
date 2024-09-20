import { toNano } from '@ton/core';
import { HermesTon } from '../wrappers/HermesTon';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const hermesTon = provider.open(
        HermesTon.createFromConfig(
            {
                id: Math.floor(Math.random() * 10000),
                counter: 0,
            },
            await compile('HermesTon')
        )
    );

    await hermesTon.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(hermesTon.address);

    console.log('ID', await hermesTon.getID());

    
}
