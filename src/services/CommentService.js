const URL = "http://catstagram.lofty.codes";

export async function getAllComments() {

    const response = await fetch(URL + '/api/comments');
    return await response.json();
}