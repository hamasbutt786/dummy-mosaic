import React from 'react'

const Heading = ({text,extendClass}) => {
    return (
        <div className={` leading-none ${extendClass} font-semibold text-card-heading`}>
            {text}
        </div>
    )
}

export default Heading