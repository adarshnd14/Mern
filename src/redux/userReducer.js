import { configureStore, createSlice } from "@reduxjs/toolkit"

//declaring initial states
const initialState = {
    navState: '',
    navRole: 'user',
    isToken: null,
    product: null,
    modal: false,
    toggle: false,
    _id: 0,
    editModal: false,
    editProduct: {
        pName: '',
        pPrice: '',
        pBrand: '',
        pDesc: '',
        pImg:''
    }
}

const userSlice = createSlice({
    name: 'userReducer',
    initialState,
    reducers: {
        navRoute(state, action) {
            state.navState = action.payload
        },
        roleRoute(state, action) {
            state.navRole = action.payload
        },
        tokenRoute(state, action) {
            state.isToken = action.payload
        },
        fetchProduct(state, action) {
            state.product = action.payload
        },
        modalOpen(state, action) {
            state.modal = action.payload
        },
        tableToggle(state, action) {
            state.toggle = action.payload
        },
        editId(state, action) {
            state._id = action.payload
        },
        editModal(state, action) {
            state.editModal = action.payload
        },
        editProduct(state, action) {
            state.editProduct = action.payload
        }
    }
})

const store = configureStore({
    reducer: userSlice.reducer
})

export const userAction = userSlice.actions
export default store