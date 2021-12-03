import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function registrationElement({ registration, reg, setRegistrer }) {
  const [select, setSelect] = useState("");
  const URL="http://localhost:3001/tracing"

  const handleSubmit = async (e) => {
    e.preventDefault();
    /* console.log("registartion", registration); */
    try {
      const deleteItem = await axios
        .delete(URL, {
          data: { codTicket: select },
        })
        .then(
          toast.success(
            'eliminazione dal db avvenuta',
            {
              position: 'bottom-right',
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          )
        )
        .catch((e) => alert(e.response.data));
    } catch (error) {
      alert("error axios tracing", error);
    }
  };

  const deleted = !reg.onDb ? (
    <span>
      <span className="fs-6">
        <del>ticket: {reg.ticket} </del>{" "}
      </span>
      <span>
        {" "}
        <del> date: {reg.date}</del>
      </span>
    </span>
  ) : (
    <span>
      <span className="fs-6"> ticket: {reg.ticket}</span>
      <span> date: {reg.date}</span>
    </span>
  );
  /* "text-muted" */


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <li className="list-group-item d-flex justify-content-between">
          {deleted}

          <button
            type="submit"
            className="btn btn-danger btn-sm"
            onClick={() => {
              setSelect(reg.ticket);
              let newArray = [...registration];
              /* console.log("counter", select); */
              newArray[reg.count] = { ...reg, onDb: false };
              setRegistrer(newArray);
            }}
          >
            <i className="bi bi-trash"></i>
          </button>
        </li>
      </form>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default registrationElement;
