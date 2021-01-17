//引入vue
import Vue from 'vue';
//引入vue-router
import VueRouter from 'vue-router';
import staff from "@/components/staff/staff";
import Home from "@/components/home/Home";
import CardService from "@/components/cardOpeningService/CardService";
import EquipmentService from "@/components/equipmentRental/EquipmentService";
import SwipeCard from "@/components/swipeCard/SwipeCard";
import Baggage from "@/components/itemStorage/Baggage";
import TicketRefund from "@/components/ticketRefund/TicketRefund";
//第三方库需要use一下才能用
Vue.use(VueRouter)


//定义routes路由的集合，数组类型
const routes = [
    // {path: "/", component: Home},
    //单个路由均为对象类型，path代表的是路径，component代表组件
    {
        path: "/", component: Home, redirect: "/ticket", children: [
            //售票退票
            {path: "/ticket", component: TicketRefund},
            //刷卡验票
            {path: "/check", component: SwipeCard},
            //器材租赁
            {path: "/equipment", component: EquipmentService},
            //物品保管
            {path: "/baggage", component: Baggage},
            //开卡充值
            {path: "/card", component: CardService},
        ]
    },

    {path: "/chat", component: staff},


]

//实例化VueRouter并将routes添加进去
const router = new VueRouter({
//ES6简写，等于routes：routes
    mode: "history",
    routes
});

//抛出这个这个实例对象方便外部读取以及访问
export default router