import { api } from "./api";

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export interface User {
  id: number;
  full_name: string;
  email: string;
}

export const AuthAPI = {
  async login(email: string, password: string) {
    const body = new URLSearchParams();

    body.append("username", email);
    body.append("password", password);

    const response = await fetch(
      "http://localhost:8000/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
        body,
      }
    );

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return (await response.json()) as LoginResponse;
  },

  register(data: {
    full_name: string;
    email: string;
    password: string;
  }) {
    return api<User>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  me() {
    return api<User>("/auth/me");
  },
};