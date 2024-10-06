const clearCookies = () => {
    document.cookie.split(';').forEach(cookie => {
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
}

const authenticate = () => {
    let authString = ''
    if (!document.cookie) {
        //remove cookies too for easier relogin
        clearCookies()
        window.location.href = '/'
        return
    }
    const cookies = document.cookie.split(';')
    cookies.forEach(cookie => {
        const [a, b] = cookie.split('=');
        if (a.trim() === 'token') {
            authString = 'Bearer ' + b.trim();
        }
    })
    if (!authString) {
        window.location.href = '/'
    }
    const x = new XMLHttpRequest()
    x.open('GET', "/api/create")
    x.setRequestHeader('authentication', authString)
    x.send()
    x.onreadystatechange = () => {
        if (x.readyState == XMLHttpRequest.DONE) {
            if (x.response.status == 401) {
                clearCookies()
                window.location.href = "/"
            }
        }
    }
}
async function submitData() {
    const packed_data = {
        "position": document.getElementById('create_job_position').value,
        "status": document.getElementById('create_job_status').value,
        "company": document.getElementById('create_job_company').value,
        "date": document.getElementById('create_job_date').value,
    }
    let authString = ''
    if (!document.cookie) {
        //remove cookies too for easier relogin
        clearCookies()
        window.location.href = '/'
        return
    }
    const cookies = document.cookie.split(';')
    cookies.forEach(cookie => {
        const [a, b] = cookie.split('=');
        if (a.trim() === 'token') {
            authString = 'Bearer ' + b.trim();
        }
    })
    if (!authString) {
        window.location.href = '/'
    }
    const y = new XMLHttpRequest()
    y.open("POST", "http://localhost:4000/api/create")
    y.withCredentials = true
    y.setRequestHeader('authentication', authString)
    y.setRequestHeader("Content-Type", "application/json");
    y.send(JSON.stringify(packed_data))
    y.onreadystatechange = () => {
        if (y.readyState == XMLHttpRequest.DONE) {
            if (y.response.status == 200) {
                console.log("okayyy")
            }
        }
    }
}
authenticate()