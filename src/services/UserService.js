const URL = "http://catstagram.lofty.codes";

export async function getAllUsers() {

    const response = await fetch(URL + '/api/users');
    return await response.json();
}

export async function createUser(email, password, first_name, last_name) {
    const response = await fetch(URL + `/api/users/register/`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: email, password: password, first_name: first_name, last_name: last_name})
      })
    return await response.json();
}