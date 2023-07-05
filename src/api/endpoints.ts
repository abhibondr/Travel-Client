export default {
  serverBaseURL: "http://localhost:9999",
  api: {
    users: {
      create: "/users",
      update: "/users/",
      delete: "/users/",
      getOne: "/users/",
      getAll: "/users",
    },
    destinations: {
      create: "/destinations",
      update: "/destinations/",
      delete: "/destinations/",
      getOne: "/destinations/",
      getAll: "/destinations",
    },
    auth: {
      userLogin: "/auth/login",
      validateToken: "/auth/validate-token",
      resetPassword: "/auth/reset-password",
      refreshToken: "/auth/refresh-token",
    },
  },
};
