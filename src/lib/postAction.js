export default async function fetcGethPost(pageNumber, pageSize, sort) {
    let sortForApi ='';
    if(sort === 'newest'){
        sortForApi = '-'
    }

    try {

        const response = await fetch(
            `https://suitmedia-backend.suitdev.com/api/ideas?page[number]=${pageNumber}&page[size]=${pageSize}&append[]=small_image&append[]=medium_image&sort=${sortForApi}published_at`, 
            {
                method : 'GET',
                headers : {
                    'Content-Type': 'application/json',
                    'Accept' : 'application/json'
                }
            }
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const post = await response.json();
        return post;
    } catch (error) {
        console.error('Failed to fetch posts:', error.message);
        throw error;
    }
}