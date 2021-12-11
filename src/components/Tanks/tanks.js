import React, { useContext, useState, useEffect, useRef } from "react";
import { Table, Input, Button, Popconfirm, Form, Select } from "antd";
import { Modal } from "react-responsive-modal";
import "antd/dist/antd.css";
import "./tanks.css";
import "react-responsive-modal/styles.css";
import Mhbes from "../Mhbes/mhbes.js";
const { Option } = Select;
const { Search } = Input;
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form} style={{ background: "red" }}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: ` قم بتعبئة ${title}`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};
class Tanks extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "رقم الخزان",
        dataIndex: "index",
        width: "2%",
        editable: false,
      },
      {
        title: "سعة الخزان",
        dataIndex: "capacity",
        editable: true,
        width: "10%",
      },
      {
        title: "العنوان",
        dataIndex: "address",
        editable: true,
      },
      {
        title: "عرض المحابس",
        dataIndex: "mhbes",
        width: "10%",

        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="سيتم عرض المحابس المرنبطة بالخزان"
              onConfirm={() => this.handleShow(record)}
            >
              <Button> عرض</Button>
            </Popconfirm>
          ) : null,
      },
      {
        title: "حذف",
        dataIndex: "operation",
        width: "10%",

        render: (_, record) =>
          this.state.dataSource.length >= 1 ? (
            <Popconfirm
              title="هل أنت متأكد من الحذف"
              onConfirm={() => this.handleDelete(record.key)}
            >
              <a style={{ color: "red" }}>حذف</a>
            </Popconfirm>
          ) : null,
      },
    ];
    this.state = {
      dataSource: [
        {
          id: "0",
          key: "0",
          index: "1",
          capacity: "32",
          address: "London, Park Lane no. 0",
        },
        {
          key: "1",
          index: "2",
          capacity: "32",
          address: "London, Park Lane no. 1",
        },
      ],
      count: 2,
      open: false,
      open2: false,
    };
  }
  onFinish = (values) => {
    console.log("Success:", values);
    let capacity = document.getElementById("cap").value;
    this.handleAdd(capacity);
    this.handleClose();
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };
  handleShow = (record) => {
    this.setState({
      dataSource: [...this.state.dataSource],
      open2: true,
    });
  };
  handleAdd = (capacity) => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      index: count,
      capacity: capacity,
      address: `أدخل العنوان `,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };
  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    this.setState({
      dataSource: newData,
    });
  };
  handleOpen() {
    this.setState({
      dataSource: [...this.state.dataSource],
      open: true,
    });
  }
  handleClose() {
    this.setState({
      dataSource: [...this.state.dataSource],
      open: false,
      open2: false,
    });
  }

  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div className="newTank">
        <div className="search">
          <Select placeholder="البحث بناء على" style={{ width: "130px" }}>
            <Option value="capacity">السعة</Option>
            <Option value="address">العنوان</Option>
          </Select>
          <Search
            placeholder="أدخل نص البحث"
            enterButton
            style={{ width: "290px", marginRight: "5px" }}
          />
        </div>
        <Table
          bordered
          components={components}
          rowClassName={() => "editable-row"}
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 3 }}
          scroll={{ x: "150px" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleOpen()}
          style={{ borderRadius: "20px", marginTop: "-30px" }}
        >
          أضف خزان جديد
        </Button>
        <Modal open={this.state.open} onClose={() => this.handleClose()} center>
          <div className="newTankForm">
            <h2 className="headerNewTank">إضافة خزان</h2>.
            <Form
              className="newTankForm"
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 20,
              }}
              initialValues={{
                remember: false,
              }}
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label="السعة"
                name="cap"
                rules={[
                  {
                    required: true,
                    message: "أدخل سعة الخزان",
                  },
                  {
                    pattern: /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/,
                    message: "يرجى إدخال قيمة صالحة",
                  },
                ]}
              >
                <Input id="cap" style={{ borderRadius: "20px" }} />
              </Form.Item>

              <Form.Item name="location">
                <Button
                  style={{
                    background: "#ee2260",
                    borderColor: "#ee2260",
                    color: "white",
                    borderRadius: "20px",
                  }}
                >
                  تحديد موقع الخزان
                </Button>
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  span: 16,
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ borderRadius: "20px" }}
                >
                  إضافة
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>
        <Modal
          style={{ width: "100vw" }}
          open={this.state.open2}
          onClose={() => this.handleClose()}
          center
          sty
        >
          <Mhbes />
        </Modal>
      </div>
    );
  }
}

export default Tanks;