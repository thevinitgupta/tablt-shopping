let userId = "";
const userName = document.querySelector(".profile-name");
const profileData = document.querySelector(".profile-data");

async function getProfileData(email){
    const userBlob = await fetch(`http://localhost:3000/user/${email}`);
    const userData = await userBlob.json();
    console.log(userData);
    userId = userData._id;
    setUserData(userData.user); 
}

function setUserData(user){
    userName.innerText = user.name;
    profileData.innerHTML = `Email : ${user.email}</br>Phone : ${user.phone}`;
}



window.addEventListener("load",getProfileData("thevinitgupta@gmail.com"));