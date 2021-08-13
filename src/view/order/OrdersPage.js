import React, { useEffect, useState } from "react";
import { fetch_Prom } from "../../api";

export default function OrdersPage() {
        const [Orders, setOrders] = useState([]);
        const getOrders = async(queryObj, isReload=false) => {
                try {
                        const populateObjs = [{path: "OrderProds", select: "OrderSkus nome unit", populate: {path: "OrderSkus", select: "price"}}];
                        const Orders_res = await fetch_Prom("/Orders?populateObjs="+JSON.stringify(populateObjs));
                        // console.log(Orders_res)
                        if(Orders_res.status === 200) {
                                if(isReload) {
                                        setOrders(Orders_res.data.objects);
                                } else {
                                        setOrders([...Orders, ...Orders_res.data.objects]);
                                }
                        } else {
                                console.log("Orders", Orders_res.message)
                        }
                } catch(error) {
                        console.log("error: ", error);
                }
        }
        useEffect(() => {
                getOrders(null, false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
        return (<>
                
        </>)
}
