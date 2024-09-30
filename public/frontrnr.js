document.getElementById('loginClick').addEventListener('click',async ()=>{
    try {
        const uname = document.getElementById('user').value
        const password = document.getElementById('password').value
        if(!uname || !password || password.length <= 8)
        {
            throw new Error("Uname or password is absent")
        }
        const details = {
            user : uname,
            password: password
        }
        let request = new XMLHttpRequest()
        request.open('POST','/api/login',true)
        request.setRequestHeader("Content-Type","application/json")
        request.send(JSON.stringify(details))
    } catch (error) {
        console.log(error)
    }
})