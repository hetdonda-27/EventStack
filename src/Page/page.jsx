import React from 'react'
import data from '../Data/card.json';
import Card from '../Page/Card';

const Page = () => {
    return (
        <Card events={data} />
    )
}

export default Page