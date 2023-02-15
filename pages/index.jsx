import React,{ useState } from 'react';
import {useEffect} from 'react';
import { Menu, Button, Card, Form, Input, Table, Tag, Layout } from 'antd';
import Image from 'next/image';
import styles from './style.module.css';
import ALL_CHECK_INS from '../utils/checkin';
import * as Constants from 'constants';
import { useQuery } from '@apollo/client';
import Modal from '../components/Modal/index';
import SideModal from '../components/Modal/sidebar';

const { Header } = Layout;
const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (text) => <p>{text}</p>
  },
  {
    title: 'Owner',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <p>{text}</p>
  },

  {
    title: 'Status',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          const color = tag.length > 5 ? 'geekblue' : 'green';
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    )
  },

  {
    title: 'Created At',
    dataIndex: 'address',
    key: 'address'
  }
];
const record1 = [
  {
    key: '1',
    title: 'checked in',
    name: 'John Brown',
    address: '12th Nov,2022',
    tags: ['CHECKED IN']
  },

  {
    key: '2',
    title: 'checked in',
    name: 'Emma Belley',
    address: '7th Feb,2022',
    tags: ['CHECKED IN']
  }
];

const getRowKey = (record) => {
  return `${record.key}`;
};

function Home() {
  const { data, error } = useQuery(ALL_CHECK_INS);

  useEffect(() => {
    console.log('*** data', data);
    console.log('error', error);
  }, [error, data]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedRowKey, setSelectedRowKey] = useState(null);
  const [visible, setVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const setRowKey = (record) => {
    const newSelectedRowKey = getRowKey(record);
    console.log(record);
    console.log(newSelectedRowKey, typeof newSelectedRowKey);
    setSelectedRowKey(newSelectedRowKey);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleCreateCheckIn = (values) => {
    // Handle creating check-in with form values
    console.log(values);
    closeModal();
  };

  const handleOk = (e) => {
    console.log(e);
    setVisible(false);
  };

  const handleCancel = (e) => {
    console.log(e);
    setVisible(false);
  };

  return (
    <Layout className={styles.layoutBack}>
      <Header className={styles.HeaderStyle}>
        <div className={styles.divStyle}>
          <div className={styles.innerStyle}>
            <h1 style={{ margin: 0 }}>AAA</h1>
          </div>

          <Menu mode="horizontal" className={styles.MenuStyle}>
            <div className={styles.buttondiv}>
              <Button type="text">Support</Button>
              <Button type="text">Feedback</Button>
            </div>
            <div className={styles.imageDiv}>
              <Image src="logo.svg" alt="Picture of the author" width={40} height={30} />
            </div>
          </Menu>
        </div>
      </Header>
      <Card>
        <div className={styles.carddiv}>
          <div className={styles.insidecard}>
            <h1 className={styles.cardheader}>CheckIns</h1>
            <p className={styles.cardparagraph}>
              Lorem ipsus dolor sit amen, something important to say here
            </p>
          </div>
          <div>
            <Button type="button" className={styles.buttonstyle} onClick={openModal}>
              Add Check In
            </Button>

            <Modal title="New Checkin" visible={isOpen} onCancel={closeModal} footer={false}>
              <Form
                name="basic"
                wrapperCol={{ span: 25 }}
                initialValues={{ remember: true }}
                onFinish={handleCreateCheckIn}>
                <Form.Item
                  name="Check In Title"
                  rules={[{ required: true, message: 'Please input check in title!' }]}>
                  <Input placeholder="Check In Title" />
                </Form.Item>
                <Form.Item
                  name="Image Url"
                  rules={[{ required: true, message: 'Please input url!' }]}>
                  <Input placeholder="Image Url" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className={styles.checkinbutton}>
                    Create CheckIn
                  </Button>
                  <Button onClick={closeModal} className={styles.cancelbutton}>
                    Cancel
                  </Button>
                </Form.Item>
              </Form>
            </Modal>
          </div>
        </div>
      </Card>
      <Table
        columns={columns}
        dataSource={record1}
        rowKey={(record) => getRowKey(record)}
        rowClassName={(record) => (getRowKey(record) === selectedRowKey ? 'highlighted' : '')}
        pagination={false}
        onRow={(record) => {
          return {
            onClick: () => {
              setVisible(true);
              setRowKey(record);
              setSelectedRecord(record);
            }
          };
        }}
      />
      <SideModal
        title="Details"
        visible={selectedRecord !== null}
        onOk={handleOk}
        onCancel={() => setSelectedRecord(null)}
        footer={false}
        bodyStyle={{height: 740}}
        className={styles.SideModal}>
        {selectedRecord && (
          <div>
            <h1> {selectedRecord.name}</h1>
            <Image src="./detail.svg" alt="detail" width={300} height={200} />
          </div>
        )}
      </SideModal>
    </Layout>
  );
}

export default Home;
