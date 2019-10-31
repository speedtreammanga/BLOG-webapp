import React from "react";
import { connect } from 'react-redux';
import ListComponent from "./../components/ListComponent";
import { fetchPosts } from '../redux/posts/actions';
import { fetchSingleBlog } from '../redux/blogs/actions';
import { withPagination } from '../util/withPagination';

const BlogPage = props => {
  if (!props.blog) {
    props.fetchBlog();
  }
  return (
  <ListComponent
    color="white"
    size="medium"
    title={(props.blog && props.blog.name) || "Blog"}
    {...props}
  />
)};

const mapStateToProps = (state, ownProps) => ({
  ...state.posts,
  blog: state.blogs.data[ownProps.match.params.id] || null,
  fetching: state.blogs.fetching,
  error: state.blogs.error,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getRecords: (pageId, query) =>
    dispatch(fetchPosts(ownProps.match.params.id, pageId, query)),
  fetchBlog: () => dispatch(fetchSingleBlog(ownProps.match.params.id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withPagination(BlogPage));