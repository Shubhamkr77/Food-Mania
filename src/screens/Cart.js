import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";

export default function Cart() {
  const trash =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiFPhTeWFhhcNCFaw9jH5lEq-2CIzQTPFXrw&s";
  let data = useCart();
  let dispatch = useDispatchCart();

  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 text-center fs-3 text-white">
          The Cart is Empty!
        </div>
      </div>
    );
  }

  const handleCheckOut = async () => {
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
      console.error("Missing userEmail");
      return;
    }

    if (!data || data.length === 0) {
      console.error("Missing or empty data");
      return;
    }

    try {
      let response = await fetch("http://localhost:5000/api/orderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toDateString(),
        }),
      });

      if (response.ok) {
        // check if the response is successful
        let result = await response.json();
        if (result.success) {
          dispatch({ type: "DROP" });
        }
      } else {
        console.error("Failed to place order", response.statusText);
      }
    } catch (error) {
      console.error("Error occurred during checkout", error);
    }
  };

  // const handleCheckOut = async () => {
  //   let userEmail = localStorage.getItem("userEmail");
  //   let response = await fetch("http://localhost:5000/api/orderData", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       order_data: data,
  //       email: userEmail,
  //       order_date: new Date().toDateString(),
  //     }),
  //   });
  //   if (response.status === 200) {
  //     dispatch({ type: "DROP" });
  //   }
  // };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div>
      {console.log(data)}
      <div className="container m-auto mt-5 table-responsive text-success table-responsive-sm table-responsive-md">
        <table className="table table-hover ">
          <thead className=" text-success fs-4">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Option</th>
              <th scope="col">Amount</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr>
                <th scope="row" style={{ color: "white" }}>
                  {index + 1}
                </th>
                <td style={{ color: "white" }}>{food.name}</td>
                <td style={{ color: "white" }}>{food.qty}</td>
                <td style={{ color: "white" }}>{food.size}</td>
                <td style={{ color: "white" }}>{food.price}</td>
                <td style={{ color: "white" }}>
                  <button type="button" className="btn p-0">
                    <img
                      src={trash}
                      alt="delete"
                      width="20"
                      height="20"
                      onClick={() => {
                        dispatch({ type: "REMOVE", index: index });
                      }}
                    />
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className="fs-2 text-white">Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button
            className="btn bg-success text-white mt-5 "
            onClick={handleCheckOut}
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
}
