import React from 'react'
import Header from '../../_components/header'
import FilesView from '../../_components/filesView'

const Favorites = () => {
    return (
        <div className='px-5 lg:px-10 pb-5'>
            <Header />
            <FilesView favoriteOnly />
        </div>
    )
}

export default Favorites