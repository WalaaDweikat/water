import "./login.css";
import "antd/dist/antd.css";
import IP from "../../ip.js";
import profile from "../../img/Profile.jpg";
import User from "../User/user.js";
import Admin from "../Admin/admin.js";
import WaterEngineer from "../WaterEngineer/tech.js";
import NewAccount from "../NewAccount/newAccount.js";
import ServicesEmployee from "../ServicesEmployee/tech.js";
import Main from "../Main/main.js";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input, Button, message } from "antd";
import { useHistory } from "react-router-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { useState } from "react";
import WaterTech from "../WaterTechnician/tech.js";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const error = () => {
    message.error({
      content: "كلمة مرور  او اسم المستخدم خاطئ",
      style: {
        marginTop: "30vh",
      },
      duration: 1,
    });
  };
  const onFinish = async (values) => {
    const axios = require("axios");
    const res = await axios.get(IP + "/water/login", {
      params: { username: username, password: password },
    });
    localStorage.setItem("username", username);
    localStorage.setItem("type", res.data);

    if (res.data === 0) {
      //admin
      localStorage.setItem("flag", "1");
      history.push("/admin/home");
    } else if (res.data === -1) {
      //user
      localStorage.setItem("flag", "1");
      history.push("/user/home");
    } else if (res.data === 1) {
      //water_engineer
      localStorage.setItem("flag", "1");
      history.push("/water_engineer/profile");
    } else if (res.data === 2) {
      //water_Technician
      localStorage.setItem("flag", "1");
      history.push("/water_technician/profile");
    } else if (res.data === 3) {
      // "موظف الخدمات";
      localStorage.setItem("flag", "1");
      history.push("/Services_employee/profile");
    }
    //  else if (res.data === 5) {
    //   //موظف الشحن";
    //   history.push("/");
    // } else if (res.data === 4) {
    //   //موظف العدادات";
    //   history.push("/");
    // }
    else {
      localStorage.setItem("flag", 0);
      error();
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Router>
      <Switch>
        <Route path="/login" exact>
          <div className="login">
            <div className="loginform">
              <svg
                style={{
                  margin: "-30px 0 0 -250px",
                  width: "120px",
                  height: "120px",
                }}
                id="Corner_Plants"
                data-name="Corner Plants"
                xmlns="http://www.w3.org/2000/svg"
                width="176.781"
                height="152.333"
                viewBox="0 0 176.781 152.333"
              >
                <path
                  id="Fill_16"
                  data-name="Fill 16"
                  d="M5.636,27.143A96.51,96.51,0,0,0,16.147,34.6c5.729,3.745,11.319,6.329,17.839,6.419,10.6.146,20.023-3.207,28.5-8.813A48.2,48.2,0,0,0,74.4,21.531c1.452-1.905,2.772-3.921,4.046-5.969.787-1.265,1.53-2.56,2.262-3.864.44-.785,1.406-1.885,1.407-2.869a1.663,1.663,0,0,0-2.253-1.608c-.844.453-1.312,1.94-1.8,2.769-1.122,1.908-2.34,3.74-3.6,5.539A43.094,43.094,0,0,1,67.8,23.1,60.472,60.472,0,0,1,50.2,33.83c-1.063-6.649-4.873-11.705-10.454-15.255-7.945-5.054-15.816-7.791-24.717-7.482-5.78.2-10.379,2.729-14.4,6.591-.76.73-1.712,1.871-1.342,3.15.356,1.231,1.9,2.259,2.785,3.1C3.243,25.036,4.429,26.1,5.636,27.143Z"
                  transform="translate(67.579 158.063) rotate(-150)"
                  fill="#dde3e9"
                />
                <path
                  id="Leaf"
                  d="M61.692,9.276c-.937,9.55-1.953,19.043-4.107,28.365-1.27,5.493-2.959,10.856-4.473,16.278q.193-1.023.332-2.059c-.537,1.614-1.726,3.135-2.383,4.739a55.749,55.749,0,0,0-1.849,5.509c-1.058,3.62-2.049,7.249-3.258,10.822-1.348,3.981-2.924,7.887-4.383,11.829A86.824,86.824,0,0,1,37.534,94.8c-.9,1.731-1.7,3.6-2.581,5.362-.3.591-2.774,7.221-2.753,7.221.451.015,2.031-2.915,2.295-3.345.771-1.254,1.417-2.565,2.071-3.878a17.907,17.907,0,0,0,1.71,4.654c.25.459,2.011,3.837,2.545,3.856.267.009-2.427-6.35-2.759-6.911a12.275,12.275,0,0,1-.946-1.521c-.295-.778-.15-.581.044-1.267a32.5,32.5,0,0,1,1.72-3.673,23.7,23.7,0,0,1,1.663-3.859c1.775-3.408,2.972-7.6,4.283-11.292a24.716,24.716,0,0,0,1.793,5.4c.192.417,1.741,4.281,2.146,4.3.456.016-1.516-6.155-1.773-6.691-.477-1-1.205-1.968-1.609-2.979-.443-1.109.228-2.071.637-3.176,1.5-4.065,2.8-8.178,3.976-12.351,7.823,3.416,9.7,12.744,10.451,19.6a43.821,43.821,0,0,1-1.195,14.672,87.869,87.869,0,0,1-6.96,18.213,59.987,59.987,0,0,1-13.665,18,67.761,67.761,0,0,1-9.886,7.233,20.474,20.474,0,0,1-5.469,2.489,20.444,20.444,0,0,1-2.787.544c-.719.094-2.171.669-2.777.489-4.943-1.433-8.7-3.663-11.7-7.671a35.58,35.58,0,0,1-5.769-12.65,37.429,37.429,0,0,1-.933-14.587,80.927,80.927,0,0,1,2.622-10.85c3.7-12.672,10.515-26.161,23.386-32.74a39.561,39.561,0,0,1,13.648-3.837c1.135-.127,2.268-.246,3.42-.267.777-.014,3.353.556,3.9.262.756-.4,1.11-2.824,1.414-3.7,2.309-6.626,4.346-13.338,6.168-20.117a216.239,216.239,0,0,0,4.608-21.9c.5-3.144.993-6.283,1.391-9.448.093-.736-.117-3.069.633-3.7A1,1,0,0,1,61.985,5c.539.9-.2,3.3-.293,4.277"
                  transform="matrix(-0.391, -0.921, 0.921, -0.391, 42.054, 114.253)"
                  fill="#c1dee2"
                />
                <path
                  id="Leave_the_Leaf_"
                  data-name="Leave the Leaf!"
                  d="M23.9,4.218a38.209,38.209,0,0,0-6.892.312,33.609,33.609,0,0,0-6.733,1.654A24.357,24.357,0,0,0,3.161,9.848a8.77,8.77,0,0,0-2.47,3.07A7.019,7.019,0,0,0,.2,17.08a.75.75,0,0,0-.232-.047.716.716,0,0,0-.752.52c-.013.183.129.328.4.408.665.194.692.244.959.729l.08.145a8.262,8.262,0,0,1,.429.957c.092.23.186.467.29.686a21.147,21.147,0,0,0,1.846,3.2,27.555,27.555,0,0,0,5.436,5.675,40.088,40.088,0,0,0,11.74,6.826,40.578,40.578,0,0,0,5.774,1.465A44.791,44.791,0,0,0,32.1,38.3a43.614,43.614,0,0,0,8.918-.516,21.008,21.008,0,0,0,5.68-1.645,12.2,12.2,0,0,0,4.575-3.645A13.14,13.14,0,0,0,53.9,26.654a7.164,7.164,0,0,0,.072-.81,5.822,5.822,0,0,1,.1-.974l.024-.105c.131-.581.131-.581.57-.613.123-.009.275-.02.475-.047,1.036-.138,2.1-.283,3.159-.432a71.29,71.29,0,0,0,8.2-1.508,20.038,20.038,0,0,0,2.571-.871c.1-.041.247-.1.418-.16.972-.362,2.78-1.036,3.013-1.767a.85.85,0,0,0,0-.727.54.54,0,0,0-.452-.2,2.974,2.974,0,0,0-1.321.372c-.458.257-.935.5-1.418.717a21.08,21.08,0,0,1-3.791,1.277c-1.4.337-2.844.576-4.245.808l-.047.008c-1.2.2-2.485.391-4.037.6-.764.1-1.546.208-2.237.3l-.014,0a1.866,1.866,0,0,0-.2.043,1.226,1.226,0,0,1-.317.053.173.173,0,0,1-.131-.051.2.2,0,0,1-.037-.147,21.385,21.385,0,0,1-3.577.159c-.442,0-.9-.01-1.334,0-1.69.02-3.111.021-4.547-.04-.485-.021-.959-.048-1.408-.082a40.7,40.7,0,0,1-4.312-.532,21.817,21.817,0,0,1-2.493-.617c-.1-.031-.27-.072-.466-.12-.684-.166-1.827-.445-2.032-.773.035.055.245.091.623.107.307.013.683.012.975.009l.233,0c.212,0,.379,0,.457,0H36.4c1.017.084,2.037.235,2.987.387a45.4,45.4,0,0,0,5.19.536l.352.013c-.015-.248-.7-.664-1.2-.968-.184-.112-.343-.209-.429-.274a20.4,20.4,0,0,1-2.037-1.751,22.756,22.756,0,0,1-3.289-3.791,4.1,4.1,0,0,0,1.153.842c.236.14.459.271.6.374.681.515,1.308,1.033,1.865,1.542.588.537,1.128,1.108,1.578,1.6.164.178.35.417.546.669A5.843,5.843,0,0,0,45.043,21.1l.007,0a.319.319,0,0,0,.1-.04l.056-.028a.537.537,0,0,1,.233-.065.18.18,0,0,1,.077.019,1.348,1.348,0,0,1,.324.382.643.643,0,0,0,.1.128,1.711,1.711,0,0,0,.615.12,7.85,7.85,0,0,0,1.073-.059c.246-.025.479-.048.665-.049,1.189-.007,2.4-.027,3.562-.046h.042l1.263-.02c.062,0,.13,0,.211,0l.113.005h0l.118.006c.291.012.542,0,.664-.267a3.363,3.363,0,0,0-.258-1.656c-.039-.126-.073-.236-.1-.323a11.616,11.616,0,0,0-2.368-4.6,19.747,19.747,0,0,0-7.654-5.488A71.822,71.822,0,0,0,33.932,5.75,49.662,49.662,0,0,0,23.9,4.218ZM35.26,25.987c-.048,0-.079-.014-.092-.036a.109.109,0,0,1-.012-.084c.1-.43,2.166-1.469,3.677-2.227a12.318,12.318,0,0,0,1.491-.8A9.567,9.567,0,0,1,37.586,25.1,10.235,10.235,0,0,1,35.26,25.987ZM50.3,29.525c0-.022.194-.408.4-.817l0,0c.169-.329.344-.669.423-.839.35-.75.692-1.559,1.047-2.472A14.246,14.246,0,0,1,50.3,29.525Z"
                  transform="translate(87.818 115.294) rotate(-150)"
                  fill="#89c5cc"
                />
              </svg>
              <img alt="login" src={profile} className="profileImg" />
              <label>تسجيل الدخول</label>
              <Form
                name="basic"
                wrapperCol={{
                  span: 40,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "أدخل رقم هويتك",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    prefix={<UserOutlined />}
                    style={{ height: "40px", borderRadius: "50px" }}
                    placeholder="اسم المستخدم"
                    id="username"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "أدخل كلمة المرور",
                    },
                  ]}
                >
                  <Input.Password
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    prefix={<LockOutlined />}
                    style={{ height: "40px", borderRadius: "50px" }}
                    placeholder="كلمة المرور"
                    id="password"
                  />
                </Form.Item>
                {/* <a href="https://www.google.com"> هل نسيت كلمة السر؟</a> */}

                <Form.Item
                  wrapperCol={{
                    offset: 5,
                    span: 21,
                  }}
                >
                  <Button
                    onKeyPress={(e) => {
                      if (e.key === "Enter") onFinish();
                    }}
                    type="primary"
                    htmlType="submit"
                    style={{
                      width: "150px",
                      height: "40px",
                      margin: "20px 0 0 0",
                      borderRadius: "50px",
                    }}
                  >
                    دخول
                  </Button>
                </Form.Item>
              </Form>
              <Link to="/signup" className="createAcount">
                إنشاء حساب؟
              </Link>
            </div>
          </div>
        </Route>
        <Route path="/user">
          {localStorage.getItem("flag") === "1" ? (
            <User />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/admin">
          {localStorage.getItem("flag") === "1" ? (
            <Admin />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/water_technician">
          {localStorage.getItem("flag") === "1" ? (
            <WaterTech />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/water_engineer">
          {localStorage.getItem("flag") === "1" ? (
            <WaterEngineer />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/water_engineer">
          {localStorage.getItem("flag") === "1" ? (
            <WaterEngineer />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/Services_employee">
          {localStorage.getItem("flag") === "1" ? (
            <ServicesEmployee />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/signup" exact>
          <NewAccount />
        </Route>
        <Route path="/" exact>
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}
