import { createRouter, createWebHistory } from "vue-router";
import routes from '~pages'
import { useAuthStore } from "@/store/auth";

const router = createRouter({
  history: createWebHistory(import.meta.BASE_URL),
  base: import.meta.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});
router.beforeEach(async (to, from) => {
  const titleText = to.name;
  const words = titleText.split(" ");
  const wordslength = words.length;
  for (let i = 0; i < wordslength; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  document.title = "Dashcode  - " + words;

  const auth = useAuthStore()

  if(!auth.loggedIn){
    await auth.getAuthUser()
  }

  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)
  if (!to.meta.requiresGuest && !auth.loggedIn) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    return {
      name: "login",

      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    }
  }
  if (auth.loggedIn && to.meta.requiresGuest) {
    return {
      name: "index",
    }
  }
});

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});

export default router;
