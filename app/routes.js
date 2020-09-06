import Home from "./pages/Home";
import Login from "./pages/Login";
import UploadImage from "./pages/UploadImage";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import Voters from "./pages/Voters";
import Voter from "./pages/Voter";
import AddVoter from "./pages/AddVoter";
import Visits from "./pages/Visits";
import Visit from "./pages/Visit";
import AddVisit from "./pages/AddVisit";
import UserUpdate from "./pages/UserUpdate.vue"

export const routes = {
  "/home": {
    component: Home,
    meta: { needsAuth: true }
  },
  "/login": {
    component: Login,
    meta: { needsAuth: false }
  },
  "/user-update": {
    component: UserUpdate,
    meta: { needsAuth: true }
  },
   "/upload-image": {
     component: UploadImage,
     meta: { needsAuth: false }
   },
  "/notifications": {
    component: Notifications,
    meta: { needsAuth: true }
  },
  "/voters": {
    component: Voters,
    meta: { needsAuth: true }
  },
  "/voter": {
    component: Voter,
    meta: { needsAuth: true }
  },
  "/addvoter": {
    component: AddVoter,
    meta: { needsAuth: true }
  },
  "/visits": {
    component: Visits,
    meta: { needsAuth: true }
  },
  "/visit": {
    component: Visit,
    meta: { needsAuth: true }
  },
  "/addvisit": {
    component: AddVisit,
    meta: { needsAuth: true }
  },
  "/settings": {
    component: Settings,
    meta: { needsAuth: true }
  }
};
