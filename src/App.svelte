<script lang="ts">
  import { Miner, MinerLogs } from "./lib/miner";
  import { Transaction } from "./lib/transaction";
  import { Mempool } from "./lib/mempool";
  import "./styles.css";
  import { User } from "./lib/user";
  import { getRandomInt } from "./lib/utils";

  let screen = "Transactions";
  let minerState = "idle"; //idle, mining, stopped
  let showNewTransactionScreen = false;

  const mempool = new Mempool();
  const names = ["Mark", "Uwe", "Ben"];
  const users = [
    new User("Mark", 120),
    new User("Uwe", 80),
    new User("Ben", 140),
  ];

  let newTransaction: { from: string; to: string; value: number } = {
    from: "",
    to: "",
    value: 0,
  };

  //Fügt transaction dem Absender hinzu und fügt es in den Mempool hinzu
  function addNewTransaction() {
    let transaction = new Transaction(
      newTransaction.from,
      newTransaction.to,
      newTransaction.value,
    );
    for (let i = 0; i < users.length; i++) {
      if (users[i].walletID === transaction.sourceWalletID) {
        users[i].addTransaction(transaction);
        users[i].pendingTransactionHtml = users[i].getHTML();
        mempool.add(transaction);
        mempool.html = mempool.getbestPayingHTML(-1); //(-1) gibt ganze Liste wieder
      }
    }
  }

  let randomTransactionCount = 20;
  function addRandomTransaction() {
    const count = randomTransactionCount;
    for (let i = 0; i < count; i++) {
      const value = getRandomInt(1, 5);
      const user1 = users[getRandomInt(0, 2)];
      let user2 = users[getRandomInt(0, 2)];
      while (user2 === user1) user2 = users[getRandomInt(0, 2)];
      newTransaction.from = user1.walletID;
      newTransaction.to = user2.walletID;
      newTransaction.value = value;

      addNewTransaction();
    }
  }

  let _MinerLogs = MinerLogs;
  let MinerMarkLog = MinerLogs[0];
  let MinerUweLog = MinerLogs[1];
  let MinerBenLog = MinerLogs[2];
  let miner = [
    new Miner("", mempool.getbestPaying(5), 0),
    new Miner("", mempool.getbestPaying(5), 1),
    new Miner("", mempool.getbestPaying(5), 2),
  ];

  let winningMiner = { id: -1, time: -1, nonce: -1, hash: "" };
  async function startMining() {
    minerState = "mining";
    screen = "Miner";
    const promises = miner.map((m) => {
      m.transactions = mempool.getbestPaying(30);
      return m.mineBlock(4).then((result) => ({ miner: m, result }));
    });

    const { miner: winner, result } = await Promise.race(promises);
    winningMiner.id = winner.minerId;
    winningMiner.time = result.time;
    winningMiner.nonce = result.nonce;
    winningMiner.hash = result.hash;
    minerState = "stopped";

    console.log("Gewinner:", winner, "Block:", result);

    for (const m of miner) {
      if (m !== winner) {
        m.stopMiner();
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
    {#if screen === "Transactions" || screen === "newTransaction"}
      <div class="transaction-interface">
        <div class="transaction-user">
          <h3>Mark (<span style="color: red">{users[0].balance}</span> WE)</h3>
          <div class="pending">
            <h4><u>pending transactions:</u></h4>
            <div class="transactions">
              {@html users[0].pendingTransactionHtml}
            </div>
          </div>
          <div class="successful">
            <h4><u>successful transactions:</u></h4>
            <div class="transactions">
              {@html users[0].successfulTransactionHtml}
            </div>
          </div>
        </div>
        <div class="transaction-user mid">
          <h3>Uwe (<span style="color: red">{users[1].balance}</span> WE)</h3>
          <div class="pending">
            <h4><u>pending transactions:</u></h4>
            <div class="transactions">
              {@html users[1].pendingTransactionHtml}
            </div>
          </div>
          <div class="successful">
            <h4><u>successful transactions:</u></h4>
            <div class="transactions">
              {@html users[1].successfulTransactionHtml}
            </div>
          </div>
        </div>
        <div class="transaction-user">
          <h3>Ben (<span style="color: red">{users[2].balance}</span> WE)</h3>
          <div class="pending">
            <h4><u>pending transactions:</u></h4>
            <div class="transactions">
              {@html users[2].pendingTransactionHtml}
            </div>
          </div>
          <div class="successful">
            <h4><u>successful transactions:</u></h4>
            <div class="transactions">
              {@html users[2].successfulTransactionHtml}
            </div>
          </div>
        </div>
      </div>
      <button
        class="toggleTransactionMenu"
        on:click={() => (screen = "newTransaction")}>Add Transaction</button
      >
      {#if screen === "newTransaction"}
        <div class="newTransactionScreen">
          <button
            style="position: absolute; top: 20px; right: 5px;"
            on:click={() => (screen = "Transactions")}>Exit</button
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
            <h2 style="flex-basis: 100%; margin-top:100px">
              Random Transactions
            </h2>
            <label class="newTransactionLabel">
              Count<br />
              <input
                class="newTransactionInput"
                type="text"
                bind:value={randomTransactionCount}
              />
            </label>
            <div style="flex-basis: 100%;">
              <button on:click={addRandomTransaction}
                >Add random transactions</button
              >
            </div>
          </div>
        </div>
      {/if}
    {:else if screen === "Mempool"}
      <button class="toggleTransactionMenu" on:click={startMining}
        >Start Mining</button
      >
      <div class="mempool-interface">
        <h3 style="flex-basis: 100%;">Memory-Pool</h3>
        <div class="MempoolTransactions">
          {@html mempool.html}
        </div>
      </div>
    {:else if screen === "Miner"}
      <div class="transaction-interface">
        <div class="transaction-user">
          <h3>
            Miner Mark (<span style="color: red">{users[0].balance}</span> WE)
          </h3>
          <div class="pending">
            <div class="transactions">
              {#if minerState === "mining"}
                <h4 style="flex-basis: 100%; text-align: center; color: green">
                  Mining...
                  {@html $MinerMarkLog}
                </h4>
              {:else if minerState === "stopped"}
                <h4 class="minerinterface_stopped">
                  Mining gestoppt
                  {#if winningMiner.id === 0}
                    <span class="minerinterface_details">
                      Gewonnen in <strong>{winningMiner.time} ms</strong><br />
                      Nonce:
                      <code class="minerinterface_code"
                        >{winningMiner.nonce}</code
                      ><br />
                      Hash:
                      <code class="minerinterface_code"
                        >{winningMiner.hash}</code
                      >
                    </span>
                  {/if}
                </h4>
              {:else}
                <h4 style="flex-basis: 100%; text-align: center; color: gray">
                  Idle
                </h4>
              {/if}
            </div>
          </div>
        </div>
        <div class="transaction-user mid">
          <h3>
            Miner Uwe (<span style="color: red">{users[1].balance}</span> WE)
          </h3>
          <div class="pending">
            <div class="transactions">
              {#if minerState === "mining"}
                <h4 style="flex-basis: 100%; text-align: center; color: green">
                  Mining...
                  {@html $MinerUweLog}
                </h4>
              {:else if minerState === "stopped"}
                <h4 class="minerinterface_stopped">
                  Mining gestoppt
                  {#if winningMiner.id === 1}
                    <span class="minerinterface_details">
                      Gewonnen in <strong>{winningMiner.time} ms</strong><br />
                      Nonce:
                      <code class="minerinterface_code"
                        >{winningMiner.nonce}</code
                      ><br />
                      Hash:
                      <code class="minerinterface_code"
                        >{winningMiner.hash}</code
                      >
                    </span>
                  {/if}
                </h4>
              {/if}
            </div>
          </div>
        </div>
        <div class="transaction-user">
          <h3>
            Miner Ben (<span style="color: red">{users[2].balance}</span> WE)
          </h3>
          <div class="pending">
            <div class="transactions">
              {#if minerState === "mining"}
                <h4 style="flex-basis: 100%; text-align: center; color: green">
                  Mining...
                  {@html $MinerBenLog}
                </h4>
              {:else if minerState === "stopped"}
                <h4 class="minerinterface_stopped">
                  Mining gestoppt
                  {#if winningMiner.id === 2}
                    <span class="minerinterface_details">
                      Gewonnen in <strong>{winningMiner.time} ms</strong><br />
                      Nonce:
                      <code class="minerinterface_code"
                        >{winningMiner.nonce}</code
                      ><br />
                      Hash:
                      <code class="minerinterface_code"
                        >{winningMiner.hash}</code
                      >
                    </span>
                  {/if}
                </h4>
              {:else}
                <h4 style="flex-basis: 100%; text-align: center; color: gray">
                  Idle
                </h4>
              {/if}
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
</main>

<style>
</style>
