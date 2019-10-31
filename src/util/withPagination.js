import React, { useState, useEffect } from 'react';
import useDebounce from '../util/use_debounce';

export const withPagination = WrappedComponent => {
	return props => {
		const { getRecords } = props;
		const [page, setPage] = useState(1);
		const [query, setQuery] = useState('');
		const debouncedSearchTerm = useDebounce(query, 500);

		useEffect(() => { getRecords(page, query); }, [page]);

		useEffect(() => {
			getRecords(1, debouncedSearchTerm);
			setPage(1);
		}, [debouncedSearchTerm]);

		useEffect(() => { getRecords(page); }, []);

		const setPagination = (indice) => {
			if (indice < 0 && page === 1) {
				return;
			}
			setPage(page !== 0 ? page + indice : 1);
		}

		return (
			<>
				<div
					className="control"
					style={{ margin: '0 auto', maxWidth: '35rem', width: '80%' }}
				>
					<input
						className="input"
						type="text"
						placeholder="Search something..."
						value={query}
						onChange={e => setQuery(e.target.value)}
					/>
				</div>
				<WrappedComponent {...props} />
				<nav
					className="pagination is-large"
					style={{ margin: '0 auto', maxWidth: '35rem', width: '80%' }}
					role="navigation"
					aria-label="pagination"
				>
					<button
						className="pagination-previous"
						onClick={() => setPagination(-1)}
						disabled={page <= 1}
					>
						Previous
					</button>
					<button
						className="pagination-next"
						onClick={() => setPagination(1)}
						disabled={!props.pageInfo.hasNextPage}
					>
						Next page
					</button>
				</nav>
			</>
		);
	}
}