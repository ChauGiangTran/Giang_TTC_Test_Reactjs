import React, { useState } from 'react';
import banner from '../assets/images/background.jpg';

import { Card, Button, Col, Form, Row, Container, Image } from 'react-bootstrap';
import { createBlogInfo } from '../redux/actions/blogAction';
import { useDispatch } from 'react-redux/es/exports';
// import Loading from './../components/Loading';

function CreateBlog() {
  const dispatch = useDispatch();

  const [validated, setValidated] = useState(false);
  const [imageInput, setImageInput] = useState('');

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    const formData = Object.fromEntries(new FormData(event.target).entries());
    if (!form.checkValidity()) {
      return;
    }

    dispatch(
      createBlogInfo({
        ...formData,
        title: formData.title,
        content: formData.content,
        image: formData.image
      })
    );
  };

  const handleInputImage = (event) => {
    setImageInput(event.target.value);
  };

  return (
    <div className="blog-create-form">
      <section className="banner w-100">
        <Image src={banner} />
        <div className="banner__title">
          <p>Create Blog</p>
        </div>
      </section>
      <Container>
        <Row className="justify-content-md-center">
          <Col md={12} lg={8}>
            <Card>
              <Card.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control name="title" required type="text" placeholder="Blog title" />
                    <Form.Control.Feedback type="invalid">
                      Please enter blog title
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="content">
                    <Form.Label>Content</Form.Label>
                    <Form.Control
                      name="content"
                      required
                      as="textarea"
                      rows={3}
                      type="text"
                      placeholder="Blog content"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter blog content
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      name="image"
                      value={imageInput}
                      required
                      type="text"
                      placeholder="Blog image link"
                      onChange={handleInputImage}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter image link
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="image-edit">{imageInput ? <Image src={imageInput} /> : null}</div>

                  <div className="btn-action">
                    <Button type="submit">Submit</Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CreateBlog;
