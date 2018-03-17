import React, { Component } from 'react';
import Card from '../components/Card';

class CardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starFilled: false,
    };
  }

  toggleFav = () => this.setState({ starFilled: !this.state.starFilled })

  render() {
    return (
      <Card
        starFilled={this.state.starFilled}
        toggleFav={this.toggleFav}
      />
    );
  }
}

export default(CardContainer);
