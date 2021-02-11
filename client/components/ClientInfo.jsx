import React, { useContext, useEffect } from 'react';
import { useForm  } from 'react-hook-form';
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { DietForm } from './DietForm.jsx';
import { globalContext } from '../../contexts/globalContext.js'

function ClientInfo({ clientid, contracts, firstname, lastname, email, age, gender, weight_lbs, height }) {
  const { register, handleSubmit, watch, errors } = useForm();
  const { clientData, setClientData } = useContext(globalContext);

  const fetchData = () => {
    fetch(`/api/clientinfo/${clientid}`, {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
      })
      .catch((err) => console.log(err));
  };

// TODO: add route #13 to get diet_table info

  return (
    <Router>
        <div className="navbar">
          <p className="navbar__name">{`${firstname} ${lastname} ${email}`}</p>
        </div>
        <p>{`contract: ${contracts}`}</p>
        <p>{`Age: ${age}`}</p>
        <p>{`Gender: ${gender}`}</p>
        <p>{`Weight: ${weight_lbs}`}</p>
        <p>{`Height: ${height}`}</p>

            <div className="main__route">
              <Link to={'/DietForm' + firstname + lastname + clientid} className="main__link">
                Add New Diet
              </Link>
            </div>
        <div className="cardContainer">

        </div>
        <Switch>
          <Route exact path={'/DietForm' + firstname + lastname + clientid}>
            <DietForm 
              clientid={clientid}
            />
          </Route>
        </Switch>
    </Router>
  );
}
export default ClientInfo;


/*

<div>
      <div className="clientInfo__left">
        <img src="#" />
        <p>Trainee Name: {`${firstname} ${lastname}`}</p>
        <p>Email: {`${email}`}</p>
      </div>

      <div className="clientInfo__leftStats">
        <p id="age">Age: </p>
        <p id="gender">Gender: </p>
        <p id="weight">Weight: </p>
        <p id="height">Height: </p>
      </div>

      <div>
        <form
          style={{ display: 'flex', flexDirection: 'column' }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <label>
            {' '}
            Water Intake:
            <input
              name="waterIntake"
              // type="number"
              ref={register({ required: true })}
            />
            ozs.
          </label>

          <label>
            {' '}
            Daily Macro Goals:
            <input
              name="DMG"
              // type="checkbox"
              ref={register({ required: true })}
            />
          </label>

          <label>
            {' '}
            Calorie Intake:
            <input
              name="calorieIntake"
              // type="number"
              ref={register({ required: true })}
            />
          </label>

          <input type="submit" />
        </form>

        */