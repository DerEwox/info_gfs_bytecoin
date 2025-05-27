<script lang="ts">
  import { Block } from "./lib/block";
  import { Transaction } from "./lib/transaction";
  import { Mempool } from "./lib/mempool";
  import "./styles.css";
  import { User } from "./lib/user";
  const mempool = new Mempool();
  const names = ["Mark", "Uwe", "Ben"];
  const users = [
    new User("Mark", 120),
    new User("Uwe", 80),
    new User("Ben", 140),
  ];

  let screen = "Transactions";
  let showNewTransactionScreen = false;

  let newTransaction: { from: string; to: string; value: number } = {
    from: "",
    to: "",
    value: 0,
  };

  function addNewTransaction() {
    let transaction = new Transaction(
      newTransaction.from,
      newTransaction.to,
      newTransaction.value,
    );
    //Fügt transaction dem Absender hinzu und fügt es in den Mempool hinzu
    for (let i = 0; i < users.length; i++) {
      if (users[i].walletID === transaction.sourceWalletID) {
        users[i].addTransaction(transaction);
        users[i].pendingTransactionHtml = users[i].getHTML();
        mempool.add(transaction);
        mempool.html = mempool.getbestPayingHTML(-1); //(-1) gibt ganze Liste wieder
      }
    }
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
          <h3>Mark (<span style="color: red">{users[0].balance}</span> BYC)</h3>
          <h4><u>pending transactions:</u></h4>
          {@html users[0].pendingTransactionHtml}
          <h4 style="margin-top: 40px;"><u>successful transactions:</u></h4>
          {@html users[0].successfulTransactionHtml}
        </div>
        <div class="transaction-user mid">
          <h3>Uwe (<span style="color: red">{users[1].balance}</span> BYC)</h3>
          <h4><u>pending transactions:</u></h4>
          {@html users[1].pendingTransactionHtml}
          <h4 style="margin-top: 40px;"><u>successful transactions:</u></h4>
          {@html users[1].successfulTransactionHtml}
        </div>
        <div class="transaction-user">
          <h3>Ben (<span style="color: red">{users[2].balance}</span> BYC)</h3>
          <h4><u>pending transactions:</u></h4>
          {@html users[2].pendingTransactionHtml}
          <h4 style="margin-top: 40px;"><u>successful transactions:</u></h4>
          {@html users[2].successfulTransactionHtml}
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
            <h1 style="text-align: center; flex-basis: 100%">
              Add Transaction
            </h1>
            <label class="newTransactionLabel">
              From:<br />
              <input
                class="newTransactionInput"
                type="text"
                bind:value={newTransaction.from}
              />
            </label>

            <label class="newTransactionLabel">
              To:<br />
              <input
                class="newTransactionInput"
                type="text"
                bind:value={newTransaction.to}
              />
            </label>

            <label class="newTransactionLabel">
              Value:<br />
              <input
                class="newTransactionInput"
                type="text"
                bind:value={newTransaction.value}
              />
            </label>
            <div style="flex-basis: 100%;">
              <button on:click={addNewTransaction}>Submit</button>
            </div>
          </div>
        </div>
      {/if}
    {:else if screen === "Mempool"}
      <div class="mempool-interface">
        <h3 style="flex-basis: 100%;">Memory-Pool</h3>
        {@html mempool.html}
      </div>
    {/if}
  </div>
</main>
<style>
</style>
