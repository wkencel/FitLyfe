import React, { useEffect, useContext } from 'react';
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom';
import ClientCard from './components/ClientCard';
import ClientInfo from './components/ClientInfo';
import ClientForm from './components/ClientForm';
import { globalContext } from '../contexts/globalContext';
import Trainee1 from '../assets/trainee1.jpg';
import Trainee2 from '../assets/trainee2.jpg';
import Trainee3 from '../assets/trainee3.png';
import Trainee4 from '../assets/trainee4.jpg';
import Trainee5 from '../assets/trainee5.jpeg';
import Trainee6 from '../assets/trainee6.jpg';
import Trainee7 from '../assets/trainee7.jpg';
import { Avatar, AvatarBadge, AvatarGroup, Button } from "@chakra-ui/react"


function App() {
  const { clients, setClients } = useContext(globalContext);
  const fetchData = () => {
    fetch('/api/allTrainees', {
      method: 'GET',
      headers: { 'content-type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        setClients(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const cards = [];
  const traineeArr = [Trainee1, Trainee2, Trainee3, Trainee4, Trainee5, Trainee6, Trainee7]
  for (let i = 0; i < clients.length; i++) {
    cards.push(
      <Switch>
        <Route exact path='/'>
          <div>
            <Link to={'/' + clients[i].firstname + clients[i].lastname + clients[i].clientid}  >
              <button className='btn'>
                <ClientCard
                  key={i}
                  trainee={traineeArr[i]}
                  clientid={clients[i].clientid}
                  firstname={clients[i].firstname}
                  lastname={clients[i].lastname}
                  email={clients[i].email}
                />
              </button>
            </Link>
            </div>
        </Route>

        <Route path={'/' + clients[i].firstname + clients[i].lastname + clients[i].clientid}>
        <div>
          <ClientInfo
          key={i}
          //pass in biometric info
          firstname={clients[i].firstname}
          lastname={clients[i].lastname}
          email={clients[i].email}
          clientid={clients[i].clientid}
           />
        </div>
      </Route>
      </Switch>
    );
  }
  

  return (
    <Router>
        <div className="navbar">
          <p className="navbar__name">FitLyfe</p>
          <Avatar size="xl"/>
        </div>
            <div className="main__route">
              <Link to="/" className="main__link">
                Show Clients
              </Link>
              <Link to="/clientForm" className="main__link">
                Add New Client
              </Link>
            </div>
        <div className="cardContainer">
        {cards}
        </div>
        <Switch>
          <Route exact path="/clientForm">
            <ClientForm />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
