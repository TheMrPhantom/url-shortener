import React from 'react'

const ExternalLink = ({url,text}) => {
    return (
        <a href={url}>{text}</a>
    )
}

export default ExternalLink
