const URL = "http://catstagram.lofty.codes";

export async function getAllPosts() {
  const response = await fetch(URL + "/api/posts/");
  return await response.json();
}

export async function createPost(post) {
  const response = await fetch(URL + `/api/posts/`, {
    method: "POST",
    body: post,
  });
  return await response.json();
}
