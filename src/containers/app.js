import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadApp } from 'actions/app';
import styles from './app.css';
import Hello, { ShowUsers, NameForm, ShowSenders, Clock } from './hello';

type Props = {
  dispatch: () => void,
  loaded: boolean
}
export class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.state = {
      peopleToDisplay: 10
    };
  }

  componentDidMount() {
    this.props.dispatch(loadApp());
    this.getPictures(this.state.peopleToDisplay);
    this.getSenders();
  }

  getPictures(value) {
    fetch(`https://randomuser.me/api/?results=${value}`)
      .then(results => results.json()).then(data => {
        const pictures = data.results.map((pic) => (
          <div key={pic.login.salt}>
            <img src={pic.picture.medium} alt="" />
            <span>{pic.name.title}&nbsp;{pic.name.first}&nbsp;{pic.name.last}</span>
          </div>
        ));
        this.setState({ pictures, peopleToDisplay: value });
      });
  }

  getSenders() {
    fetch('http://localhost:3000/getSender')
      .then(results => results.json()).then(data => {
        const senders = data.map((sender) => (
          <option key={sender.sender}>{sender.sender}</option>
        ));
        this.setState({ senders });
      });
  }

  props: Props;

  handleNumberChange(value) {
    this.getPictures(value);
  }

  render() {
    if (!this.props.loaded) {
      return null;
    }

    return (
      <div className={styles.container}>
        <span>This is a test</span>
        <br />
        <b>So there</b>
        <Hello name="Barry" />
        <ShowSenders senders={this.state.senders} />
        <NameForm onNumberChange={this.handleNumberChange} value={this.state.peopleToDisplay} />
        <br />
        <ShowUsers value={this.state.pictures} />
        <Clock />
      </div>
    );
  }
}

function mapStateToProperties(state) {
  return {
    loaded: state.app.loaded
  };
}

// map state  
export default connect(mapStateToProperties)(AppContainer);
