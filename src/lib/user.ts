import { Transaction } from "./transaction"

export class User {
    public balance: number
    public walletID: string
    public pendingTransactions: Transaction[] = []
    public html = ""

    constructor(walletID: string, balance:number) {
        this.balance = balance
        this.walletID = walletID
    }

    addTransaction(transaction: Transaction) {
        // Statt die bestehende Referenz zu verändern, fügen wir das neue Transaction-Objekt zu einem neuen Array hinzu
        this.pendingTransactions = [...this.pendingTransactions, transaction];
      }

    getHTML(): string {
        let hmtlOut = ""
        for(let i = 0; i < this.pendingTransactions.length; i++) {
            hmtlOut += this.pendingTransactions[i].outputHTML()
        }
        this.html = hmtlOut
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