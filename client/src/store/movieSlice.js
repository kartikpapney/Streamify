import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movie",
    initialState: {
        tags: [],
        movies: [],
        page: 1,
        isLoading: false,
        isFinished: false,
        search: null,
        tag: null,
    },
    reducers: {
        addMoreMovie: (state, action) => {
            return {...state, isFinished: action.payload?.movies?.length === 0, isLoading: false, movies: [...state.movies, ...action.payload.movies], page: state.page+1}
        },
        addSearch: (state, action) => {
            return {...state, isFinished: action.payload?.movies?.length === 0, isLoading: false, movies: [...action.payload.movies], page: state.page+1}
        },
        setLoading: (state, action) => {
            return {...state, isLoading: action.payload}
        },
        setSearch: (state, action) => {
            return {...state, search: action.payload, page: 1, movies: []}
        },
        setTag: (state, action) => {
            return {...state, tag: action.payload, page: 1, movies: []}
        },
        addTags: (state, action) => {
            return {...state, tags: [...action.payload.tags]}
        }
    }
})

export const {addMoreMovie, addSearch, setLoading, setSearch, addTags, setTag} = movieSlice.actions
export default movieSlice.reducer;