import { supabase } from './supabaseClient'
import './style.css'

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Saha Classifieds</h1>
    <div class="card">
      <button id="sign-in" type="button">Sign In</button>
      <button id="sign-out" type="button">Sign Out</button>
      <p id="user-status"></p>
    </div>
    <p class="read-the-docs">
      Supabase Integration Demo
    </p>
  </div>
`

const signInButton = document.getElementById('sign-in');
const signOutButton = document.getElementById('sign-out');
const userStatusParagraph = document.getElementById('user-status');

const updateAuthUI = (user) => {
  if (user) {
    userStatusParagraph.textContent = `Logged in as: ${user.email}`;
    signInButton.style.display = 'none';
    signOutButton.style.display = 'block';
  } else {
    userStatusParagraph.textContent = 'Logged out';
    signInButton.style.display = 'block';
    signOutButton.style.display = 'none';
  }
};

// Initial check
supabase.auth.getSession().then(({ data: { session } }) => {
  updateAuthUI(session?.user);
});

// Listen for auth changes
supabase.auth.onAuthStateChange((_event, session) => {
  updateAuthUI(session?.user);
});

signInButton.addEventListener('click', async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
  if (error) console.error('Error signing in:', error.message);
});

signOutButton.addEventListener('click', async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.error('Error signing out:', error.message);
});
