///getallusers => [{user1},{user2}]
///function(id)=>user.id

function getAllUsers() {
  try {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((users) =>  {users});
        
  } catch (error) {
    console.log(`the error is${error}`);
  }
}
console.log(getAllUsers());
