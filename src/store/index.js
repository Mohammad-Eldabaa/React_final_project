import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getUsers } from '../api/fetchApi';
// import { refreshTokeAPI } from '../api/fetchApi';
// import { isTokenExpire } from '../api';

const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      refreshToken: null,
      currentUser: {},
      currentPage: 'home',
      loading: false,
      setTokens: tokens =>
        set(state => ({
          ...state,
          ...tokens,
        })),
      clear: () => set({ token: null, refreshToken: null }),
      MoveTo: page => set({ currentPage: page }),
      getCurrentUser: async email => {
        await getUsers()
          .then(res => {
            const users = res.data || [];
            const user = users.find(item => item.email === email);
            set({ currentUser: user || {} });
            console.log(user || {});
          })
          .catch(e => {
            console.log(e);
          });
      },
    }),
    {
      name: 'auth-store',
    }
  )
);

export default useAuthStore;
