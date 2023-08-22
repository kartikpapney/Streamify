import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name: "movie",
    initialState: {
        movies: [],
        page: 1,
        isLoading: false,
        isFinished: false,
        search: ""
    },
    reducers: {
        addMoreMovie: (state, action) => {
            return {...state, isFinished: action.payload?.movies?.length === 0, isLoading: false, movies: [...state.movies, ...action.payload.movies], page: state.page+1}
        },
        addSearch: (state, action) => {
            return {...state, isFinished: action.payload?.movies?.length === 0, isLoading: false, movies: [...action.payload.movies], page: state.page+1}
        },
        setLoading: (state, action) => {
            return {...state, isLoading: true}
        },
        setSearch: (state, action) => {
            return {...state, search: action.payload, page: 1}
        }
    }
})

export const {addMoreMovie, addSearch, setLoading, setSearch} = movieSlice.actions
export default movieSlice.reducer;