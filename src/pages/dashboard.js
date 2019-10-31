import React, { PureComponent } from "react";
import { connect } from 'react-redux';
import { fetchBlogAndPosts } from '../redux/user/actions';
import Section from '../components/Section';
import DashboardCards from '../components/DashboardCards';
import { editRecord, editRecordSubmit, closeEditRecord, deleteRecord } from '../redux/user/actions';
import { RECORD_TYPES } from '../redux/user/constants';
import EditRecordModal from "../components/EditRecordModal";
import DashboardBlogHeader from "../components/DashboardBlogHeader";
import ErrorComponent from "../components/Error";
import CenteredColumns from "../components/CenteredColumns";
import { isEmpty } from '../util/empty';

class DashboardPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { record: {} };
    const { getData, } = props;
    getData();
  }

  onEditRecord = (record, type) => {
    const { editRecordHandler } = this.props;
    this.setState({ record }, function() {
      editRecordHandler(record, type);
    });
  }

  onSubmit = () => publish => {
    const { submitRecordHandler } = this.props;
    let { record } = this.state;
    record = {
      ...record,
      published: publish
    };
    submitRecordHandler(record);
  }

  onDelete = (id, recordType) => {
    if (window.confirm("Are you sure?")) {
      const { deleteRecordHandler } = this.props;
      deleteRecordHandler(id, recordType);
    }
  }

  updateRecord = (e, field) => {
    const value = e.target.value;
    this.setState(prevState => ({
      record: {
        ...prevState.record,
        [field]: value,
      }
    }));
  }

  resetState = () => this.setState({ record: {} });

  render() {
    let {
      user: { blog, posts, error, fetching },
      editing,
      closeEditRecordHandler,
    } = this.props;

    const { record } = this.state;

    return (
      <>
      {editing.type && (
        <EditRecordModal
          record={record}
          editing={editing}
          closeEditRecordHandler={closeEditRecordHandler}
          onSubmit={this.onSubmit}
          onDelete={this.onDelete}
          updateRecord={this.updateRecord}
          recordTypes={RECORD_TYPES}
          error={editing.error}
          onClose={this.resetState}
        />
      )}
      <Section>
        <div className="container content">
          <CenteredColumns>
            {fetching && <p>fetching...</p>}
            {(error || editing.error) && (
              <ErrorComponent error={error} />
            )}
            {!fetching && isEmpty(blog) && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1 className="title is-large">Make this your home</h1>
                <button
                  className="button is-black"
                  onClick={() => this.onEditRecord({}, RECORD_TYPES.BLOG)}
                >
                  Create a blog
                </button>
              </div>
            )}
          </CenteredColumns>
          {!fetching && !isEmpty(blog) && (
            <>
              <DashboardBlogHeader
              	onEditRecord={this.onEditRecord}
                record={record}
                blog={blog}
                recordTypes={RECORD_TYPES}
              />
              {!isEmpty(posts) && (
                <div className="DashboardCards">
                  <DashboardCards
                    data={posts}
                    fetching={fetching}
                    error={error}
                    onClick={post => this.onEditRecord(post, RECORD_TYPES.POST)}
                  />
                </div>
              )}
            </>

          )}
        </div>
      </Section>
      </>
    );
  }
}

const mapStateToProps = state => {
  const { editing, ...user } = state.user;
  return {
    user,
    editing,
  };
};

const mapDispatchToProps = {
  getData: () => fetchBlogAndPosts(),
  editRecordHandler: (record, type) => editRecord(record, type),
  closeEditRecordHandler: () => closeEditRecord(),
  submitRecordHandler: record => editRecordSubmit(record),
  deleteRecordHandler: (id, recordType) => deleteRecord(id, recordType),
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
