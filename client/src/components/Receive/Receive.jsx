import React, { useState } from "react";
import Send from "../Send/Send";
import "./Receive.css";

const Receive = () => {
  const [toggle, settoggle] = useState(0);
  const handleClick = () => {
    if (!toggle) settoggle(1);
    else settoggle(0);
  };
  let temp = [
    {
      id: "1",
      first: "Swadhin",
      last: "Routray",
      handle: "abc",
    },
    {
      id: "2",
      first: "Shamanth",
      last: "Nayak",
      handle: "abc",
    },
    {
      id: "3",
      first: "Dhruv",
      last: "Raipure",
      handle: "abc",
    },
  ];
  const redirect = () => {};
  const [details, setDetails] = useState(temp);
  return (
    <div>
      <h1 className="heading">Received files from the server.. </h1>
      <button onClick={redirect} className="sendFileBtn">
        Go to send files page
      </button>
      <table className="table">
        <thead className="tableHead">
          <tr className="tableRow">
            <th className="text" scope="col">
              #
            </th>
            <th className="text" scope="col">
              First
            </th>
            <th className="text" scope="col">
              Last
            </th>
            <th className="text" scope="col">
              Handle
            </th>
          </tr>
        </thead>
        <tbody>
          {details.map((curr) => {
            return (
              <tr>
                <th scope="row">{curr.id}</th>
                <td>{curr.first}</td>
                <td>{curr.last}</td>
                <td>{curr.handle}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Receive;
