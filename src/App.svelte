<script lang="ts">
  import { Block } from "./lib/block";
  import { Transaction } from "./lib/transaction";
  import { Mempool } from "./lib/mempool";
  import "./styles.css";

  let screen = "Transactions"

  let t = new Transaction("Mark", "Uwe", 0.5);
  let t1 = new Transaction("Mark", "Uwe", 0.25);
  let t2 = new Transaction("Uwe", "Mark", 0.15);

  const mempool = new Mempool();

  mempool.add(t);
  mempool.add(t1);
  mempool.add(t2);

  const newblock = new Block("1", mempool.getbestPaying(3));
</script>
<main>
  <div class="headerDIV">
    <div class="header">
      <button on:click={() => screen = "Trabsactions"}>Transactions</button>
      <button on:click={() => screen = "Mempool"}>Mempool</button>
      <button on:click={() => screen = "Miner"}>Miner</button>
      <button on:click={() => screen = "Blockchain"}>Blockchain</button>
    </div>
  </div>

  <div class="screenDIV">
    {#if screen === "Transactions"}
      <div class="transaction-interface">
        <div class="transaction-user">Im YELLOW</div>
        <div class="transaction-user mid">Im RED</div>
        <div class="transaction-user">Im BLUE</div>
      </div>
    {/if}
  </div>
</main>

{newblock.hash}

<style>
</style>
