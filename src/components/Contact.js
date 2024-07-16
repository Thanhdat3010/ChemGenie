import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import './Contact.css';
const { TextArea } = Input;

function Contact() {
  return (
    <div id="contact" className="block contactBlock">
      <div className="container-fluid">
        <div className="titleHolder">
          <h2>Liên hệ</h2>
        </div>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
        >
          <Form.Item
            name="fullname"
            rules={[
              { 
                required: true,
                message: 'Hãy nhập đầy đủ tên của bạn!' 
              }]
            }
          >
            <Input placeholder="Họ và tên" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: 'Email này không hợp lệ!',
              },
              {
                required: true,
                message: 'Hãy nhập email của bạn!',
              },
            ]}
          >
            <Input placeholder="Email"/>
          </Form.Item>
          <Form.Item
            name="telephone"
          >
            <Input placeholder="Số điện thoại" />
          </Form.Item>
          <Form.Item
            name="subject"
          >
            <Input placeholder="Vấn đề bạn gặp phải" />
          </Form.Item>
          <Form.Item
            name="message"
          >
            <TextArea placeholder="Tin nhắn" />
          </Form.Item>
          <Form.Item>
            <Form.Item 
              name="remember" 
              valuePropName="checked"
              noStyle
              rules={[
                { validator:(_, value) => value ? Promise.resolve() : Promise.reject('Should accept agreement') },
              ]}
            >
              <Checkbox>Tôi đồng ý với các điều khoản và điều kiện.</Checkbox>
            </Form.Item>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Hoàn thành
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>  
  );
}

export default Contact;