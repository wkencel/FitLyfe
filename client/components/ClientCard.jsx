import React from 'react';
import { Box } from '@chakra-ui/react';
import { Switch, Route } from 'react-router-dom';
import ClientInfo from './ClientInfo';

function ClientCard({ firstname, lastname, email, clientid, trainee, contracts, age, gender, weight_lbs, height }) {
  return (
    <Switch>
      <Route exact path="/">
          <Box
            className="clientCard" 
          >
          <img alt={'trainee-id'} src={trainee}  width='400px' height='400px' />
            <p>{`${firstname} ${lastname}`}</p>
          </Box>
      </Route>
      <Route path="/clientid">
        <ClientInfo 
          clientid={clientid}
          firstname={firstname}
          lastname={firstname}
          email={email}
          contracts={contracts}
          age={age}
          gender={gender}
          weight_lbs={weight_lbs}
          height={height}
        />
      </Route>
    </Switch>
  );
}

export default ClientCard;
