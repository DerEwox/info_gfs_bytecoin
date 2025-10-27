import { Transaction } from "./transaction"

export class Mempool {
    public pool: Transaction[] = []
    public html = ""
    constructor() { }


    //* Füge eine Transaktion in den Mempool hinzu
    add(transaction: Transaction) {
        this.pool.push(transaction)
    }

    //* Element an Stelle Index aus Mempool löschen
    private removeFromMempool(index: number) {
        for (let i = index; i < this.pool.length; i++) {
            this.pool[i] = this.pool[i + 1]
        }
        this.pool.pop()
    }


    //* Entferne Transaktionen vom Mempool
    remove(transactions: Transaction[]) {
        for (let i = 0; i < transactions.length; i++) {
            for (let j = 0; j < this.pool.length; j++) {
                if (this.checkEqual(this.pool[j], transactions[i])) this.removeFromMempool(j)
            }
        }
    }

    private checkEqual(ts1: Transaction, ts2: Transaction): boolean {
        return ts1.sourceWalletID === ts2.sourceWalletID &&
            ts1.targetWalletID === ts2.targetWalletID &&
            ts1.value === ts2.value &&
            ts1.fee === ts2.fee
    }


    getbestPaying(count: number): Transaction[] {
        this.pool.sort((a, b) => b.fee - a.fee);
        return this.pool.slice(0, count)
    }

    getbestPayingHTML(count: number): string {
        this.pool.sort((a, b) => b.fee - a.fee);
        let hmtlOut = ""
        if (count < 0) count = this.pool.length
        for (let i = 0; i < count; i++) {
            hmtlOut += this.pool[i].outputHTML()
        }
        return hmtlOut
    }
}