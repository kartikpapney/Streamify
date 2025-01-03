import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addSearch, setLoading, setSearch, addTags, setTag } from '../store/movieSlice';
import { useEffect } from 'react';
import { fetchData, fetchTags } from '../utils';
function Search() {
    const search = useSelector((store) => store.movie.search);
    const page = useSelector((store) => store.movie.page);
    const tags = useSelector((store) => store.movie.tags);
    const tag = useSelector((store) => store.movie.tag);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchTags().then((response) => {
            dispatch(addTags({
                tags: response.data,
            }));
        })
    }, [])

    useEffect(() => {
        const interval = setTimeout(async () => {
            dispatch(setLoading(true))
            const response = await fetchData(page, search, tag)
            dispatch(addSearch({
                movies: response.data,
            }));
        }, 1000)
        
        return () => {
            clearInterval(interval)
        }
    }, [search, tag])

    return (
        <div className="flex flex-col justify-center">
            <div>
                <input className="bg-[#242323] text-white border-transparent shadow-xl flex w-full p-2 focus:outline-none rounded-lg items-center"
                    placeholder="What u need today?"
                    onChange={(e) => {
                        dispatch(setSearch(e.target.value));
                    }}
                    value={search} />
            </div>
            {
                <div>
                    {
                        tags.map((currentTag) => {
                            
                            if(tag && tag !== currentTag._id) {
                                return <button
                                    rel="noreferrer"
                                    key={currentTag?._id}
                                    className="btn btn-sm text-red-600 mt-2 bg-white mr-2 line-through"
                                    onClick={() => {
                                        dispatch(setTag(currentTag?._id))
                                    }}>{currentTag.tag}
                                </button>
                            } else {
                                return <button
                                    rel="noreferrer"
                                    key={currentTag?._id}
                                    className="btn btn-sm text-red-600 mt-2 bg-white mr-2"
                                    onClick={() => {
                                        dispatch(setTag(currentTag?._id === tag ? null : currentTag?._id))
                                    }}>{currentTag.tag}
                                </button>
                            }
                            
                        })
                    }
                </div>
            }
        </div>
    )
}

export default Search