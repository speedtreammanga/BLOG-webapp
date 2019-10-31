import React from 'react';
import AvatarComponent from './Avatar';

const DashboardBlogHeader = ({
	onEditRecord,
	record,
	blog,
	recordTypes
}) => {
	return (
		<>
			<div
				className="columns"
				style={{ cursor: 'pointer' }}
				onClick={() => onEditRecord(blog, recordTypes.BLOG)}
			>
				<div className="column">
					<div style={{ display: 'flex', flexDirection: 'row' }}>
						<AvatarComponent src={blog.logoUrl} />
						<div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '1rem' }}>
							<h1 className="is-medium title has-text-weight-bold">
								{blog.name}
							</h1>
							<h3 className="subtitle is-medium">
								{blog.description}
							</h3>
						</div>
					</div>
				</div>
				<div className="column">
					<button
						className="button is-black is-outlined"
						onClick={() => onEditRecord(blog, recordTypes.BLOG)}
					>
						Edit
					</button>
				</div>
			</div>
			<button
				className="button is-black"
				style={{ marginBottom: '1.5rem' }}
				onClick={() => onEditRecord(record, recordTypes.POST)}
			>
				Create Post
			</button>
		</>
	);
}

export default DashboardBlogHeader;