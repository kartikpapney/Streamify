import React from 'react'
import fetchData from '../utils'
import { useDispatch, useSelector } from 'react-redux';
import { addSearch, setLoading, setSearch } from '../store/movieSlice';
import { useEffect } from 'react';
function Search() {
    const search = useSelector((store) => store.movie.search);
    const page = useSelector((store) => store.movie.page);
    const dispatch = useDispatch();

    useEffect(() => {
        const interval = setTimeout(async () => {
            dispatch(setLoading())
            const response = await fetchData(page, search)
            dispatch(addSearch({
                movies: response,
            }));
        }, 1000)
        
        return () => {
            clearInterval(interval)
        }
    }, [search])
    return (
        <div className="flex justify-center">
            <input className="bg-[#242323] text-white border-transparent shadow-xl flex w-full p-2 focus:outline-none rounded-lg items-center"
                placeholder="What u need today?"
                onChange={(e) => {
                    dispatch(setSearch(e.target.value));
                }}
                value={search} />
        </div>
    )
}

export default Search