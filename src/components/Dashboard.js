import React, { Component } from "react";
import { connect } from "react-redux";

// Components
import Tweet from "./Tweet";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h3 className="center">Your Timeline</h3>
        <ul className="dashboard-list">
          {this.props.tweetIDs.map((id) => (
            <li key={id}>
              <Tweet id={id}/>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    tweetIDs: Object.keys(state.tweets)
      .sort((a,b) => state.tweets[b].timestamp - state.tweets[a].timestamp),
  };
}
export default connect(mapStateToProps)(Dashboard);
