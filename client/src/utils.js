export default async function (cpage, search) {
    try {
        const response = await fetch(`${process.env.REACT_APP_BE_HOST}/api/movies?page=${cpage}&title=${search}`);
        const moviesResponse = await response.json();
        return moviesResponse;
    } catch (error) {
        return []
    }
}