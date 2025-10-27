import { Transaction } from "./transaction"

export type minedBlock = {
    //Head
    previousHash: string,
    hash: string,
    nonce: number,
    timeStamp: string
    difficulty: number,

    //Body
    minerID: number,
    transactions: string,
}

export type unminedBlock = {
    //Head
    previousHash: string,
    //   ohne:
    //hash: string,
    nonce: number,
    timeStamp: string
    difficulty: number,

    //Body
    minerID: number,
    transactions: string,
}

export class Blockchain {
    public chain: minedBlock[] = []
    public html: string = ""
    constructor() { }

    addBlock(newBlock: minedBlock) {
        this.chain.push(newBlock)

        let txArray: Transaction[] = []
        const parsed = JSON.parse(newBlock.transactions)
        txArray = parsed.map((tx: any) => new Transaction(tx.sourceWalletID, tx.targetWalletID, tx.value, tx.fee))

        const transactionsHTML = txArray.map(tx => tx.outputHTML()).join("")

        this.html += `
        <div class="blockchain-block">
            <div class="block-info">
                <h3 style="margin-bottom: 8px;">Block #${this.chain.length - 1}</h3>
                <p><strong>Previous Hash:</strong><br><span style="color: red; word-break: break-all;">${newBlock.previousHash}</span></p>
                <p><strong>Hash:</strong><br><span style="color: green; word-break: break-all;">${newBlock.hash}</span></p>
                <p><strong>Nonce:</strong> ${newBlock.nonce}</p>
                <p><strong>Timestamp:</strong> ${newBlock.timeStamp}</p>
                <p><strong>Difficulty:</strong> ${newBlock.difficulty}</p>
                <p><strong>Miner ID:</strong> ${newBlock.minerID}</p>
            </div>


            <div class="block-transactions">
                <h4 style="
                    grid-column: 1 / -1;
                    margin-bottom: 5px;
                    text-align: center;
                    border-bottom: 1px solid #ddd;
                    padding-bottom: 4px;
                    font-size: 0.9em;
                    font-weight: bold;
                ">Transactions</h4>
                ${transactionsHTML || `<p style="grid-column: 1 / -1; text-align: center;"><i>Keine Transaktionen</i></p>`}
            </div>
        </div>
        `
    }
}