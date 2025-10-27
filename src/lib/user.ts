import { Transaction } from "./transaction"

export class User {
    public balance: number
    public walletID: string
    public pendingTransactions: Transaction[] = []
    public successfulTransactions: Transaction[] = [] //TODO Muss zu MinedTransaction werden.
    public pendingTransactionHtml = ""
    public successfulTransactionHtml = ""

    constructor(walletID: string, balance:number) {
        this.balance = balance
        this.walletID = walletID
    }

    addTransaction(transaction: Transaction) {
        // Fügen es zu neune Array hinzu, da dann die Ansicht aktualisiert wird
        this.pendingTransactions = [...this.pendingTransactions, transaction];
    }

    getHTMLPending(): string {
        let hmtlOut = ""
        for(let i = 0; i < this.pendingTransactions.length; i++) {
            hmtlOut += this.pendingTransactions[i].outputHTML() || ""
        }
        return hmtlOut
    }


    getHTMLSuccessful(): string {
        let hmtlOut = ""
        console.log("Successful Transactions:", this.successfulTransactions);
        for (let i = 0; i < this.successfulTransactions.length; i++) {
            hmtlOut += this.successfulTransactions[i].outputHTML() || ""
        }
        return hmtlOut
    }

    private removeFromPending(index: number) {
        this.successfulTransactions = [...this.successfulTransactions, this.pendingTransactions[index]];
        for(let i=index; i < this.pendingTransactions.length; i++) {
            this.pendingTransactions[i] = this.pendingTransactions[i+1]
        }
        this.pendingTransactions.pop()
        
    }


    remove(transactions: Transaction[]) {
        for(let i = 0; i < transactions.length; i++) {
            for(let j=0; j < this.pendingTransactions.length; j++) {
                if(this.checkEqual(transactions[i], this.pendingTransactions[j])) this.removeFromPending(j)
            }
        }
    }

    private checkEqual(ts1: Transaction, ts2: Transaction): boolean {
        return ts1.sourceWalletID === ts2.sourceWalletID &&
            ts1.targetWalletID === ts2.targetWalletID &&
            ts1.value === ts2.value &&
            ts1.fee === ts2.fee
    }
}