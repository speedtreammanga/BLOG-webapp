import React, { useEffect } from 'react';
import ErrorComponent from './Error';

const EditRecordModal = ({
	record,
	editing,
	closeEditRecordHandler,
	onSubmit,
	onDelete,
	updateRecord,
	recordTypes,
	error,
	onClose,
}) => {
	//call onClose before this component unmounts
	useEffect(() => {
		return () => {
			onClose();
		}
	}, []);
	return (
		<div
			className="modal-background"
			style={{
				position: 'fixed',
				zIndex: '99999',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div className="modal-card">
				<header className="modal-card-head">
					<p className="modal-card-title">
						{record.id ? 'Edit' : 'Create'}
						{' '}
						{editing.type === recordTypes.BLOG ? 'Blog' : 'Post'}
					</p>
				</header>
				<section className="modal-card-body">
					{error && <ErrorComponent error={error} />}
					<div className="field">
						<label className="label">
							{editing.type === recordTypes.BLOG ? 'Name' : 'Title'}
						</label>
						<div className="control">
							<input
								className="input"
								type="text"
								value={record.name || record.title || ""}
								onChange={e => updateRecord(
									e,
									editing.type === recordTypes.BLOG ? 'name' : 'title'
								)}
							/>
						</div>
					</div>
					{editing.type === recordTypes.BLOG && (
						<div className="field">
							<label className="label">
								Logo (URL)
							</label>
							<div className="control">
								<input
									className="input"
									type="text"
									value={record.logoUrl || ""}
									onChange={e => updateRecord(e, 'logoUrl')}
								/>
							</div>
						</div>
					)}
					<div className="field">
						<label className="label">
							{editing.type === recordTypes.BLOG ? 'Description' : 'Content'}
						</label>
						<div className="control">
							<textarea
								className="textarea"
								value={record.description || record.content || ""}
								onChange={e => updateRecord(
									e,
									editing.type === recordTypes.BLOG ? 'description' : 'content'
								)}
							/>
						</div>
					</div>
				</section>
				<footer className="modal-card-foot">
					<div className="field is-grouped">
						{record.id && (
							<p className="control">
							<button
								className={`button is-danger ${editing.deleting ? 'is-loading': ''}`}
								disabled={editing.deleting || editing.submitting ? true : false}
								onClick={() => onDelete(record.id, editing.type)}
							>
									Delete {editing.type === recordTypes.BLOG ? 'blog' : 'post'}
								</button>
							</p>
						)}
						<p className="control">
							<button
								className="button"
								onClick={closeEditRecordHandler}
							>
								Close
							</button>
						</p>
						{editing.type === recordTypes.POST && (
							<p className="control">
								<button
									className={`button is-warning ${editing.submitting ? 'is-loading': ''}`}
									onClick={() => onSubmit()(false)}
									disabled={editing.deleting || editing.submitting ? true : false}
								>
									{!record.id || record.published ? 'Save as draft' : 'Save changes'}
								</button>
							</p>
						)}
						<p className="control">
							<button
								className={`button is-black ${editing.submitting ? 'is-loading': ''}`}
								onClick={() => onSubmit()(true)}
								disabled={editing.deleting || editing.submitting ? true : false}
							>
								{(record.published) || (editing.type === recordTypes.BLOG && record.id)
									? 'Save changes'
									: 'Publish'}
							</button>
						</p>
					</div>
				</footer>
			</div>
		</div>
	);
}

export default EditRecordModal;