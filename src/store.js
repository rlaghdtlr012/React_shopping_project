import { configureStore, createSlice } from '@reduxjs/toolkit'
import userEvent from '@testing-library/user-event'

let user = createSlice({ // useState 역할
    name : "user",
    initialState : { name : 'kim', age : 20},
    reducers : {
        changeName(state){ // state는 기존 스테이트
            state.name = 'park';
        },
        changeAge(state, action){
            state.age += action.payload; // 인수(변수)만큼 증가시켜줌
        }
    }
})
export let { changeName, changeAge } = user.actions // user에 있던 함수들이 오브젝트 형태로 남음
let stock = createSlice({
    name : "stock",
    initialState : [10, 11, 12], 
})

let product = createSlice({
    name : "product",
    initialState : 
    [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers : {
        changeCount(state, action){
            let 번호 = state.findIndex((a)=>{
                return a.id === action.payload
            })
            state[번호].count += 1;
        },
        addItem(state, action){
            state.push(action.payload);
        }
    }
}) 
export let { changeCount, addItem } = product.actions
export default configureStore({
  reducer: {
    //여기다가 state 저장해야함
        user : user.reducer, // 모든 컴포넌트들이 이 스테이트 갖다 쓸 수 있음
        stock : stock.reducer,
        product : product.reducer
    }
})