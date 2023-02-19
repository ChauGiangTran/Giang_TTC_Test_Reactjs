import React, { useEffect, useState } from 'react';
import banner from '../assets/images/background.jpg';

import { Card, Button, Col, Form, Row, Container, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { getBlogInfo, updateBlogInfo } from './../redux/actions/blogAction';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from './../components/Loading';

function Blog() {
  const dispatch = useDispatch();
  const blogInfo = useSelector((state) => state.blog.blogInfo);
  const loading = useSelector((state) => state.blog.loading);
  const [validated, setValidated] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (!blogInfo && id) {
      dispatch(getBlogInfo(id));
    }
    console.log(blogInfo);
  }, []);

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

    dispatch(updateBlogInfo({ ...formData, id: blogInfo.id, createdAt: blogInfo.createdAt }));
    navigate('/');
  };

  return (
    <>
      {loading || !blogInfo ? (
        <Loading />
      ) : (
        <div className="blog-detail-form">
          <section className="banner w-100">
            <Image src={banner} />
            <div className="banner__title">
              <p>Detail Blog</p>
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
                        <Form.Control
                          name="title"
                          required
                          type="text"
                          placeholder="Blog title"
                          defaultValue={blogInfo.title}
                        />
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
                          defaultValue={blogInfo.content}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter blog content
                        </Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="image">
                        <Form.Label>Image</Form.Label>
                        <Form.Control
                          name="image"
                          required
                          type="text"
                          placeholder="Blog image link"
                          defaultValue={blogInfo.image}
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter image link
                        </Form.Control.Feedback>
                      </Form.Group>

                      <div className="image-edit">
                        <Image src={blogInfo.image} />
                      </div>

                      <div className="btn-action">
                        <Button type="submit">Save</Button>
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
}

export default Blog;
