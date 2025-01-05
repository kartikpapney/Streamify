import { createSlice } from "@reduxjs/toolkit";

const resourceSlice = createSlice({
    name: "resource",
    initialState: {
        tags: [],
        resources: [],
        page: 1,
        isLoading: true,
        isFinished: false,
        search: null,
        tag: null,
    },
    reducers: {
        addMoreResource: (state, action) => {
            return {...state, isFinished: action.payload?.resources?.length === 0, isLoading: false, resources: [...state.resources, ...action.payload.resources], page: state.page+1}
        },
        addSearch: (state, action) => {
            return {...state, isFinished: action.payload?.resources?.length === 0, isLoading: false, resources: [...action.payload.resources], page: state.page+1}
        },
        setLoading: (state, action) => {
            return {...state, isLoading: action.payload}
        },
        setSearch: (state, action) => {
            return {...state, search: action.payload, page: 1, resources: []}
        },
        setTag: (state, action) => {
            return {...state, tag: action.payload, page: 1, resources: []}
        },
        addTags: (state, action) => {
            return {...state, tags: [...action.payload.tags]}
        }
    }
})

export const {addMoreResource, addSearch, setLoading, setSearch, addTags, setTag} = resourceSlice.actions
export default resourceSlice.reducer;