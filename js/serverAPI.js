const BASE_URL = 'http://localhost:8000/api/';

let token = window.localStorage.getItem('Token');

async function loadData(path) {
  try {
    let response = await fetch(BASE_URL + path, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Fehler beim Laden: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function postSignup(path, data = {}) {
  try {
    let response = await fetch(BASE_URL + path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Fehler beim Speichern: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

async function postData(path, data = {}) {
  try {
    let response = await fetch(BASE_URL + path, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status === 403) {
      alert("Du bist nicht berechtigt um Änderungen vorzunehmen");
      return "";
    }
    else if (response.status === 401) {
      alert("Du bist nicht angemeldet");
      return "";
    }

    else if (!response.ok) {
      throw new Error(`Fehler beim Speichern: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }

}


async function deleteData(path) {
  try {
    let response = await fetch(BASE_URL + path, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 403) {
      alert("Du bist nicht berechtigt um Änderungen vorzunehmen");
      return "";
    }
    else if (response.status === 401) {
      alert("Du bist nicht angemeldet");
      return "";
    }
    else if (!response.ok) {
      throw new Error(`Fehler beim Löschen: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}


async function putData(path, data = {}) {

  try {
    let response = await fetch(BASE_URL + path, {
      method: 'PUT',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status === 403) {
      alert("Du bist nicht berechtigt um Änderungen vorzunehmen");
      return "";
    }
    else if (response.status === 401) {
      alert("Du bist nicht angemeldet");
      return "";
    }
    else if (!response.ok) {
      throw new Error(`Fehler beim Aktualisieren: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}



async function patchData(path, data = {}) {
  try {
    let response = await fetch(BASE_URL + path, {
      method: 'PATCH',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.status === 403) {
      alert("Du bist nicht berechtigt um Änderungen vorzunehmen");
      return "";
    }
    else if (response.status === 401) {
      alert("Du bist nicht angemeldet");
      return "";
    }
    else if (!response.ok) {
      throw new Error(`Fehler beim Aktualisieren: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
