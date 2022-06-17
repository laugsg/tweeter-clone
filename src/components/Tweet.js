import React, { Component } from "react";
import { connect } from "react-redux";
import { formatDate, formatTweet } from "../utils/helpers";

// Icons
import { TiArrowBackOutline } from "react-icons/ti";
import { TiHeartOutline } from "react-icons/ti";
import { TiHeartFullOutline } from "react-icons/ti";

class Tweet extends Component {
  handleLike = (e) => {
    e.preventDefault();
    // todo: Handle Like Tweet
  };
  toParent = (e, id) => {
    e.preventDefault();
    // todo: Redirect to parent tweet
  };
  render() {
    const { tweet } = this.props;

    if (tweet === null) return <p>This Tweet doesn't exist.</p>;

    const {
      name,
      avatar,
      timestamp,
      text,
      hasLiked,
      likes,
      replies,
      parent,
    } = tweet;

    return (
      <div className="tweet">
        <img className="avatar" src={avatar} alt={`Avatar of ${name}`} />
        <div className="tweet-info">
          <div>
            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
            {parent && (
              <button
                className="replying-to"
                onClick={(e) => this.toParent(e, parent.id)}
              >
                Replaying to @{parent.author}
              </button>
            )}
            <p>{text}</p>
          </div>
          <div className="tweet-icons">
            <TiArrowBackOutline className="tweet-icon" />
            <span>{replies !== 0 && replies}</span>
            <button className="heart-button" onClick={this.handleLike}>
              {hasLiked === true ? (
                <TiHeartFullOutline color="#e0245e" className="tweet-icon" />
              ) : (
                <TiHeartOutline className="tweet-icon" />
              )}
            </button>
            <span>{likes !== 0 && likes}</span>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, { id }) {
  const tweet = state.tweets[id];
  const parentTweet = tweet ? state.tweets[tweet.replyingTo] : null;
  return {
    authedUser: state.authedUser,
    tweet: tweet
      ? formatTweet(
          tweet,
          state.users[tweet.author],
          state.authedUser,
          parentTweet
        )
      : null,
  };
}
export default connect(mapStateToProps)(Tweet);
