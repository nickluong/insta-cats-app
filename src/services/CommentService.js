const URL = "http://catstagram.lofty.codes";

export async function getAllComments() {

    const response = await fetch(URL + '/api/comments');
    return await response.json();
}

export async function createComment(id, comment) {
    const response = await fetch(URL + `/api/comments/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entry: id, text: comment }),
    });
    return await response.json();
  }
