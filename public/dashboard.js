const getInfoFromApi = () => {
    let authString = ''
    if (!document.cookie) {
        window.location.href = '/'
        return
    }
    const cookies = document.cookie.split(';')
    cookies.forEach(cookie => {
        const [a, b] = cookie.split('=');
        if (a.trim() === 'token') {
            authString = 'Bearer ' + b.trim();
            // console.log(authString)
        }
    })
    if(!authString)
    {
        window.location.href = '/'
    }
    // console.log(authString)
    const x = new XMLHttpRequest();
    x.open('GET', 'http://localhost:4000/api/dashboard');
    x.setRequestHeader('authentication', authString)
    x.send()
    x.onreadystatechange = () => {
        if (x.readyState == XMLHttpRequest.DONE) {
            console.log("Done", x.response)
        }
    }
}


getInfoFromApi()