import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addSearch, setLoading, setSearch, addTags, setTag } from '../store/resourceSlice';
import { useEffect } from 'react';
import { fetchData, fetchTags } from '../utils';

function Search() {
    const search = useSelector((store) => store.resource.search);
    const page = useSelector((store) => store.resource.page);
    const tags = useSelector((store) => store.resource.tags);
    const tag = useSelector((store) => store.resource.tag);
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
                resources: response.data,
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
                <div className='flex w-full overflow-x-auto no-scrollbar'>
                    <div className='flex flex-grow justify-center items-center space-x-2'>
                    {
                        tags.map((currentTag) => {
                            
                            if(tag && tag !== currentTag._id) {
                                return <button
                                    rel="noreferrer"
                                    key={currentTag?._id}
                                    className="btn btn-sm text-red-600 mt-2 bg-white mr-2 line-through min-w-[80px]"
                                    onClick={() => {
                                        dispatch(setTag(currentTag?._id))
                                    }}>{currentTag.tag}
                                </button>
                            } else {
                                return <button
                                    rel="noreferrer"
                                    key={currentTag?._id}
                                    className="btn btn-sm text-red-600 mt-2 bg-white mr-2 min-w-[80px]"
                                    onClick={() => {
                                        dispatch(setTag(currentTag?._id === tag ? null : currentTag?._id))
                                    }}>{currentTag.tag}
                                </button>
                            }
                            
                        })
                    }
                    </div>
                </div>
            }
        </div>
    )
}

export default Search