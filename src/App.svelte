<script lang="ts">
  import { Block } from "./lib/block";
  import { Transaction } from "./lib/transaction";
  import { Mempool } from "./lib/mempool";
  import "./styles.css";
  import { User } from "./lib/user";
  const mempool = new Mempool();
  const users = [new User("Mark", 120), new User("Mark", 80), new User("Mark", 140)]
  

  let screen = "Transactions";
  let showNewTransactionScreen = false;


  let newTransaction: { from: string; to: string; value: number } = {
    from: "",
    to: "",
    value: 0,
  };

  function addNewTransaction() {
    let transaction = new Transaction(newTransaction.from, newTransaction.to, newTransaction.value)
    for(let i = 0; i<users.length; i++) {
      if(users[i].walletID === transaction.sourceWalletID) {
        users[i].addTransaction(transaction)
        users[i].getHTML()
      }
    }
    console.log(users[0].getHTML())
  }
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
        <div class="transaction-user">
          <h3>Mark</h3>
          {@html users[0].html}
        </div>
        <div class="transaction-user mid">
          <h3>Uwe</h3>
        </div>
        <div class="transaction-user">
          <h3>Ben</h3>
        </div>
      </div>
      <button
        class="toggleTransactionMenu"
        on:click={() => (showNewTransactionScreen = !showNewTransactionScreen)}
        >Add Transaction</button
      >
      {#if showNewTransactionScreen}
        <div class="newTransactionScreen">
          <button
            style="position: absolute; top: 20px; right: 5px;"
            on:click={() =>
              (showNewTransactionScreen = !showNewTransactionScreen)}
            >Exit</button
          >
          <div class="newTransactionInputsHolder">
            <h1 style="text-align: center; flex-basis: 100%">Add Transaction</h1>
            <label class="newTransactionLabel">
              From:<br />
              <input class="newTransactionInput" type="text" bind:value={newTransaction.from} />
            </label>

            <label class="newTransactionLabel">
              To:<br />
              <input class="newTransactionInput" type="text" bind:value={newTransaction.to} />
            </label>

            <label class="newTransactionLabel">
              Value:<br />
              <input class="newTransactionInput" type="text" bind:value={newTransaction.value} />
            </label>
            <div style="flex-basis: 100%;">
              <button on:click={addNewTransaction}>Submit</button>
            </div>
          </div>
        </div>
      {/if}
    {/if}
  </div>
</main>

<style>
</style>
