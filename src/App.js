import logo from './logo.svg';
import './App.css';
import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Navbar, Container, Nav, Row, Col} from 'react-bootstrap';
import bg from './bg.png';
import {data} from './data.js'; 

function App() {
  let [shoes, setShoes] = useState(data);
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">홍쇼핑</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">홈</Nav.Link>
            <Nav.Link href="#features">마이페이지</Nav.Link>
            <Nav.Link href="#pricing">상품</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <div className="main-bg" style={{backgroundImage : 'url('+ bg +')'}}>
      </div>
      <Container>
        <Row>
          {
            shoes.map(function(a,i){
              let p = i;
              return(
                <Col sm>
                  <Card shoes={shoes} p={p}></Card>
                </Col>
              )
            })
          }
        </Row>
      </Container>
    </div>
  );
}

function Card(props) {
  return (
      <div>
        <img src = {`https://codingapple1.github.io/shop/shoes${props.p+1}.jpg`} width="80%"/>
        <h6>상품 이름 : {props.shoes[props.p].title}</h6>
        <p>상품 내용 : {props.shoes[props.p].content}</p>
        <p>가격 : {props.shoes[props.p].price}</p>
      </div>
  );
}
export default App;
