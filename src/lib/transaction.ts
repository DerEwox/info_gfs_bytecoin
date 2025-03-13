export class Transaction {
    public sourceWalletID: string
    public targetWalletID: string
    public value: number
    public fee: number = Math.round((Math.random()*100)) / 1000

    constructor(sourceWalletID: string, targetWalletID: string, value: number) {
        this.sourceWalletID = sourceWalletID
        this.targetWalletID = targetWalletID
        this.value = value
    }

    public outputHTML(): string {
        let html = `<p>Transaction from <span style="color: red">${this.sourceWalletID}</span> to <span style="color: red">${this.targetWalletID}</span> with a value of <span style="color: lightblue">${this.value}B</span> and a fee of <span style="color: lightblue">${this.fee}B</span></p>`
        return html
    }
}