import { Transaction } from "./transaction"

export class user {
    public balance: number
    public walletID: string
    public pendingTransactions: Transaction[] = []

    constructor(walletID: string, balance:number) {
        this.balance = balance
        this.walletID = walletID
    }

    addTransaction(transaction: Transaction) {
        this.pendingTransactions.push(transaction)
    }

    getHTML(): string {
        let hmtlOut = ""
        for(let i = 0; i < this.pendingTransactions.length; i++) {
            hmtlOut += this.pendingTransactions[i].outputHTML()
        }
        return hmtlOut
    }

    private removeFromMempool(index: number) {
        for(let i=index; i < this.pendingTransactions.length; i++) {
            this.pendingTransactions[i] = this.pendingTransactions[i+1]
        }
        this.pendingTransactions.pop()
    }


    remove(transactions: Transaction[]) {
        for(let i = 0; i < transactions.length; i++) {
            for(let j=0; j < this.pendingTransactions.length; j++) {
                if(transactions[i] === this.pendingTransactions[j]) this.removeFromMempool(j)
            }
        }
    }
}