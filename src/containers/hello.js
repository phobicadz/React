import React from 'react';

type Props = {
  name: string
}

// react actually prefers one file per component
export class HelloWorld extends React.PureComponent {
  render() {
    return (
      <div>
          Hello {this.props.name}
      </div>
    );
  }
}

export class ShowUsers extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>
        {this.props.value}
      </div>
    );
  }
}

export class ShowSenders extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>
        <select>
          {this.props.senders}
        </select>
      </div>
    );
  }
}

export class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.props.onNumberChange(event.target.value);
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert(`A name was submitted: ${this.state.value}`);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="txtNumber">
          Name:
          <input type="text" value={this.props.value} onChange={this.handleChange} id="txtNumber" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}

export class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <FormattedDate date={this.state.date} />
      </div>
    );
  }
}

