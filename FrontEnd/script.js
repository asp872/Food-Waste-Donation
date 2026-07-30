async function uploadFood(){

const hotel=document.getElementById("hotel").value;
const food=document.getElementById("food").value;
const qty=document.getElementById("qty").value;
const location=document.getElementById("location").value;

const data={
hotel,
food,
quantity:qty,
location,
status:"Available"
};

await fetch("http://localhost:5000/donate",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(data)

});

alert("Food Uploaded Successfully");

}