import React from "react";
import { Link } from 'react-router-dom';
import CenteredColumns from "./CenteredColumns";
import ErrorComponent from './Error';
import "./ContentCards.scss";
import AvatarComponent from "./Avatar";

function ContentCards(props) {
  const { data, error, fetching } = props;

  if (error) {
    return (
      <CenteredColumns>
        <ErrorComponent>
          Something went wrong: {error}
        </ErrorComponent>
      </CenteredColumns>
    )
  }
  if (fetching) {
    return (
      <CenteredColumns>
        <p>Loading...</p>
      </CenteredColumns>
    );
  }

  if (Object.keys(data).length === 0 && !fetching) {
    return (
      <CenteredColumns>
        <p>This blog is empty.</p>
      </CenteredColumns>
    )
  }

  return (
    <CenteredColumns>
      {Object.keys(data).map(key => (
        <div
          key={key}
          className="column is-half-tablet is-one-quarter-desktop"
        >
          <Link className="ContentCards__card card is-flex" to={data[key].url || ''}>
            <div className="card-content">
              <div className="content">
                {data[key].logoUrl && <AvatarComponent src={data[key].logoUrl} />}
                <h4>{data[key].name || data[key].title}</h4>
                {/* Normally displaying the content of a post here wouldn't be a good idae
                  but considering in this case it's only a small bit of text, it'll be fine.`
                */}
                <p>{data[key].description || data[key].content}</p>
                {data[key].title && (
                  <p>{data[key].createdAt}</p>
                )}
              </div>
            </div>
          </Link>
        </div>
      ))}
    </CenteredColumns>
  );
}

export default ContentCards;
