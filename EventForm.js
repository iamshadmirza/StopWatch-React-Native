import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { formatDateTime, saveEvent } from './api';
const styles = StyleSheet.create({
  fieldContainer: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#fff',
    marginRight: 7,
    marginLeft: 7,
    paddingHorizontal: 5
  },
  text: {
    height: 50,
    margin: 0,
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    alignSelf: 'stretch',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  borderTop: {
    borderColor: '#edeeef',
    borderTopWidth: 0.5
  }
});

class EventForm extends Component {
  state = {
    title: '',
    date: '',
  };

  handleAddPress = () => {
    saveEvent(this.state)
      .then(() => {
        this.props.navigation.goBack();
      })
  }

  handleChangeTitle = (value) => {
    this.setState({
      title: value,
    });
  }
  handleDatePress = () => {
    this.setState({ showDatePicker: true });
  }
  handleDatePicked = (date) => {
    this.setState({
      date,
    });
    this.handleDatePickerHide();
  }
  handleDatePickerHide = () => {
    this.setState({ showDatePicker: false });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.fieldContainer}>
          <TextInput style={styles.text}
            placeholder="Event title"
            spellCheck={false}
            value={this.state.title}
            onChangeText={this.handleChangeTitle}
          ></TextInput>
          <TextInput
            style={[styles.text, styles.borderTop]}
            placeholder="Event date"
            spellCheck={false}
            value={formatDateTime(this.state.date.toString())}
            editable={!this.state.showDatePicker}
            onFocus={this.handleDatePress} />
          <DateTimePicker
            isVisible={this.state.showDatePicker}
            mode="datetime"
            onConfirm={this.handleDatePicked}
            onCancel={this.handleDatePickerHide}
          />

        </View>
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleAddPress}
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default EventForm;