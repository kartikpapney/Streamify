export const fetchData = async function (cpage, search, tag) {
    try {
        let url = `${process.env.REACT_APP_BE_HOST}/api/movies?page=${cpage}`;
        if(search) url+=`&title=${search}`
        if(tag) url+=`&tag=${tag}`
        const response = await fetch(url);
        const moviesResponse = await response.json();
        return moviesResponse;
    } catch (error) {
        return {
            data: []
        }
    }
}
export const fetchTags = async function() {
    try {
        const response = await fetch(`${process.env.REACT_APP_BE_HOST}/api/movies/tags`);
        const tagResponse = await response.json();
        return tagResponse;
    } catch (error) {
        return {
            data: []
        }
    }
}