import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MovieContainer from './MovieContainer';

const YouTubeContainer = ({ videoId }) => {
    return (
        <div className='flex justify-center w-screen h-screen'>
            <div className='h-full w-full p-5 m-3'>
                <iframe className="w-full h-full" src={videoId} title="YouTube video player" allowFullScreen></iframe>
            </div>
        </div>
    );
};

function WatchContainer() {
    const { id } = useParams();
    const [currentMovie, setCurrentMovie] = useState("")

    useEffect(() => {
        try {
            fetch(`${process.env.REACT_APP_BE_HOST}/api/movies/${id}`)
                .then(async (response) => {
                    const moviesResponse = await response.json();
                    moviesResponse.pageLink = `https://www.youtube.com/embed/${moviesResponse.pageLink}`
                    setCurrentMovie(moviesResponse)
                }).catch(e => {
                }) 

        } catch (error) {
            // setError(error);
        }
    }, [id])
    return (
        <div className="flex flex-col justify-center items-center h-full m-2">
            <YouTubeContainer videoId={currentMovie.pageLink} />
            <MovieContainer />
        </div>
    )
}

export default WatchContainer