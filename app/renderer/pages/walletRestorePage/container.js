import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import types from 'renderer/types';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  onReset: () => {
    dispatch({ type: types.resetLocalStorage.triggered });
  },
});

const enhance = lifecycle({
  componentDidMount() {},
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  enhance
);