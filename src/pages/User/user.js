import "./user.css";
import "./userHome.css";
import "./services.css";
import "antd/dist/antd.css";
import Footer from "../../components/Footer/footer.js";
import Logo from "../../img/256888_109854515773613_2567514_o.jpg";
import Login from "../Login/login.js";
import Profile from "../../components/Profile/profile.js";
import DeleteService from "../../components/DeleteService/delete.js";
import Complaints from "../../components/Complaints/complaints.js";
import TransferService from "../../components/TransferService/transfer.js";
import NewService from "../../components/New_Service/new.js";
import Bills from "../../components/Bills/bills.js";
import Transactions from "../../components/Transactions/transaction.js";
import Points from "../../components/Points/points.js";
import Notifiactions from "../../components/Notification/notification.js";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  useHistory,
} from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout, Menu, Button } from "antd";
import {
  faComment,
  faUser,
  faClipboardList,
  faClone,
  faPlus,
  faRetweet,
  faTimesCircle,
  faFileInvoiceDollar,
  faDollarSign,
} from "@fortawesome/free-solid-svg-icons";

function User(props) {
  const [Id, setId] = useState(window.location.pathname);
  const { Content } = Layout;
  const { Header } = Layout;
  const { SubMenu } = Menu;
  const history = useHistory();
  const singout = () => {
    localStorage.removeItem("username");
    history.push("/water/login");
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

          <Menu theme="dark" mode="horizontal" selectedKeys={[Id]} id="menu">
            <Menu.Item className="item" key="/water/user/home">
              <Link to="/water/user/home">الرئيسية</Link>
            </Menu.Item>
            <Menu.Item className="item" key="/water/user/profile">
              <Link to="/water/user/profile">الملف الشخصي</Link>
            </Menu.Item>
            <Menu.Item className="item" key="/water/user/transactions">
              <Link to="/water/user/transactions">معاملاتي</Link>
            </Menu.Item>
            <SubMenu key="water/user/services" className="item" title="خدماتي">
              <Menu.Item key="/water/user/new_service">
                <Link to="/water/user/new_service">طلب اشتراك</Link>
              </Menu.Item>
              <Menu.Item key="/water/user/service_transfer">
                <Link to="/water/user/service_transfer">نقل اشتراك</Link>
              </Menu.Item>
              <Menu.Item key="/water/user/delete_service">
                <Link to="/water/user/delete_service">إزالة اشتراك</Link>
              </Menu.Item>
            </SubMenu>
            <Menu.Item className="item" key="/water/user/complaints">
              <Link to="/water/user/complaints"> الشكاوي</Link>
            </Menu.Item>
            <Menu.Item className="item" key="/water/user/bills">
              <Link to="/water/user/bills"> الفواتير</Link>
            </Menu.Item>
            <Menu.Item className="item" key="/water/user/points">
              <Link to="/water/user/points"> ساعدنا</Link>
            </Menu.Item>
            <Menu.Item key="out" className="out">
              <Button type="primary" onClick={singout}>
                تسجيل الخروج
              </Button>
            </Menu.Item>
          </Menu>
          <div style={{ position: "relative", right: "100%", top: "-45px" }}>
            <Notifiactions />
          </div>
        </Header>
        <Content>
          <Switch>
            <Route path="/water/user/services">
              <div className="userServicesContainer ">
                <Link to="/water/user/new_service">
                  <Button type="primary" id="/water/user/new_service">
                    <FontAwesomeIcon icon={faPlus} className="icon" />
                    طلب اشتراك
                  </Button>
                </Link>
                <Link to="/water/user/service_transfer">
                  <Button type="primary" id="/water/user/service_transfer">
                    <FontAwesomeIcon icon={faRetweet} className="icon" />
                    نقل اشتراك
                  </Button>
                </Link>
                <Link to="/water/user/delete_service">
                  <Button type="primary" id="/water/user/delete_service">
                    <FontAwesomeIcon icon={faTimesCircle} className="icon" />
                    حذف اشتراك
                  </Button>
                </Link>
              </div>
            </Route>
            <Route path="/water/user/service_transfer">
              <div className="services">
                <div className="headerServices">نقل اشتراك</div>
                <TransferService />
              </div>
            </Route>
            <Route path="/water/user/new_service">
              <div className="services">
                <div className="headerServices">طلب اشتراك جديد</div>
                <NewService />
              </div>
            </Route>
            <Route path="/water/user/delete_service">
              <div className="services">
                <div className="headerServices">حذف اشتراك </div>
                <DeleteService />
              </div>
            </Route>
            <Route path="/water/user/transactions">
              <Transactions />
            </Route>
            <Route path="/water/user/home">
              <div className="userHomeContainer ">
                <Link to="/water/user/profile">
                  <Button
                    type="primary"
                    id="/water/user/profile"
                    icon={<FontAwesomeIcon icon={faUser} className="icon" />}
                  >
                    الملف الشخصي
                  </Button>
                </Link>
                <Link to="/water/user/complaints">
                  <Button
                    type="primary"
                    id="/water/user/complaints"
                    icon={<FontAwesomeIcon icon={faComment} className="icon" />}
                  >
                    الشكاوي
                  </Button>
                </Link>
                <Link to="/water/user/transactions">
                  <Button
                    type="primary"
                    id="/water/user/transactions"
                    icon={
                      <FontAwesomeIcon
                        icon={faClipboardList}
                        className="icon"
                      />
                    }
                  >
                    معاملاتي
                  </Button>
                </Link>
                <Link to="/water/user/services">
                  <Button
                    type="primary"
                    id="/water/user/services"
                    icon={<FontAwesomeIcon icon={faClone} className="icon" />}
                  >
                    خدماتي
                  </Button>
                </Link>
                <Link to="/water/user/bills">
                  <Button
                    type="primary"
                    id="/water/user/bills"
                    icon={
                      <FontAwesomeIcon
                        icon={faFileInvoiceDollar}
                        className="icon"
                      />
                    }
                  >
                    الفواتير
                  </Button>
                </Link>
                <Link to="/water/user/points">
                  <Button
                    type="primary"
                    id="/water/user/points"
                    icon={
                      <FontAwesomeIcon icon={faDollarSign} className="icon" />
                    }
                  >
                    ساعدنا
                  </Button>
                </Link>
              </div>
            </Route>
            <Route path="/water/user/complaints">
              <div className="services">
                <div className="headerServices">إدراج شكوى </div>
                <Complaints />
              </div>
            </Route>
            <Route path="/water/user/profile">
              <Profile />
            </Route>
            <Route path="/water/user/login">
              <Login />
            </Route>
            <Route path="/water/user/bills">
              <div className="services">
                <div className="headerServices">الفواتير</div>
                <Bills />
              </div>
            </Route>
            <Route path="/water/user/points">
              <Points />
            </Route>
          </Switch>
        </Content>
        <Footer />
      </Layout>
    </Router>
  );
}

export default User;
