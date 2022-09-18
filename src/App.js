import logo from './logo.svg';
import './App.css';
import {createContext, useState, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Navbar, Container, Nav, Row, Col} from 'react-bootstrap';
import bg from './bg.png';
import {data} from './data.js'; 
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import Detail from "./routes/Detail.js";
import axios from 'axios';
import Cart from "./routes/Cart.js";

export let Context1 = createContext();

function App(){
  // let obj = {name : 'kim'};
  // JSON화 시킨다. 왜냐하면 로컬스토리지에는 문자열 밖에 저장을 못하기 때문에
  // localStorage.setItem('data', JSON.stringify(obj));
  let [shoes, setShoes] = useState(data);
  let [재고] = useState([10,11,12]);
  let navigate = useNavigate();
  let [num, setNum] = useState(2);
  useEffect(()=>{
    localStorage.setItem('watched', JSON.stringify( [] ))

  },[])
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand onClick={()=>{navigate('/')}}>홍쇼핑</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/cart')}}>홈</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/detail/0')}}>상세페이지</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    
      <Routes>
      <Route path="/" element={
        <>
          <div className="main-bg" style={{backgroundImage : 'url('+ bg +')'}}></div>
          <Container>
            <div className="row">
              {
                shoes.map(function(a,i){
                  let p = i;
                  return(
                      <Card key={a.id} shoes={shoes} p={p}></Card>
                  )
                })
              }
            </div>
            <button onClick={()=>{
              setNum(num+1);
              axios.get(`https://codingapple1.github.io/shop/data${num}.json`).then((결과)=>{
                let shoe = [...shoes, ...결과.data];
                setShoes(shoe);
              })
              .catch(()=>{
                console.log('실패함ㅅㄱ');
              })

              // 서버에 post 요청하는 법
              // axios.post('URL', {name : 'kim'})

              // 한번에 여러번 get 요청을 하게 해주는 코드, get 요청을 통해 다 받는다면, ~~~~~ 코드 실행
              // Promise.all([axios.get('/url'), axios.get('/url2')])
              // .then(()=>{
              //   //~~~~~;
              // })
            }}>상품 더보기</button>
          </Container>
        </>
      }/>
      <Route path="/detail/:id" element={
        <Context1.Provider value={{재고, shoes}}>
          <Detail shoes={shoes}/>
        </Context1.Provider>
      }/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="*" element={<div>없는페이지인데요</div>}/>
      <Route path="/about" element={<About/>}>
        <Route path="member" element={<div>멤버정보임</div>} />
        <Route path="location" element={<div>위치정보임</div>} />
      </Route>
      <Route path="/event" element={<Event/>}>
        <Route path="one" element={<div>첫 주문 시 양배추즙 서비스</div>}/>
        <Route path="two" element={<div>생일기념 쿠폰받기</div>}/>
      </Route>
      </Routes>
    </div>
  );
}
function Event(){
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  );
}

function About(){
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  );
}

function Card(props) {
  let navigate = useNavigate();
  return (
      <div className="col-md-4">
        <img src = {`https://codingapple1.github.io/shop/shoes${props.p+1}.jpg`} width="80%" onClick={()=>{
          navigate(`/detail/${props.p}`);
        }}/>
        <h6>상품 이름 : {props.shoes[props.p].title}</h6>
        <p>상품 내용 : {props.shoes[props.p].content}</p>
        <p>가격 : {props.shoes[props.p].price}</p>
      </div>
  );
}

export default App;
