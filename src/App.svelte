<script lang="ts">
  import { Transaction } from "./lib/transaction";
  let t = new Transaction("Mark", "Uwe", 0.5)
</script>
{@html t.outputHTML()}
<style>
  
</style>
