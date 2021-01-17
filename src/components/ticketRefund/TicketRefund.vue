<template>
  <el-container>
    <el-main>
      <h1 class="title">出票</h1>
      <BuyAdultTicket class="centerHorizontally"></BuyAdultTicket>
      <BuyMinorTicket class="minorComponent centerHorizontally"></BuyMinorTicket>
      <h1 class="title">退票</h1>
      <Refund class="returnTicketComponent"></Refund>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</template>


<script>
import BuyAdultTicket from "@/components/ticketRefund/BuyAdultTicket";
import BuyMinorTicket from "@/components/ticketRefund/BuyMinorTicket";
import Refund from "@/components/ticketRefund/Refund";


export default {
  name: "TicketRefund",
  components: {
    BuyAdultTicket,
    BuyMinorTicket,
    Refund
  },
  data() {
    return {}
  }, created() {
  }, methods: {}
}
</script>

<style scoped>
.title {
  float: left
}

/*未成人票表格*/
.minorComponent {
  margin-top: 2%;
}

/*退票*/
.returnTicketComponent {
  margin-top: 3%;
}

</style>