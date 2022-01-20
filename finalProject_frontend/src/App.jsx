import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import { useNavigate } from "react-router";
import axios from "axios";
import "./App.css";
import "./index.css";
import SignupAndLogin from "./Components/SignupAndLogin/SignupAndLogin";
import Home from "./Components/Home/Home";
import Oiasis from "./Components/Oiasis/Oiasis";
import Parks from "./Components/Parks/Parks";
import Profile from "./Components/Profile/Profile";
import Cart from "./Components/Cart/Cart";
import Welcome from "./Components/welcome/Welcome";

export default function App() {
  const [ImagesArray, setImagesArray] = useState([]);
  const [isAdmin, setAdmin] = useState(false);
  const [token, settoken] = useState(localStorage.getItem("token"));
  const [userEmail, setuserEmail] = useState(localStorage.getItem("userEmail"));
  const [userLogin, setuserLogin] = useState({ email: "", password: "" });
  const navigate = useNavigate(); //obj = usenav //
  const [cartArray, setcartArray] = useState([]);
  const [userInfo, setuserInfo] = useState("");
  let [logOut, setlogOut] = useState(false);
  function goToHome() {
    navigate("/home");
  }
  //----------------------------------------------------------------------------------------------

  // تاخذ فاريبل عبارة عن قيمة سترنق و تخزنه في التوكن اللي كان اول بسترنق فاضي
  // لما اليوزر يسجل دخول يرجع لي ريسبونس فيه توكن و ابغى اخزن الراجع من الريسبونس جوا الفاضي
  // function dataLogin
  
  function getToken(mytoken) {
    settoken(mytoken);
}

  let user = localStorage.getItem("user");
  useEffect(async () => {
    if (user) {
      setlogOut(true);
      if (user == "admin") {
        setAdmin(true);
        getData();
      } else {
        setAdmin(false);
        getData();
      }
    } else {
      setlogOut(false);
      localStorage.setItem("token", "");
    }
  }, []);

  //   function getToken(mytoken) {
  //     settoken(mytoken);
  //   }
  //عرض التذاكر بعد ما يكون التوكن عندي
  async function getData() {
    //res.data
    let { data } = await axios.get(
      `https://riyadh-season.herokuapp.com/party`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    //عبارة عن أري فاضية بالاول اخزن فيها البيانات
    setImagesArray(data);
  }

  async function checkCart() {
    let response = await axios.get(
      `https://riyadh-season.herokuapp.com/reservation/${userEmail}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setcartArray(response.data);
  }
  //-------------------------------------------------------------------------------------------
  //listin / كل ما يصير تغيير بالتوكن ينادي الداتا و يشيك الكارت

  useEffect(async () => {
    try {
      let { data } = await axios.get(
        `https://riyadh-season.herokuapp.com/party`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setImagesArray(data);
    } catch (error) {
      console.log(error);
    }
    checkCart();
    // console.log(ImagesArray)
  }, [token, ImagesArray]);

  // console.log(ImagesArray,"ImagesArray")
  //---------------------------------------------------------------------------------------------

  //ترسل الايميل و الباسوورد
  async function dataLogin(e) {
    e.preventDefault();

    // نرفع البيانات لقاعدة البيانات
    try {
      const response = await axios.post(
        "https://riyadh-season.herokuapp.com/signin",
        userLogin
      );
      setlogOut(true);
      if (response.status == 200) {
        setuserEmail(userLogin.email)
        localStorage.setItem("userEmail", userLogin.email);
      }
      if (response.data.roles.length > 1) {
        goToHome();
        settoken(response.data.token)
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", "admin");
      } else {
        goToHome();
        settoken(response.data.token)
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", "user");
      }
      console.log(token);
    } catch (error) {
      console.log("response.data.errors");
    }
  }
  //------------------------------------------------------------------------------------------

  let getDataforUserLogin = (e) => {
    let myuserLogin = { ...userLogin };
    myuserLogin[e.target.name] = e.target.value;
    setuserLogin(myuserLogin);
  };

  const addToCart = async (id) => {
    let response = await axios.post(
      `https://riyadh-season.herokuapp.com/reserve`,
      { id: [id] },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    let responseData = await axios.get(
      `https://riyadh-season.herokuapp.com/reservation/${userEmail}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    settoken(response.data.token)
    setcartArray(responseData.data);
  };
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" />} />
        <Route
          path="/SignupAndLogin"
          element={
            <SignupAndLogin
              token={token}
              dataLogin={dataLogin}
              getDataforUserLogin={getDataforUserLogin}
            />
          }
        />
        <Route
          path="/home"
          element={
            <Home
              logOut={logOut}
              userEmail={userEmail}
              userInfo={userInfo}
              isAdmin={isAdmin}
              getData={getData}
              addToCart={addToCart}
              token={token}
              ImagesArray={ImagesArray}
            />
          }
        />
        <Route
          path="/oiasis"
          element={
            <Oiasis
              logOut={logOut}
              addToCart={addToCart}
              getData={getData}
              isAdmin={isAdmin}
              ImagesArray={ImagesArray}
              token={token}
            />
          }
        />
        <Route
          path="/parks"
          element={
            <Parks
              logOut={logOut}
              addToCart={addToCart}
              getData={getData}
              isAdmin={isAdmin}
              ImagesArray={ImagesArray}
              token={token}
            />
          }
        />
        <Route path="/profile" element={<Profile token={token} />} />
        <Route
          path="/cart"
          element={
            <Cart
              logOut={logOut}
              cartArray={cartArray}
              token={token}
              userEmail={userEmail}
            />
          }
        />
        <Route path="/welcome" element={<Welcome logOut={logOut} />} />
      </Routes>
    </div>
  );
}
