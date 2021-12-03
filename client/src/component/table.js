import React from 'react';
import RegistrationElement from './registrationElement';



export const Table = ({ registration,setRegistrer}) => {
  /* import { useSelector } from "react-redux"; */
 
  console.log(registration)
  return (
    <ul className="list-group list-group-flush">
      {registration.map((reg, key) => (
        <RegistrationElement key={key} registration={registration} reg={reg}  setRegistrer={setRegistrer}  />
      ))}
    </ul>
  );
};

export default Table;
