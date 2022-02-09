import React from 'react';
import Image from 'next/image'

function Logo(props) {
    return (
        <div>
            <Image src={`${props.src}`} alt="Vercel Logo" width={72} height={16} />
        </div>
    );
}

export default Logo;