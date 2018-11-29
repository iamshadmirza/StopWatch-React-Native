import React, { Component } from 'react';
import {
  StyleSheet,
  FlatList,
} from 'react-native';
import ActionButton from 'react-native-action-button';

import EventCard from './EventCard';

import { getEvents } from './api';

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingTop: 5,
  },
});

class EventList extends Component {
  static navigationOptions = {
    title: 'Your Events',
  };

  state = {
    events: [
      {
        "title": "Release RN course",
        "date": "2018-06-15T00:00:00.000Z",
        "id": "05dafc66-bd91-43a0-a752-4dc40f039144"
      },
    ],
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        events: this.state.events.map(evt => ({
          ...evt,
          timer: Date.now(),
        })),
      });
    }, 1000);

    this.props.navigation.addListener(
      'didFocus',
      () => {
        getEvents().then(events => this.setState({ events }));
      }
    );
  }

  handleAddEvent = () => {
    this.props.navigation.navigate('form')
  }


  render() {
    // console.log('isfocused', this.props.navigation.isFocused);
    return [
      <FlatList
        key="flatlist"
        data={this.state.events}
        style={styles.list}
        keyExtractor={item => item.id}
        renderItem={({ item, separators }) => (
          <EventCard
            event={item}
          />
        )}
      />,
      <ActionButton
        key="fab"
        buttonColor="rgba(231,76,60,1)"
        onPress={this.handleAddEvent}
      />,
    ];
  }
}

export default EventList;