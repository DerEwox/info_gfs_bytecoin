<script lang="ts">
  import { Block } from "./lib/block";
  import { Transaction } from "./lib/transaction";
  import { Mempool } from "./lib/mempool";

  let t = new Transaction("Mark", "Uwe", 0.5)
  let t1 = new Transaction("Mark", "Uwe", 0.25)
  let t2 = new Transaction("Uwe", "Mark", 0.15)

  const mempool = new Mempool()

  mempool.add(t)
  mempool.add(t1)
  mempool.add(t2)

  const newblock = new Block("1", mempool.getbestPaying(3))

</script>
{@html t.outputHTML()}
{@html t1.outputHTML()}
{@html t2.outputHTML()}

<button on:click={() => newblock.mineBlock(4)}>Mine</button>


{newblock.hash}


<style>
  
</style>
