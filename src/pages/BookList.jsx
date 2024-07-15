import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Button,
  Input,
  Space,
  Table,
  Tag,
  Popconfirm,
  Modal,
  Form,
  message,
  Spin,
  Select,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeftOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from 'axios';

const { Option } = Select;

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState("");
  const [filterdata, setFilterData] = useState([]);
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const navigate = useNavigate();

  const getAllBooks = async () => {
    setTableLoading(true);
    try {
      const response = await axios.get('https://demo-nodejs-1.onrender.com/api/books');
      if (response.status === 200) {
        setBooks(response?.data?.data);
      } else {
        setBooks([]);
      }
    } catch (err) {
      setBooks([]);
    } finally {
      setTableLoading(false);
    }
  };

  useEffect(() => {
    getAllBooks();
  }, []);

 

  const data = books?.map((item, i) => ({
    key: i,
    _id: i + 1,
    title: item.title,
    author: item.author,
    publishYear: item.publishYear,
    action: item._id,
  }));

  const deleteBook = async (id) => {
    setTableLoading(true);
    setLoading3(true);
    try {
      const response = await axios.delete(`https://demo-nodejs-1.onrender.com/api/books/${id}`);
      if (response.status === 200) {
        message.success("Deleted successfully");
        getAllBooks();
      } else {
        message.error(response.data.message);
      }
    } catch (err) {
      message.error("Something went wrong! Please try again.");
    } finally {
      setTableLoading(false);
      setLoading3(false);
    }
  };

  const addNewBook = () => {
    setIsModalOpen1(true);
    form.resetFields();
  };

  const onFinishBook = async (values) => {
    setLoading2(true);
    try {
      const response = await axios.post('https://demo-nodejs-1.onrender.com/api/books', values);
      if (response.status === 200) {
        message.success("Added successfully");
        getAllBooks();
        setIsModalOpen1(false);
        form.resetFields();
      } else {
        message.warning(response.data.message);
      }
    } catch (err) {
      message.error("Something went wrong! Please try again.");
    } finally {
      setLoading2(false);
    }
  };

  const viewBook = async (id) => {
    setIsModalOpen(true);
    setLoading(true);
    try {
      const response = await axios.get(`https://demo-nodejs-1.onrender.com/api/books/${id}`);
      if (response.status === 200) {
        form1.setFieldsValue({
          ...response.data,
          e_id: response.data._id,
        });
      } else {
        message.error("Something went wrong! Please try again.");
      }
    } catch (err) {
      message.error("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const updateBook = async (values) => {
    const { e_id, ...rest } = values;
    setLoading1(true);
    try {
      const response = await axios.put(`https://demo-nodejs-1.onrender.com/api/books/${e_id}`, rest);
      if (response.status === 200) {
        message.success("Updated successfully");
        getAllBooks();
        setIsModalOpen(false);
      } else {
        message.warning(response.data.message);
      }
    } catch (err) {
      message.error("Something went wrong! Please try again.");
    } finally {
      setLoading1(false);
    }
  };

  const handleOk1 = () => {
    setIsModalOpen1(false);
  };
  const handleCancel1 = () => {
    setIsModalOpen1(false);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "S No",
      dataIndex: "_id",
      key: "_id",
      width: "5%",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "20%",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      width: "20%",
    },
    {
      title: "Publish Year",
      dataIndex: "publishYear",
      key: "publishYear",
      width: "15%",
    },
    {
      title: "Action",
      dataIndex: "action,name",
      key: "action,name",
      fixed: "right",
      width: "10%",
      render: (action, name) => (
        console.log("action", name),
        <div style={{ display: "flex" }}>
          <p className="action_btn edit" onClick={() => viewBook(name?.action)}>
            <EditOutlined />
          </p>
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={() => deleteBook(name?.action)}
            okButtonProps={{
              loading: loading3,
            }}
          >
            <p className="action_btn delete">
              <DeleteOutlined />
            </p>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <React.Fragment>
      <Section>
        <Modal
          title="Add Book"
          open={isModalOpen1}
          onOk={handleOk1}
          onCancel={handleCancel1}
          okText="Create"
          width={400}
          footer={null}
        >
          <Form name="Book_add" layout="vertical" onFinish={onFinishBook} form={form}>
            <Form.Item
              label="Title"
              name="title"
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Author"
              name="author"
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Publish Year"
              name="publishYear"
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading2}>
              Save
            </Button>
          </Form>
        </Modal>

        <Modal
          title="Edit Book"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Update"
          width={400}
          footer={null}
        >
          {loading ? (
            <div className="spin_center">
              <Spin />
            </div>
          ) : (
            <Form name="Book_edit" layout="vertical" onFinish={updateBook} form={form1}>
              <Form.Item label="" name="e_id" type="hidden" style={{ height: 0 }}>
                <Input name="e_id" type="hidden" />
              </Form.Item>
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Author"
                name="author"
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Publish Year"
                name="publishYear"
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Button type="primary" htmlType="submit" loading={loading1}>
                Save
              </Button>
            </Form>
          )}
        </Modal>

        <div className="page_back_align">
          <p onClick={() => navigate(-1)} className="go_back">
            <ArrowLeftOutlined /> &nbsp; Books
          </p>
          <Button type="primary" size="small" onClick={addNewBook}>
            <PlusCircleOutlined />
            New
          </Button>
        </div>

        <div className="table_show" style={{ overflowX: "auto", marginTop: 20 }}>
          <Space style={{ marginBottom: 16 }}>
            <Input
              placeholder="Search here...."
              onChange={(e) => {
                setValue(e.target.value);
                const filteredData = data.filter((entry) =>
                  Object.values(entry).some(
                    (val) => typeof val === "string" && val.toLowerCase().includes(e.target.value.toLowerCase())
                  )
                );
                setFilterData(filteredData);
              }}
              value={value}
              prefix={<SearchOutlined />}
            />
            <Button
              onClick={() => {
                setValue("");
                setFilterData(data);
              }}
            >
              Clear
            </Button>
          </Space>
          <Table
            columns={columns}
            dataSource={value === "" ? data : filterdata}
            bordered
            size="small"
            scroll={{ x: true }}
            loading={tableLoading}
          />
        </div>
      </Section>
    </React.Fragment>
  );
};

const Section = styled.section`
  .ant-modal-footer {
    display: none;
  }
  .page_back_align {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .go_back {
    cursor: pointer;
  }
  .table_show {
    overflow-x: auto;
    margin-top: 20px;
  }
  .action_btn {
    cursor: pointer;
    margin-right: 10px;
  }
  .spin_center {
    display: flex;
    justify-content: center;
  }
`;

export default BookList;
