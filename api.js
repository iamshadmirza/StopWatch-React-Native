import uuid from 'uuid';
import moment from 'moment';
import Expo from "expo";

const { manifest } = Expo.Constants;
const api = manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:3000`)
  : `api.example.com`;

const url = `http://${api}/events`;

export function getEvents() {
  return fetch(url)
  .then(response => response.json())
  .then(events => events.map(e => ({ ...e, date: new Date(e.date) })))
  .catch(function(error) {
    console.log('There has been a problem with your fetch operation: ' + error.message);
     // ADD THIS THROW error
      throw error;
    });
}

export function saveEvent({ title, date }) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      title,
      date,
      id: uuid(),
    }),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
  .then(res => res.json())
  .catch(function(error) {
    console.log('There has been a problem with your fetch operation: ' + error.message);
     // ADD THIS THROW error
      throw error;
    });
}


export function formatDate(dateString) {
  const parsed = moment(new Date(dateString));

  if (!parsed.isValid()) {
    return dateString;
  }

  return parsed.format('D MMM YYYY');
}

export function formatDateTime(dateString) {
  const parsed = moment(new Date(dateString));

  if (!parsed.isValid()) {
    return dateString;
  }

  return parsed.format('H A on D MMM YYYY');
}

export function getCountdownParts(eventDate) {
  const duration = moment.duration(moment(new Date(eventDate)).diff(new Date()));
  return {
    days: parseInt(duration.as('days')),
    hours: duration.get('hours'),
    minutes: duration.get('minutes'),
    seconds: duration.get('seconds'),
  };
}