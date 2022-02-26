import { useReducer } from "react";
import {
    UPDATE_PRODUCTS,
    ADD_TO_CART,
    REMOVE_FROM_CART,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    CLEAR_CART,
} from "./actions";

export const reducer = (state, action) => {
    console.log(state)
    switch (action.type) {
        case UPDATE_PRODUCTS:
            return {
                ...state,
                product: [...action.product],
            };

        case ADD_TO_CART:
            console.log(state);
            return {
                ...state,
                cart: [...state.cart, action.product],
            };

        case REMOVE_FROM_CART:
            let newState = state.cart.filter(product => {
                return product._id !== action._id;
            });

            return {
                ...state,
                cartOpen: newState.length > 0,
                cart: newState
            };

        case CLEAR_CART:
            return {
                ...state,
                cartOpen: false,
                cart: []
            };

        case UPDATE_CATEGORIES:
            return {
                ...state,
                categories: [...action.categories],
            };

        case UPDATE_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.currentCategory
            }

        default:
            return state;
    }
};

export function useProductReducer(initialState) {
    return useReducer(reducer, initialState)
}