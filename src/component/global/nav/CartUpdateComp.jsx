import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkCartsUpdate } from "../../../redux/cart/cartSlice";

export default function CartUpdateComp() {
  const dispatch = useDispatch();
  const cartsUpdateTime = useSelector((state) => state.cart.cartsUpdateTime);
  const cartTimer = React.useRef(null);

  React.useEffect(() => {
    let cartsUpdateTimeTemp = cartsUpdateTime;
    clearInterval(cartTimer.current);

    cartTimer.current = setInterval(() => {
      try {
        const storageTime = localStorage.getItem("cartsUpdateTime");

        // console.log(
        //   storageTime,
        //   cartsUpdateTimeTemp,
        //   storageTime === cartsUpdateTimeTemp
        // );
        if (storageTime !== cartsUpdateTimeTemp) {
          const storageCarts = JSON.parse(localStorage.getItem("carts"));
          dispatch(checkCartsUpdate({ storageCarts, storageTime }));
        }
      } catch (e) {
        console.log(e);
      }
    }, 1000);
  }, [cartsUpdateTime, dispatch]);
  return <></>;
}
