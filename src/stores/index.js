import { createStore } from "vuex";
import action from "./action/action";

const stores = createStore({
    modules: {
        action,
    },
});

export default stores;