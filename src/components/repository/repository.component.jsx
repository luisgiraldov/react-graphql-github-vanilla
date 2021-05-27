import React from 'react';
import Issues from '../issues/issues.component';

const Repository = ({ repository, onFetchMoreIssues }) => (
    <div>
        <p>
            <strong>
                In Repository
            </strong>
            &nbsp;
            <a href={repository.url}>
                {repository.name}
            </a>
        </p>
        <Issues repository={repository} />

        <hr />
        {repository.issues.pageInfo.hasNextPage && (
            <button onClick={onFetchMoreIssues}>More</button>
        )}
    </div>
);

export default Repository;