export const fetchData = async function (cpage, search, tag) {
    try {
        let url = `${process.env.REACT_APP_BE_HOST}/api/v1?page=${cpage}`;
        if(search) url+=`&title=${search}`
        if(tag) url+=`&tag=${tag}`
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        return {
            data: []
        }
    }
}
export const fetchTags = async function() {
    try {
        const response = await fetch(`${process.env.REACT_APP_BE_HOST}/api/v1/tags`);
        const tagResponse = await response.json();
        return tagResponse;
    } catch (error) {
        return {
            data: []
        }
    }
}