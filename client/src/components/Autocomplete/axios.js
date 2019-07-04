import React from 'react';
import axios from 'axios';
import _ from 'underscore';
import isEqual from 'react-fast-compare';

class Axios extends React.Component {
  state = {
    data: undefined,
    loading: false,
    error: false
  };

  cancelToken = null;

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate({ children: _, ...prevProps }) {
    const { children, ...props } = this.props;
    if (!isEqual(prevProps, props)) {
      this.fetchData();
    }
  }

  componentWillUnmount() {
    if (this.cancelToken) {
      this.cancelToken();
    }
  }

  makeNetworkRequest = _.debounce(
    () => {
      const { url, method = 'get', data } = this.props;

      axios({
        url,
        method,
        data
      })
        .then(res => {
          this.setState({
            data: res.data,
            loading: false,
            error: false
          });
        })
        .catch(e => {
          // Early return if request was cancelled
          if (axios.isCancel(e)) {
            return;
          }
          this.setState({ data: undefined, error: e.message, loading: false });
        });
    },
    { wait: 200 }
  );

  fetchData = () => {
    if (this.cancelToken) {
      this.cancelToken();
    }

    this.setState({ error: false, loading: true });

    this.makeNetworkRequest();
  };

  render() {
    const { children } = this.props;
    const { data, loading, error } = this.state;

    return children({
      data,
      loading,
      error,
      refetch: this.fetchData
    });
  }
}

export default Axios;
