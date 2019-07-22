import React from 'react';
import Channels from './Channels';

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//   }
//
//   render() {
//     const { gon } = this.props;
//     const { channels } = gon;
//     return (
//       <div className="row">
//         <Channels channelsList={channels} />
//       </div>
//     );
//   }
// }

const App = (props) => {
  const { gon } = props;
  const { channels } = gon;
  return (
    <div className="row">
      <Channels channelsList={channels} />
    </div>
  );
};

export default App;
