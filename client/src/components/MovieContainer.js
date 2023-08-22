import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import fetchData from '../utils'
import { addMoreMovie, setLoading } from '../store/movieSlice';
import { useEffect } from 'react';
import Card from './Card';
function MovieContainer() {
    const movies = useSelector((store) => store.movie.movies);
    const isLoading = useSelector((store) => store.movie.isLoading);
    const isFinished = useSelector((store) => store.movie.isFinished);
    const page = useSelector((store) => store.movie.page);
    const search = useSelector((store) => store.movie.search);
    const dispatch = useDispatch();
    const handleScroll = function () {
        const isNearBottom = Math.abs((window.innerHeight + window.scrollY) - document.documentElement.scrollHeight) < 100;
        if (isNearBottom && !isLoading && !isFinished) {
            dispatch(setLoading())
            fetchData(page, search).then((response) => {
                dispatch(addMoreMovie({
                    movies: response
                }));
            });
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, true);
        return () => window.removeEventListener('scroll', handleScroll, true);
    }, [page, isLoading, isFinished]);

    return (

        <>
            <div className="row mt-4">
                {movies.map((movie, idx) => (
                    <Card key={movie._id} props={movie} />
                ))}
            </div>
            {
                isLoading ?
                    <h1 className='text-white text-center'>Loading</h1> :
                <></>
            }
        </>
    )
}

export default MovieContainer