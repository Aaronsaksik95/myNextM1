import React from 'react';

function Logo(props) {
    return (
        <div>
            <img src={`${props.src}`} alt="Vercel Logo" width={72} height={16} />
        </div>
    );
}

export default Logo;