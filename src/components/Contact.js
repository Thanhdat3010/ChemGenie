import React from 'react';
import { Form, Button} from 'react-bootstrap';
import './Contact.css';

function Contact() {
  return (
    <section className="full-screen1">
          <div className="feedback-container">
                <h2 className="form-title">Góp Ý Về Website</h2>
                <Form>
                    <Form.Group controlId="formName">
                        <Form.Label></Form.Label>
                        <Form.Control type="text" placeholder="Họ tên của bạn là gì?" />
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Label></Form.Label>
                        <Form.Control type="email" placeholder="Email của bạn là gì?" />
                    </Form.Group>

                    <Form.Group controlId="formFeedback">
                        <Form.Label></Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Điều bạn muốn góp ý..." />
                    </Form.Group>

                    <Button type="submit" className="mt-3 sm-button">
                        Xác nhận
                    </Button>
                </Form>
            </div>
    </section>

  );
}

export default Contact;