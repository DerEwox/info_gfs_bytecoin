import { Transaction } from "./transaction";
import { hashData } from "./utils";
import { writable } from "svelte/store";

export let MinerLogs = [writable<string>(""),writable<string>(""),writable<string>("")]

export class Miner {
  public hash: string = "";
  public nonce: number = 0;
  public timestamp: number;

  constructor(
    public previousHash: string,
    public transactions: Transaction[],
    public minerId: number
  ) {
    this.timestamp = Date.now();
  }

  async calculateHash(): Promise<string> {
    const data = this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce;
    return await hashData(data);
  }

  private stopped = false
  stopMiner() {
    this.stopped = true
  }

  async mineBlock(difficulty: number): Promise<void> {
    this.stopped = false
    const startTime = Date.now()
    while (!this.hash.startsWith("0".repeat(difficulty))) {
      this.nonce++;
      this.hash = await this.calculateHash();
      this.addLog(this.minerId)
    }
    const endtime = Date.now() - startTime
    console.log(`Block mined: ${this.hash}, with nonce ${this.nonce} in  ${endtime/1000}s`);
  }

  addLog(minerId: number) {
    let message = `<p style="flex-basis: 100%; margin-top: 5px">Hash: ${this.hash}</p>`
    MinerLogs[minerId].update((current) => current + message);
  }

  async initialize(): Promise<void> {
    this.hash = await this.calculateHash();
  }
}
