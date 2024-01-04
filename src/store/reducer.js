import * as actionsName from './action';
const initlaseState = {
    resipes: [],
    user: {},
    categories: [],
    shoppingList: []
}


const Reducer = (state = initlaseState, action) => {
    switch (action.type) {
        case actionsName.GET_RECIPES:
            {
                const recipes = action.data;
                state.resipes = recipes;
                return {
                    ...state, recipes
                }
            }
        case actionsName.GET_USER: {
            const user = action.data;
            state.user = user;
            return {
                ...state,
                user
            };
        }
        case actionsName.GET_CATEGORY:
            {
                const category = action.data;
                state.categories = category;
                return {
                    ...state, category
                }
            }

        case actionsName.DELETE_RECIPE:
            {
                const id = action.data;
                const filtered = state.resipes.filter(recipe => recipe.Id != id);
                state.resipes = filtered;
                return {
                    ...state,
                    filtered
                }

            }
        case actionsName.GET_SHOPPINGLIST:
            {
                const shopping = action.data;
                state.shoppingList = shopping;
                return {
                    ...state, shopping
                }
            }
        case actionsName.ADD_CATEGORY: {
            const category = action.data
            state.categories.push(action.data)
            return { ...state, category }
        }
        case actionsName.ADD_RECIPE: {
            const rec = action.data
            state.resipes.push(action.data)
            return {
                ...state,
                rec
            }
        }
        case actionsName.ADD_PRODUCT: {
            const product = action.data;
            state.shoppingList.push(product);
            return {
                ...state, product
            }
        }

        case actionsName.EDIT_RECIPE: {
            const res = state.resipes.forEach(element => {
                if (element.Id == action.data.Id) {
                    element.CategoryId = action.data.CategoryId;
                }
            });
            return {
                ...state,
                res

            }
        }

        case actionsName.DELETE_PRODUCT:
            {
                const id = action.data;
                const filtered = state.shoppingList.filter(product => product.Id != id);
                state.shoppingList = filtered;
                return {
                    ...state,
                    filtered
                }
            }

        case actionsName.EDIT_COUNT: {
            const edit_count = action.data;
            const index = state.shoppingList.findIndex((s) => s.Id === edit_count.Id)
            state.shoppingList[index] = edit_count;
            return { ...state, edit_count }
        }

        default:
            return { ...state }
    }
}
export default Reducer;

