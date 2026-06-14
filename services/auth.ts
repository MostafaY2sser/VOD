import { api } from "@/lib/___api";

type RegisterData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

type LoginData = {
  email: string;
  password: string;
};

export const authApi = {
  register: async (data: RegisterData) => {
    const response = await api.post("/register", data);

    return response.data;
  },

  login: async (data: LoginData) => {
    const response = await api.post("/login", data);

    return response.data;
  },

};

