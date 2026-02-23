document.querySelector(".login-btn").addEventListener("click", function(e){
  e.preventDefault();
  document.getElementById("authModal").style.display="flex";
}); 

 
let isLogin = true;

function toggleAuth(){
  isLogin = !isLogin;

  document.getElementById("authTitle").innerText = isLogin ? "Login" : "Sign Up";
  document.querySelector("#authModal button").innerText = isLogin ? "Login" : "Sign Up";
  document.getElementById("toggleText").innerText =
    isLogin ? "Don't have account?" : "Already have account?";
}

async function login(){
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if(isLogin){
    const { data, error } = await window.supabase.auth.signInWithPassword({
      email, password
    });

    if(error){
      alert(error.message);
    }else{
      alert("Login Successful!");
      closeAuth();
      updateUI();
    }

  }else{
    const { data, error } = await window.supabase.auth.signUp({
      email, password
    });

    if(error){
      alert(error.message);
    }else{
      alert("Signup Successful! Please verify email.");
      toggleAuth();
    }
  }
}

async function logout(){
  await window.supabase.auth.signOut();
  alert("Logged Out");
  updateUI();
}

function closeAuth(){
  document.getElementById("authModal").style.display="none";
}

async function updateUI(){
  const { data } = await window.supabase.auth.getUser();

  const loginBtn = document.querySelector(".login-btn");

  if(data.user){
    loginBtn.innerText = "Logout";
    loginBtn.onclick = function(e){
      e.preventDefault();
      logout();
    }
  }else{
    loginBtn.innerText = "Login";
    loginBtn.onclick = function(e){
      e.preventDefault();
      document.getElementById("authModal").style.display="flex";
    }
  }
}

updateUI();
 