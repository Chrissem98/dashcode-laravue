import { defineStore } from "pinia";
import authService from "@/services/authService";
import { apiClient } from "../services/apiService";
import router from '@/router'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authUser: null,
    errors: null,
  }),

  getters: {
    loggedIn: state => !!state.authUser,
    user: state => state.authUser,
  },

  actions: {

    async getAuthUser() {
      try {
        const response = await authService.getAuthUser()

        this.authUser = response.data

        return response
      } catch (error) {
        console.warn({ error })

        return error
      }
    },
    
    async login(payload) {
      try {
        await authService.login(payload)

        return await this.getAuthUser()
      } catch (error) {
        console.warn({ error })

        return error
      }
    },

    async logout() {
      try {
        await authService.logout()

        this.authUser = null

        router.push({ name: "login" })
      } catch (error) {
        console.warn({ error })

        this.authUser = null

        return error
      }
    },

  }
})
