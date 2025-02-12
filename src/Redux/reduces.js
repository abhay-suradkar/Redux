import { ADD_TO_CART, REMOVE_FROM_CART } from "./ActionType";

const reducer = (state = [], action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return [...state, action.payload];

        case REMOVE_FROM_CART:
            return state.filter((_, index) => index !== action.payload);

        default:
            return state;
    }
};

export default reducer;
