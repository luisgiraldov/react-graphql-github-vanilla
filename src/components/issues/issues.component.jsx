import React from 'react';

const Issues = ({ repository }) => (
    <ul>
        {repository.issues.edges.map(issue => (
                <li key={issue.node.id}>
                    <a href={issue.node.url}>
                        {issue.node.title}
                    </a>
                    <ul>
                        {issue.node.reactions.edges.map(reaction => (
                            <li key={reaction.node.id}>
                                {reaction.node.content}
                            </li>
                        ))}
                    </ul>
                </li>
            ))
        }
    </ul>
);

export default Issues;