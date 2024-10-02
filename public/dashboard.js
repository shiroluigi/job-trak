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
            //TEMPORARY CHANGE
            console.log("Done", x.response , JSON.parse(x.response).msg.name)
            document.getElementById('greet').textContent = JSON.parse(x.response).msg.name
        }
    }
}

document.getElementById('logout').addEventListener('click',()=>{
    //Clear all cookie from stackOverflow https://stackoverflow.com/questions/179355/clearing-all-cookies-with-javascript
    document.cookie.split(';').forEach(cookie => {
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
    document.location.href = '/'
})

for(let i =0 ;i < document.getElementsByClassName('job-list').length ; i++)
{
    document.getElementsByClassName('job-list')[i].addEventListener('wheel',(e) => 
            {
                e.preventDefault();
                // console.log('scroll')
                // console.log()
                document.getElementsByClassName('job-list')[i].scrollLeft += e.deltaY;
            })   
}

getInfoFromApi()