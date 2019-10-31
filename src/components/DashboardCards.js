import React from "react";
import CenteredColumns from "./CenteredColumns";
import ErrorComponent from './Error';
import "./DashboardCards.scss";

function DashboardCards(props) {
  const { data, error, fetching, onClick } = props;

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
        <p>Your blog is empty.</p>
				<button>create post</button>
      </CenteredColumns>
    )
  }

  return (
    <CenteredColumns>
      {Object.keys(data).map((key, index) => {
				const post = data[key];
				return (
					<div
						key={index}
						className="column is-half-tablet is-one-third-desktop"
						onClick={() => onClick(post)}
					>
						<div className="DashboardCards__card card is-flex">
							<div className="card-content">
								<div className="content">
									<div className="columns">
										<div className="column">
											<h4>{post.title}</h4>
										</div>
										{!post.published && (
											<div className="column">
												<span className="tag is-warning">Draft</span>
											</div>
										)}
										<span className="edit-tag tag is-outlined">Edit</span>
									</div>
									<p>Last update: {post.updatedAt}</p>
								</div>
							</div>
						</div>
					</div>
				);
			})}
    </CenteredColumns>
  );
}

export default DashboardCards;
