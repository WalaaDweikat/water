import "antd/dist/antd.css";
import Footer from "../../components/Footer/footer.js";
import Logo from "../../img/256888_109854515773613_2567514_o.jpg";
import EmployeeProfile from "../../components/EmployeeProfile/profile.js";
import ServicesRequests from "../../components/ServicesRequests/services.js";
import Rating from "../../components/Rating/rate.js";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useHistory,
} from "react-router-dom";
import { Layout, Menu, Button } from "antd";
import { useState } from "react";

function ServicesEmployee() {
  const [Id, setId] = useState(window.location.pathname);
  const { Content } = Layout;
  const { Header } = Layout;
  const history = useHistory();

  const singout = () => {
    localStorage.removeItem("username");
    history.push("/water/login");
    window.location.reload();
  };

  window.addEventListener("click", () => {
    setId(window.location.pathname);
  });
  return (
    <Router>
      <Layout className="userContainer">
        <Header
          className="header"
          style={{ position: "fixed", zIndex: 1, width: "100%" }}
        >
          <div className="logo">
            <img src={Logo} alt="logo" className="logoHeader" />
          </div>
          <Menu theme="dark" mode="horizontal" selectedKeys={[Id]}>
            <Menu.Item
              className="item"
              key="/water_service/Services_employee/profile"
            >
              <Link to="/water_service/Services_employee/profile">
                الملف الشخصي{" "}
              </Link>
            </Menu.Item>

            <Menu.Item
              className="item"
              key="/water_service/Services_employee/services"
            >
              <Link to="/water_service/Services_employee/services">
                الخدمات
              </Link>
            </Menu.Item>
            <Menu.Item
              className="item"
              key="/water_service/Services_employee/rate_us"
            >
              <Link to="/water_service/Services_employee/rate_us">
                تقييم الموقع
              </Link>
            </Menu.Item>

            <Menu.Item key="out" className="out">
              <Button type="primary" onClick={singout}>
                تسجيل الخروج
              </Button>
            </Menu.Item>
          </Menu>
        </Header>
        <Content>
          <Switch>
            <Route path="/water_service/Services_employee/services">
              <ServicesRequests />
            </Route>
            <Route path="/water_service/Services_employee/profile">
              <EmployeeProfile />
            </Route>
            <Route path="/water_service/Services_employee/rate_us">
              <Rating />
            </Route>
          </Switch>
        </Content>
        <Footer />
      </Layout>
    </Router>
  );
}

export default ServicesEmployee;