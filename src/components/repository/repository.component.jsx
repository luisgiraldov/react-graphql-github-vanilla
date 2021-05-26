import React from 'react';
import Issues from '../issues/issues.component';

const Repository = ({ repository }) => (
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
    </div>
);

export default Repository;