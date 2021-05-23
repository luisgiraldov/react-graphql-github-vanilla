import React from 'react';

const Organization = ({ organization, errors }) => {
    if(errors) {
        return (
            <p>
                <strong>
                    Something went wrong:
                </strong>
                {errors.map(error => error.message).join(' ')}
            </p>
        );
    }

    return (<div>
                <p>
                    <strong>
                        Issues from Organization: 
                    </strong>
                    &nbsp;
                    <a href={organization.url}>
                        { organization.name }
                    </a>
                </p>
            </div>)
};

export default Organization;