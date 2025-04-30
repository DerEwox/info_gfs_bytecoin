<script lang="ts">
  import { Block } from "./lib/block";
  import { Transaction } from "./lib/transaction";
  import { Mempool } from "./lib/mempool";
  import "./styles.css";

  let screen = "Transactions";
  let showNewTransactionScreen = true;
  const mempool = new Mempool();

  let newTransaction: {from: string, to: string, value: number} = {from: "", to:"", value: 0}
</script>

<main>
  <div class="headerDIV">
    <div class="header">
      <button on:click={() => (screen = "Transactions")}>Transactions</button>
      <button on:click={() => (screen = "Mempool")}>Mempool</button>
      <button on:click={() => (screen = "Miner")}>Miner</button>
      <button on:click={() => (screen = "Blockchain")}>Blockchain</button>
    </div>
  </div>

  <div class="screenDIV">
    {#if screen === "Transactions"}
      <div class="transaction-interface">
        <div class="transaction-user">Mark</div>
        <div class="transaction-user mid">Uwe</div>
        <div class="transaction-user">Ben</div>
      </div>
      <button
        class="toggleTransactionMenu"
        on:click={() => showNewTransactionScreen = !showNewTransactionScreen}
        >Add Transaction</button
      >
      {#if showNewTransactionScreen}
        <div class="newTransactionScreen">
          <button
          style="position: absolute; top: 20px; right: 5px;"
          on:click={() => showNewTransactionScreen = !showNewTransactionScreen}
          >Exit</button
        >
        <h1 style="text-align: center;">Add Transaction</h1>
        </div>
      {/if}
    {/if}
  </div>
</main>


<style>
</style>
