import React, { Component } from "react";
import { connect } from "react-redux";
import { formatDate, formatTweet } from "../utils/helpers";
import { Link } from 'react-router-dom'

// Icons
import { TiArrowBackOutline } from "react-icons/ti";
import { TiHeartOutline } from "react-icons/ti";
import { TiHeartFullOutline } from "react-icons/ti";
import { handleToggleTweet } from "../actions/tweets";

class Tweet extends Component {
  handleLike = (e) => {
    e.preventDefault();
    
    const { dispatch, tweet, authedUser } = this.props
    dispatch(handleToggleTweet({
      id: tweet.id,
      hasLiked: tweet.hasLiked,
      authedUser
    }))
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
      id,
      hasLiked,
      likes,
      replies,
      parent,
    } = tweet;

    return (
      <Link to={`/tweet/${id}`} className="tweet">
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
      </Link>
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
