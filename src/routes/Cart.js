import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeName, changeAge, changeCount } from './../store.js';

function Cart(){
    let state = useSelector((state)=>{ return state }) // ReduxStore 가져와줌 store에 있던 모든 state가 남음
    let dispatch = useDispatch(); // changeName 함수를 쓰기위해 store.js로 요청을 보내주는 함수
    return (
        <div>
            <h6>나이가 {state.user.age}인 {state.user.name}의 장바구니</h6>
            <button onClick={()=>{
                dispatch(changeAge(10));
            }}>버튼</button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.product.map(function(a,i){
                            let p = i;
                            return (
                                <SmallTable key={a.id} p={p}/>
                            )
                        })
                    }
                </tbody>
            </Table> 
        </div>
    )
}

function SmallTable({p}){
    let state = useSelector((state)=>{ return state })
    let dispatch = useDispatch(); // changeName 함수를 쓰기위해 store.js로 요청을 보내주는 함수
    return (
        <tr>
            <td>{state.product[p].id}</td>
            <td>{state.product[p].name}</td>
            <td>{state.product[p].count}</td>
            <td><button onClick={()=>{
                dispatch(changeCount(state.product[p].id)); // dispatch 안에 감싸서 변경함수를 사용해야한다.
            }}>+</button></td>
        </tr>
    )
}

export default Cart;