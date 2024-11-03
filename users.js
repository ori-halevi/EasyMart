///getallusers => [{user1},{user2}]
///function(id)=>user.id
const users = []

function getallusers() {   
    try {
        fetch("http://localhost:5000/users")
        .then(res=>res.json())
        .then(users=>console.log(users))
    } catch (error) {
        console.log(`the error is${error}`)  
    }
        
    
}   
getallusers() 