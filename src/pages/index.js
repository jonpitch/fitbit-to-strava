import React from 'react';
import Page from '../components/page';

class IndexPage extends React.Component {
  state = { loading: false, msg: null };
  handleClick = e => {
    e.preventDefault();

    this.setState({ loading: true });
    fetch('/.netlify/functions/hello')
      .then(response => response.json())
      .then(json => this.setState({ loading: false, msg: json.msg }));
  };

  render() {
    const { loading, msg } = this.state;
    return (
      <Page>
        <h1>index</h1>
        <button onClick={this.handleClick}>
          {loading ? 'Loading...' : 'Call Lambda Function'}
        </button>
        <p>{msg}</p>
      </Page>
    );
  }
}

export default IndexPage;
