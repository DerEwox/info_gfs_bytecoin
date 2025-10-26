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
        let html = `<p style="flex-basis: 100%; margin-top: 5px"><span style="color: red">${this.sourceWalletID}</span> to <span style="color: red">${this.targetWalletID}</span>: <span style="color: blue">${this.value}WE</span> Fee: <span style="color: #3b5fc9ff">${this.fee}WE</span></p>`
        return html
    }
}

