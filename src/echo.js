// src/echo.js
import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: "pusher",
  key: "99ae63cd67bcf9655e76",
  cluster: "eu",
  encrypted: true,
});

export default echo;
// PUSHER_APP_ID=1822471
// PUSHER_APP_KEY=99ae63cd67bcf9655e76
// PUSHER_APP_SECRET=214cc2c39b65c33e3610
// PUSHER_APP_CLUSTER=eu
