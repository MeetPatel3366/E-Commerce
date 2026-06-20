import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  decreseQuantity,
  increaseQuantity,
  removeFromCart,
} from "../features/cartSlice";

const Cart = () => {
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const [deliveryFee] = useState(0);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const grandTotal = totalPrice + deliveryFee;

  const handleRemove = (id: number) => dispatch(removeFromCart(id));
  const handleInc = (id: number) => dispatch(increaseQuantity(id));
  const handleDec = (id: number) => dispatch(decreseQuantity(id));

  if (!items.length) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center bg-white dark:bg-black text-gray-900 dark:text-white">
        <h1 className="text-4xl font-bold mb-3">Your Cart is Empty</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Add some products to continue shopping.
        </p>

        <button className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white">
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-black text-gray-900 dark:text-white px-4 md:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-[2fr_1fr] gap-8">
          <div className="space-y-5">
            {items.map((item) => (
              <div
                key={item.id}
                className="
                  bg-white dark:bg-slate-900
                  border border-gray-200 dark:border-slate-700
                  rounded-xl
                  p-4
                  shadow-sm hover:shadow-md
                  transition
                "
              >
                <div
                  className="grid grid-cols-1 md:grid-cols-[1fr_180px_120px_50px] items-center gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-gray-100 dark:bg-slate-800 p-2 rounded-lg">
                      <img
                        src={item.images[0]}
                        className="w-20 h-20 object-contain"
                      />
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {item.brand}
                      </p>

                      <h2 className="font-semibold text-lg">{item.title}</h2>

                      <p className="text-purple-600 dark:text-purple-400 font-medium">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDec(item.id)}
                      className="w-9 h-9 rounded-lg border border-gray-300 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-700"
                    >
                      −
                    </button>

                    <span className="w-10 text-center font-medium">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => handleInc(item.id)}
                      className="w-9 h-9 rounded-lg border border-gray-300 dark:border-slate-600 hover:bg-gray-100 dark:hover:bg-slate-700"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right min-w-[120px]">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Total
                    </p>

                    <p className="text-lg font-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => handleRemove(item.id)}
                    className="
                      p-2 rounded-lg
                      border border-red-400
                      text-red-500
                      hover:bg-red-500 hover:text-white
                      transition
                      flex justify-center
                    "
                  >
                    <CgClose />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:sticky lg:top-6 h-fit">
            <div
              className="
              bg-white dark:bg-slate-900
              border border-gray-200 dark:border-slate-700
              rounded-xl p-6
              shadow-sm
            "
            >
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Subtotal
                  </span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">
                    Delivery Fee
                  </span>
                  <span>${deliveryFee.toFixed(2)}</span>
                </div>

                <div className="border-t border-gray-200 dark:border-slate-700 pt-4 flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
