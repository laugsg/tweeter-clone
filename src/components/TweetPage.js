import React, { Component } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

// Components
import Tweet from "./Tweet";
import NewTweet from "./NewTweet";

function TweetPage(props) {
  const { tweets } = props;
  const { id } = useParams();
  let replies = !tweets[id]
    ? []
    : tweets[id].replies.sort(
        (a, b) => tweets[b].timestamp - tweets[a].timestamp
      );
  console.log("replies", replies);
  return (
    <div>
      <Tweet id={id} />
      <NewTweet id={id} />
      {replies.length !== 0 && <h3 className="center">Replies</h3>}
      <ul>
        {replies.map((replyId) => (
          <li key={replyId}>
            <Tweet id={replyId} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function mapStateToProps({ tweets }) {
  return {
    tweets,
  };
}

export default connect(mapStateToProps)(TweetPage);
