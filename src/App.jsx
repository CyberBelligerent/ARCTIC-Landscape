import { useAuth } from './AuthProvider.jsx'

function App() {
  const { onLogin } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    onLogin(username, password);
  };

  return (
    <>
      <h1>ARCTIC Login</h1>
      <div className="card">
        <form onSubmit={handleLogin}>
          <label htmlFor="username"><b>Username</b></label>
	        <input placeholder="Enter Username" type="text" id="username" required />
	        <label htmlFor="password"><b>Password</b></label>
	        <input type="password" placeholder="Enter Password" id="password" required />
	        <button type="submit">Login</button>
	      </form>
      </div>
    </>
  )
}

export default App
