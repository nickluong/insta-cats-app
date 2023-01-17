const URL = "http://catstagram.lofty.codes";

export async function getAllPosts() {

    const response = await fetch(URL + '/api/posts');
    return await response.json();
}