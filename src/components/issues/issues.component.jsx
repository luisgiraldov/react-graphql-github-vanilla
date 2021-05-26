import React from 'react';

const Issues = ({ repository }) => (
    <ul>
        {repository.issues.edges.map(issue => (
                <li key={issue.node.id}>
                    <a href={issue.node.url}>
                        {issue.node.title}
                    </a>
                </li>
            ))
        }
    </ul>
);

export default Issues;