import { Transaction } from "./transaction";
import { hashData, getRandomInt } from "./utils";
import { writable } from "svelte/store";
import { type minedBlock, type unminedBlock } from "./blockchain";

export let MinerLogs = [writable<string>(""), writable<string>(""), writable<string>("")]

export class Miner {
  public hash: string = "";
  public nonce: number = 0;
  public minderId: number;

  constructor(
    public previousHash: string,
    public transactions: Transaction[],
    public minerId: number
  ) {
    this.minderId = minerId;

    if (previousHash === "") {
      this.previousHash = "0".repeat(64);
    }
  }

  async calculateHash(unminedblock: string): Promise<string> {
    const data = JSON.stringify(unminedblock);
    return await hashData(data);
  }

  private stopped = false
  stopMiner() {
    this.stopped = true
  }

  async mineBlock(difficulty: number, previousHash: string | undefined): Promise<{ hash: string, time: number, nonce: number, minedBlock?: minedBlock }> {
    this.stopped = false
    if (previousHash) {
      this.previousHash = previousHash
    }

    let block: unminedBlock

    const startTime = Date.now()
    while (!this.hash.startsWith("0".repeat(difficulty)) && !this.stopped) {

      this.nonce = getRandomInt(0, Number.MAX_SAFE_INTEGER);

      block = {
        //Head
        previousHash: this.previousHash,
        nonce: this.nonce,
        timeStamp: new Date().toISOString(),
        difficulty: difficulty,
        //Body
        minerID: this.minderId,
        transactions: JSON.stringify(this.transactions),
      }

      this.hash = await this.calculateHash(JSON.stringify(block));
      this.addLog(this.minerId)
    }
    const endtime = Date.now() - startTime

    const minedBlock: minedBlock = {...block!, hash: this.hash }
    let out = { hash: this.hash, time: endtime / 1000, nonce: this.nonce, minedBlock: this.stopped ? undefined : minedBlock };
    this.hash = ""

    return out
  }

  addLog(minerId: number) {
    let message = `<p style="flex-basis: 100%; word-break: break-all; margin-top: 5px">${this.hash}</p>`
    MinerLogs[minerId].update((current) => message);
  } //current +


  //OFF?
  // async initialize(): Promise<void> {
  //   this.hash = await this.calculateHash();
  // }
}
