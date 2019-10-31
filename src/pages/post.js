import React, { PureComponent } from "react";
import { connect } from 'react-redux';
import { fetchSinglePost } from '../redux/posts/actions';
import PostDetailsComponent from "./../components/PostDetailsComponent";
import CenteredColumns from '../components/CenteredColumns';

class PostPage extends PureComponent {
  constructor(props) {
    super(props);
    const { getPost, match: { params: { id } } } = props;
    getPost(id);
  }

  render() {
    const { fetching, post, match: { params: { id } } } = this.props;
    if (fetching) {
      return (<CenteredColumns><p>Loading...</p></CenteredColumns>);
    }
    if (!post) {
      return (
        <div
          style={{
            padding: "50px",
            width: "100%",
            textAlign: "center"
          }}
        >
          The post <code>{id}</code> could not be found.
        </div>
      );
    }

    return (
      <PostDetailsComponent
        color="white"
        size="medium"
        title={post.title}
        date={post.createdAt}
        content={post.content}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  fetching: state.posts.fetching,
  error: state.posts.error,
  post: state.posts.data[ownProps.match.params.id] || null,
});

const mapDispatchToProps = ({
  getPost: fetchSinglePost,
});

export default connect(mapStateToProps, mapDispatchToProps)(PostPage);
