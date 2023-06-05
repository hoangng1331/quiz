import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { persist, createJSONStorage } from "zustand/middleware";
import { message } from "antd";
import axios from "axios";
import { API_URL } from "../constants/URLS";

export const useAuth = create(
  devtools(
    persist(
      (set, get) => ({
        auth: null,
        login: ({ email, password }) => {
          console.log(email);
          axios
            .post(API_URL + "/auth/login-jwt", {
              email,
              password,
            })
            .then((response) => {
              return set({ auth: response.data }, false, {
                type: "auth/login-success",
              });
            })
            .catch((err) => {
              message.error("Incorrect email or password!");
              return set({ auth: null }, false, { type: "auth/login-error" });
            });
        },
        logout: () => {
          return set({ auth: null }, false, { type: "auth/logout-success" });
        },
      }),
      {
        name: "quiz-storage", // unique name
        storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      }
    )
  )
);
