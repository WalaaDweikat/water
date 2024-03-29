import "./register.css";
import "antd/dist/antd.css";
import { Input, Button, Form, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BackArrow from "../../img/R.jpg";
import Register2 from "../Register2/register2";
import axios from "axios";
import IP from "../../ip.js";
export default function Register() {
  const history = useHistory();
  const [match, setMatch] = useState(false);
  const [pass, setPass] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  useEffect(() => {
    if (pass === confirmPass) {
      setMatch(pass);
    } else setMatch(pass + confirmPass);
  }, [pass, confirmPass]);

  return (
    <Router>
      <Switch>
        <Route path="/signup/" exact>
          <div className="register">
            <div className="rr">
              <div className="newUser">تسـجـيـل مـشـتـرك جـديـد</div>
              <img
                src={BackArrow}
                alt="backArrow"
                className="back"
                onClick={() => {
                  history.goBack();
                }}
              />
            </div>
            <Form
              wrapperCol={{ span: 40 }}
              className="form"
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={(values) => {
                const bodyFormData = new FormData();
                bodyFormData.append("username", values.id);
                bodyFormData.append("password", values.password);
                bodyFormData.append("email", values.email);

                axios({
                  method: "post",
                  url: IP + "/water/users/add",
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                  data: bodyFormData,
                })
                  .then((response) => {
                    console.log(response.data);
                    if (response.data === "no citizen with this ID") {
                      message.error("الرجاء التسجيل بخدمة المياه اولا");
                    } else if (response.data === "this user has an account") {
                      message.error(
                        "الرجاء استخدام رقم هوية اخر، رقم الهوية هذا مستخدم "
                      );
                    } else if (response.data === "this user has an account") {
                      message.error(
                        "الجاء استخدام رقم هوية اخر، رقم الهوية هذا مستخدم "
                      );
                    } else if (response.data === "new user added") {
                      localStorage.setItem("username", values.id);
                      history.push("/water/signup/cont");
                      window.location.reload();
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                    message.error("حصل خطأ ما , اعد المجاولة");
                  });
              }}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="id"
                rules={[
                  {
                    required: true,
                    message: "أدخل رقم هويتك",
                  },
                  {
                    pattern: /^(?:\d*)$/,
                    message: "يرجى إدخال أرقام فقط",
                  },
                  {
                    pattern: /^[\d]{9}$/,
                    message: "أدخل رقم من 9 خانات",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="رقم الهوية"
                  style={{ height: "40px", borderRadius: "10px" }}
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "يرجى إدخال بريد إلكتروني صالح",
                  },
                  {
                    required: true,
                    message: "أدخل بريك الإلكتروني",
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined />}
                  placeholder="البريد الإلكتروني"
                  style={{ height: "40px", borderRadius: "10px" }}
                  type="email"
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
                    setPass(e.target.value);
                  }}
                  id="password"
                  prefix={<LockOutlined />}
                  style={{ height: "40px", borderRadius: "10px" }}
                  placeholder="كلمة المرور"
                />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: "يرجى تأكيد كلمة المرور",
                  },
                  {
                    pattern: match,
                    message: "كلمتا المرور غير متطابقتين",
                  },
                ]}
              >
                <Input.Password
                  onChange={(e) => {
                    setConfirmPass(e.target.value);
                  }}
                  id="confirmPassword"
                  prefix={<LockOutlined />}
                  style={{ height: "40px", borderRadius: "10px" }}
                  placeholder="تأكيد كلمة المرور"
                />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  span: 4,
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    height: "40px",
                    margin: "20px 0 0 0",
                    borderRadius: "10px",
                    backgroundColor: "#ee2260",
                    borderColor: "#ee2260",
                  }}
                >
                  استمر
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Route>
        <Route path="/signup/cont">
          <Register2 />
        </Route>
      </Switch>
    </Router>
  );
}
