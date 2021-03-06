import React, { useState, useEffect } from "react";
import Axios from "axios";
import Header from "./header";
import InputTextArea from "./TextArea";
import Card from "./Card";
import Footer from "./Footer";

function App() {
  const [allCreds, setCred] = useState([]);

  useEffect(() => {
    Axios.get("https://enigmatic-beyond-54549.herokuapp.com/read").then(
      (response) => {
        setCred(response.data);
      }
    );
  }, []);

  function addCred(newCred) {
    setCred((prevCreds) => {
      return [...prevCreds, newCred];
    });

    Axios.post("https://enigmatic-beyond-54549.herokuapp.com/insert", {
      accName: newCred.accName,
      pass: newCred.pass,
    });
  }

  function deleteCred(mid, id) {
    setCred((prevCreds) => {
      return prevCreds.filter((cred, index) => {
        return index !== id;
      });
    });
    //console.log(mid);
    Axios.delete(`https://enigmatic-beyond-54549.herokuapp.com/delete/${mid}`); //use back-tickssss--importantttt!!!!1
  }

  function getPassword(password, id) {
    Axios.post("https://enigmatic-beyond-54549.herokuapp.com/showpassword", {
      password: password,
    }).then((response) => {
      setCred(
        allCreds.map((cred, index) => {
          return index === id
            ? {
                accName: response.data,
                pass: cred.pass,
              }
            : cred;
        })
      );
      //console.log(response.data + " " + id);
    });
  }

  return (
    <div>
      <Header />
      <p className="disclaimer">
        Refresh this page after adding/viewing/deleting your password
      </p>
      <Footer />
      <InputTextArea onAdd={addCred} />

      <div className="flexbox">
        {allCreds.map((cred, index) => {
          return (
            <Card
              key={index}
              mid={cred._id}
              id={index}
              name={cred.accName}
              pass={cred.pass}
              seePassword={getPassword}
              onDelete={deleteCred}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
