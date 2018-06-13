import React, { Component } from 'react';

export default class ReleaseTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      now: moment(),
      dateTo: moment(this.props.dateTo),
      day: 0,
      hour: 0,
      min: 0,
      sec: 0,
    };
    this.timer = this.timer.bind(this);
  }
  componentDidMount() {
    this.countdown = setInterval(this.timer, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.ReleaseTimer);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dateTo !== this.props.dateTo) {
      this.setState({
        dateTo: moment(this.props.dateTo),
      });
    }
  }
  timer() {
    const now = moment();
    const sec = this.state.dateTo.diff(now, 'seconds') % 60;
    const min = this.state.dateTo.diff(now, 'minutes') % 60;
    const hour = this.state.dateTo.diff(now, 'hours') % 24;
    const day = this.state.dateTo.diff(now, 'days');
    this.setState({
      now,
      day: day < 10 ? `0${day}` : day,
      hour: hour < 10 ? `0${hour}` : hour,
      min: min < 10 ? `0${min}` : min,
      sec: sec < 10 ? `0${sec}` : sec,
    });
  }
  renderDays() {
    if (this.state.day > 1) {
      return `${this.state.day} days `;
    } else if (this.state.day === 1) {
      return `${this.state.day} day `;
    }
    return '';
  }
  render() {
    return (
      <div>
        {this.renderDays()} {this.state.hour}:{this.state.min}:{this.state.sec}
      </div>
    );
  }
}
ReleaseTimer.defaultProps = {
  dateTo: { year: 2058, month: 11, date: 25 },
};
