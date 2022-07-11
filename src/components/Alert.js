import React from 'react'

const Alert = (props) => {
    return (
        <div className={`alert alert-${props.type}`} role="alert">
            {props.message};
        </div>
    )
}

export default Alert