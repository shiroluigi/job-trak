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
function submitData() {
    const packed_data = {
        position: document.getElementById('create_job_position').value,
        status: document.getElementById('create_job_status').value,
        company: document.getElementById('create_job_company').value,
        date: document.getElementById('create_job_date').value,
    }
    console.log(packed_data)
}
authenticate()