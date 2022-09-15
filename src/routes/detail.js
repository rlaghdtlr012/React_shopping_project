/* eslint-disable */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import { Nav } from 'react-bootstrap';
let YellowBtn = styled.button`
  background : ${props => props.bg};
  color : ${props => props.bg == 'blue' ? 'white' : 'black'};
  padding : 10px;
`
let Box = styled.div`
  background : grey;
  padding : 20px;
`

// let NewBtn = styled.button(YellowBtn
function Detail(props){
  let [tab, setTab] = useState(0);
  let [count, setCount] = useState(0);
  let [alert, setAlert] = useState(true);
  let [intext, setIntext] = useState('');
  let [textyn, setTextyn] = useState(false);
  const onChange = (e) => {
    setIntext(e.target.value);
    const regex = /^[0-9]+$/;
    if(regex.test(e.target.value)){
      setTextyn(true);
    } else {
      setTextyn(false);
    }
  };
  useEffect(()=>{ // mount, update 될 때, 여기 코드 실행됨
    setTimeout(()=>{setAlert(false);}, 2000);
    // return () => {
    //   console.log(''); // return ()=>{}는  useEffect가 동작하기 전에 실행된다
    // }
  }, [count]) // count라는 dependency가 변할때마다 위의 코드 실행, 처음 1회만 실행하고 싶으면 뒤를 []로 작성
  useEffect((e)=>{
    if(textyn == true){
      console.log('숫자를 입력하면 안돼요');
    } else{
      setTextyn(false);
    }
  }, [intext]);
  let {id} = useParams();
  let 찾은상품 = props.shoes.find(function(x){
    return x.id == id
  });
  return (
    <div className="container">
      {
        alert == true ? <div className="alert alert-warning">2초이내 구매시 할인</div> : null
      }
      {/* {count}
      <button onClick={()=>{setCount(count+1)}}>버튼</button> */}
      {/* <YellowBtn bg="blue">버튼</YellowBtn>
      <YellowBtn bg="orange">버튼</YellowBtn> */}
      <div className="row">
        <div className="col-md-6">
          <img src={`https://codingapple1.github.io/shop/shoes${찾은상품.id+1}.jpg`} width="100%" />
        </div>
        {/* <div>
          수정 입력란 : <input type="text" value={intext} onChange={onChange}></input>
        </div> */}
        <div className="col-md-6">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}원</p>
          <button className="btn btn-danger">주문하기</button> 
        </div>
      </div>
      <Nav variant="tabs"  defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link eventKey="link0">버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{
            setTab(1);
          }} eventKey="link1">버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{
            setTab(2);
          }} eventKey="link2">버튼2</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab}></TabContent>
    </div> 
  );
}
function TabContent(props){
  // if(props.tab == 0){
  //   return <div>내용0</div>
  // } else if(props.tab == 1){
  //   return <div>내용1</div>
  // } else {
  //   return <div>내용2</div>
  // }
  return [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][props.tab];
}

export default Detail;