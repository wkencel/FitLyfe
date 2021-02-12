import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import ClientCard from './ClientCard';
import {
  Button,
  ButtonGroup,
  FormControl,
  Input,
  FormLabel,
} from '@chakra-ui/react';
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom';
import { DietForm } from './DietForm.jsx';
import { globalContext } from '../../contexts/globalContext.js';

function ClientInfo({
  clientid,
  contracts,
  firstname,
  lastname,
  email,
  age,
  gender,
  weight_lbs,
  height,
}) {
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
        className="clientInfo"
      >
        <p className="clientInfo__metrics clientName">{`${firstname} ${lastname}`}</p>
        <p className="clientInfo__metrics">{`${email}`}</p>
        <div className="clientInfo__divider"></div>
        <p className="clientInfo__metrics" id="age">
          Age: {age}
        </p>
        <p className="clientInfo__metrics" id="gender">
          Gender: {gender}
        </p>
        <p className="clientInfo__metrics" id="weight">
          Weight: {weight_lbs}
        </p>
        <p className="clientInfo__metrics" id="height">
          Height: {height}
        </p>
        <div className="clientInfo__divider"></div>

        <div className="main__route">
          <Link
            to={'/DietForm' + firstname + lastname + clientid}
            className="main__link"
          >
            Add New Diet
          </Link>
        </div>
        <Switch>
          <Route exact path={'/DietForm' + firstname + lastname + clientid}>
            <DietForm clientid={clientid} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default ClientInfo;
