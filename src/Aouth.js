
const supabaseUrl = "https://gvahwgwyyzjpretlwpmz.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2YWh3Z3d5eXpqcHJldGx3cG16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4NTM2NzgsImV4cCI6MjA4NzQyOTY3OH0.nG1lR-WxaRfFDvWyU8lp5PY9XC0Dp9-Yjk_kihLjdqU";

const { createClient } = supabase;
const supabaseClient = createClient(supabaseUrl, supabaseKey);

let isLogin = true;

function toggleForm() {
  isLogin = !isLogin;

  document.getElementById("name").style.display = isLogin ? "none" : "block";
  document.getElementById("form-title").innerText = isLogin ? "Login" : "Create Account";
  document.getElementById("toggle-text").innerHTML = isLogin 
    ? `Don't have account? <span onclick="toggleForm()">Create Account</span>`
    : `Already have account? <span onclick="toggleForm()">Login</span>`;
}

async function handleAuth() {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const name = document.getElementById("name").value;
  const message = document.getElementById("message");

  if (isLogin) {
    // LOGIN
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      message.innerText = error.message;
    } else {
      message.innerText = "Login Successful ✅";
    }

  } else {
    // SIGNUP
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password
    });

    if (error) {
      message.innerText = error.message;
      return;
    }

    // Save extra data in profiles table
    const user = data.user;

    const { error: profileError } = await supabaseClient
      .from("profiles")
      .insert([
        {
          id: user.id,
          name: name,
          email: email
        }
      ]);

    if (profileError) {
      message.innerText = profileError.message;
    } else {
      message.innerText = "Account Created Successfully ✅";
    }
  }
}
self.addEventListener("fetch", event => {
  if (event.request.url.includes("supabase.co")) return;
});






