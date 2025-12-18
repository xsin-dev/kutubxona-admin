import { create } from "zustand";
import { persist } from "zustand/middleware";

const authStore = create(
  persist(
    (set) => ({
      user: null,
      access: null,
      isAuth: false,

      login: (user, access) =>
        set({
          user,
          access,
          isAuth: true,
        }),

      logout: () =>
        set({
          user: null,
          access: null,
          isAuth: false,
        }),

      // Like books
      likedBooks: {},
      toggleLiked: (book) =>
        set((state) => ({
          likedBooks: {
            ...state.likedBooks,
            [book.id]: !state.likedBooks[book.id],
          },
        })),

      // Like library
      likedLibrary: {},
      toggleLikedLibrary: (library) =>
        set((state) => ({
          likedLibrary: {
            ...state.likedLibrary,
            [library.id]: !state.likedLibrary[library.id],
          },
        })),

      // ALL BOOKS
      // allBooks: {},
      // setAllBooks: () =>
      //   set((state) => ({
      //     allBooks: {
      //       ...state.allBooks,
      //     },
      //   })),
    }),
    {
      name: "auth-store",
    }
  )
);

export default authStore;
