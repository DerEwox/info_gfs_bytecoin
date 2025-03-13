import { Transaction } from "./transaction";
import { hashData } from "./utils";

export class Block {
  public hash: string = "";
  public nonce: number = 0;
  public timestamp: number;

  constructor(
    public previousHash: string,
    public transactions: Transaction[]
  ) {
    this.timestamp = Date.now();
  }

  async calculateHash(): Promise<string> {
    const data = this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce;
    return await hashData(data);
  }

  async mineBlock(difficulty: number): Promise<void> {
    const startTime = Date.now()
    while (!this.hash.startsWith("0".repeat(difficulty))) {
      this.nonce++;
      this.hash = await this.calculateHash();
      console.log(`trieded to mine with ${this.hash}`)
    }
    const endtime = Date.now() - startTime
    console.log(`Block mined: ${this.hash}, with nonce ${this.nonce} in  ${endtime/1000}s`);
  }

  async initialize(): Promise<void> {
    this.hash = await this.calculateHash();
  }
}
