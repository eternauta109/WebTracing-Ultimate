import React, { useState, useEffect, useRef } from 'react';
import Accordion from './accordion';
import Table from './table';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"



export const Tracing = ({ cinema }) => {
  const URL = "http://localhost:3001/tracing"
  /* const [codFisc, setCodFisc] = useState(''); */
  const codFisc = useRef('');
  const ticket = useRef();
  const buttonSubmit = useRef('')

  /* const date = new Date().toLocaleString() + ''; */
  const agregato = useRef('');
  const number = useRef("");
  const [counter, setCounter] = useState(0);
  const [registrer, setRegistrer] = useState([]);



  const onSubmit = async (event) => {

    event.preventDefault();

    if (!cinema) {
      alert("fai prima il login grazie")
      return
    }

    if (
      !codFisc.current.value &&
      !agregato.current.value &&
      !number.current.value
    ) {
      toast.error(
        'inserire codice fiscale o nome, cognome e numero di telefono',
        {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
      return;
    }
    if (!ticket.current.value) {
      toast.error('si deve inserire il codice biglietto', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }


    try {
      const result = await axios.post(URL,
        {
          registration: {
            cinema: cinema,
            fiscale: codFisc.current.value,
            nameClient: agregato.current.value,
            numberPhone: number.current.value,
            ticket: ticket.current.value,
            date: new Date().toLocaleString() + ''
          }


        }).then((res) => {
          if (res.data) {
            toast.success(
              'registrazione avvenuta',
              {
                position: 'bottom-right',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );


          } else {
            alert("qualcosa è andato storto. Riprova")
          }
        }).catch((e) =>
          alert(e.response.data)
        );

    } catch (error) {
      alert("error axios tracing", error);
    }

    setCounter(counter + 1);

    /* console.log(counter) */

    let newArrya = [...registrer];
    newArrya[counter] = {
      fiscale: codFisc.current.value,
      nameClient: agregato.current.value,
      numberPhone: number.current.value,
      ticket: ticket.current.value,
      count: counter,
      date: new Date().toLocaleString() + '',
      onDb: true
    };

    setRegistrer(newArrya);


    if (counter === 2) {
      setCounter(0);
    }
    codFisc.current.value = '';
    agregato.current.value = '';
    number.current.value = '';
    ticket.current.value = '';
    codFisc.current.focus();
  };

  const handleKeyPressed = (e) => {
    /* console.log(e.target.name) */
    if (e.key === 'Enter' && e.target.name === 'codFisc') {
      /* console.log(e.key) */
      ticket.current.focus();
    }
    if (e.key === 'Enter' && e.target.name === 'ticket') {
      /* console.log(e.key) */
      buttonSubmit.current.focus();
    }
  }

  useEffect(() => {

  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="login-form bg-light mt-4 p-4">
            <form className="row g-3">
              <h4>Tracing</h4>
              <div className="col">
                <input
                  className="form-control"
                  type="text"
                  value={cinema}
                  aria-label="Disabled input example"
                  disabled
                />
              </div>
              <div className="col-12">
                <input
                  type="text"
                  ref={codFisc}
                  tabIndex="0"
                  name="codFisc"
                  onKeyPress={handleKeyPressed}
                  className="form-control"
                  placeholder="CODICE FISCALE"
                />
              </div>
              <div className="col-12">
                <Accordion num={number} nome={agregato} />
              </div>
              <div className="col-12">
                <input
                  type="text"
                  name="ticket"
                  onKeyPress={handleKeyPressed}
                  tabIndex="0"
                  ref={ticket}
                  className="form-control"
                  placeholder="TICKET"
                />
              </div>
              <div className="col-12">
                <input
                  name="date"
                  className="form-control"
                  aria-label="Disabled input example"
                  placeholder="date"
                  value={new Date().toLocaleString() + ''}
                  disabled
                />
              </div>

              <div className="col-12 d-flex justify-content-center">
                <button ref={buttonSubmit} type="button" onClick={onSubmit} className="btn btn-dark">
                  Register
                </button>
              </div>
            </form>
            <hr />
            <Table registration={registrer} setRegistrer={setRegistrer} />
            <hr className="mt-4" />
            <div className="col-12">
              <p className="text-center mb-0">dev by Fabio Conti</p>
            </div>
          </div>
        </div>
      </div>
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
};

export default Tracing;
