 
      import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

      const supabaseUrl = "https://gvahwgwyyzjpretlwpmz.supabase.co";
      const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2YWh3Z3d5eXpqcHJldGx3cG16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4NTM2NzgsImV4cCI6MjA4NzQyOTY3OH0.nG1lR-WxaRfFDvWyU8lp5PY9XC0Dp9-Yjk_kihLjdqU";

      const supabase = createClient(supabaseUrl, supabaseKey);

      window.supabase = supabase;
      console.log("Supabase client initialized:");

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
  