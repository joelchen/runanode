import { connect } from 'react-redux';
import { compose, lifecycle, withState } from 'recompose';
import { storageKeys } from 'renderer/api/utils/storage';
import { Logger } from 'renderer/utils/logging';
import { restartCennzNetNodeChannel } from 'renderer/ipc/cennznet.ipc';
import types from 'renderer/types';
import { NetworkNameMapping, NetworkNameOptions } from 'common/types/cennznet-node.types';
import sreamConstants from 'renderer/constants/stream';
import ROUTES from 'renderer/constants/routes';
import { NETWORK_OPTIONS } from 'renderer/pages/chooseNetworkPage';

const mapStateToProps = ({ nodeSystem, syncStream, syncRemoteStream, localStorage }) => ({
  nodeSystem,
  syncStream,
  syncRemoteStream,
  localStorage,
});

const mapDispatchToProps = dispatch => ({
  onRestartNode: payload => {
    dispatch({ type: types.switchNetwork.triggered, payload });
  },

  navigateToCreateWallet: () => {
    dispatch({
      type: types.navigation.triggered,
      payload: ROUTES.WALLET.ROOT,
    });
  },
});

const enhance = lifecycle({
  componentDidMount() {
    const { localStorage, onRestartNode } = this.props;
    const selectedNetwork = localStorage[storageKeys.SELECTED_NETWORK];
    const genesisConfigFile = localStorage[storageKeys.GENESIS_CONFIG_FILE_INFO];
    const genesisConfigFilePath = genesisConfigFile && genesisConfigFile.path;
    if (selectedNetwork && selectedNetwork.value) {
      const targetChain =
        selectedNetwork.value === NetworkNameOptions.LOCAL_TESTNET && genesisConfigFilePath
          ? genesisConfigFilePath
          : selectedNetwork.value;
      onRestartNode({ chain: targetChain });
    } else {
      onRestartNode();
    }
  },

  // TODO: time out err controller - progress bar red
  componentDidUpdate() {
    /** Precentage */
    const { localStorage, nodeSystem, setIsNetworkSwitched } = this.props;
    const selectedNetwork = localStorage[storageKeys.SELECTED_NETWORK];
    const { localNode } = nodeSystem;
    const { chain } = localNode;
    const isNetworkSwitched = selectedNetwork && selectedNetwork.value === NetworkNameMapping[chain];

    if (isNetworkSwitched) {
      const { blockNum: localBestBlock } = this.props.syncStream;
      const { blockNum: remoteBestBlock } = this.props.syncRemoteStream;
      if (localBestBlock !== null && remoteBestBlock !== null) {
        const syncPercentage = localBestBlock / remoteBestBlock;
        if (syncPercentage >= 1) {
          this.props.navigateToCreateWallet();
        }
      }
    }
  },
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  enhance
);
