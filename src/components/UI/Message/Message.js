import React from 'react';

const Message = (props) => {
    return (
        <div>
            <p className={`message message-${props.type}`}>{props.title}</p>
        </div>
    );
};

export default Message;