// console.log("working")
// async function somefunc() {
//     const req = new XMLHttpRequest();
//     try {
//         req.open('GET','/api/users',true)
//         req.onload = ()=>{
//             var res = JSON.parse(req.responseText)
//             console.log(res)
//             // document.getElementById('renderhere').textContent = res['msg']
//             res['msg'].forEach((item) => {
//                 let tc = document.getElementById('renderhere')
//                 let nn = tc.cloneNode(true)
//                 nn.textContent = item
//                 nn.removeAttribute('id')
//                 nn.classList.add('userPlaceHolder')
//                 tc.appendChild(nn)
//             });
//         }
//         req.send()
//     } catch (error) {
//         console.log(error)
//     }
// }

// somefunc()