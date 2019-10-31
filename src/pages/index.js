import React from "react";
import { connect } from 'react-redux';
import ListComponent from "./../components/ListComponent";
import { fetchBlogs } from '../redux/blogs/actions';
import {withPagination} from '../util/withPagination';

const IndexPage = props => (
  <ListComponent
    color="white"
    size="medium"
    title="Blogs"
    {...props}
  />
);

const mapStateToProps = state => ({
  ...state.blogs
});

const mapDispatchToProps = {
  getRecords: (pageId, query) => fetchBlogs(pageId, query)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withPagination(IndexPage));