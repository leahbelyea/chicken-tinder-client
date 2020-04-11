/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core'
import socketIOClient from "socket.io-client";
import Header from './components/Header';
import Invite from './components/Invite';
import Options from './components/Options';
import Swipe from './components/Swipe';
import Wait from './components/Wait';
import Results from './components/Results';

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Roboto, sans-serif'
  }
};

class App extends React.Component {
  componentDidMount() {
    const socket = socketIOClient(process.env.REACT_APP_API_URL);
    const roomId = window.location.pathname.replace('/', '');
    this.setState({ socket });

    if (roomId) {
      socket.emit('join', {roomId});
      this.setState({ roomId, phase: 'swipe' });
    } else {
      this.setState({ fetchingLocation: true, phase: 'options' });
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({ location: { latitude: position.coords.latitude, longitude: position.coords.longitude }, fetchingLocation: false });
      });
    }

    socket.on('assignedRoom', data => this.setState({ roomId: data }));
    socket.on('fetchedChoices', data => this.setState({ choices: data || [], phase: 'swipe' }));
    socket.on('selectedMatches', data => this.setState({ selectedMatches: data, phase: 'results' }));
  }

  startSession = options => {
    const { socket, roomId, location } = this.state;
    socket.emit('join', { roomId, options: {...options, ...location} });
    this.setState({ phase: 'invite' });
  }

  onDoneSwiping = choices => {
    const { socket } = this.state;
    socket.emit('choices', { choices });
    this.setState({ phase: 'wait' });
  }

  render() {
    const { phase, roomId, choices, fetchingLocation, selectedMatches } = this.state || {};

    return (
      <div css={styles.wrapper}>
        <Header />
        {phase === 'options' && <Options startSession={this.startSession} fetchingLocation={fetchingLocation}/>}
        {phase === 'invite' && <Invite roomId={roomId} />}
        {phase === 'swipe' && <Swipe choices={choices} onDone={this.onDoneSwiping} />}
        {phase === 'wait' && <Wait />}
        {phase === 'results' && <Results matches={selectedMatches} />}
      </div>
    );
  }
}

export default App;
