export const login = async (email: string, password: string) => {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Login failed");

  const data = await res.json();
  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("token", data.token); // optional
};

export const signup = async (name: string, email: string, password: string) => {
  const res = await fetch("/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!res.ok) throw new Error("Signup failed");

  const data = await res.json();
  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("token", data.token);
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};
