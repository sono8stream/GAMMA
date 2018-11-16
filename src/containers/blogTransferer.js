import React from 'react';

export default class BlogTransferer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.history.push('/blogs');
  }

  render() {
    return null;
  }
}