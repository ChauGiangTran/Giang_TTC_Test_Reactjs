import React, { useEffect } from 'react';
import banner from '../assets/images/background.jpg';
import { useNavigate } from 'react-router-dom';
import { Form, Card, Container, Image, Stack, Pagination, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { getBlogs } from './../redux/actions/blogAction';
import Loading from './../components/Loading';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.blog.loading);

  const blogList = useSelector((state) => state.blog.blogs);
  const totalCount = useSelector((state) => state.blog.totalCount);
  const tableParams = useSelector((state) => state.blog.tableParams);
  const { page, limit, order, search } = tableParams;
  let searchTimeout;

  useEffect(() => {
    console.log(blogList);
    if (!blogList.length) {
      fetchBlogs({ ...tableParams });
    }
  }, []);

  const getPaginationItems = () => {
    const items = [];
    const totalPage = Math.ceil(totalCount / limit);
    for (let i = 1; i <= totalPage; i++) {
      items.push(
        <Pagination.Item onClick={() => onPagination(i)} key={i} active={i === page}>
          {i}
        </Pagination.Item>
      );
    }

    return items;
  };

  const onPagination = (number) => {
    if (page === number) {
      return;
    }

    fetchBlogs({ ...tableParams, page: number });
  };

  const onSearch = (value) => {
    if (value === '' && search === '') {
      return;
    }

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    searchTimeout = setTimeout(() => {
      fetchBlogs({ ...tableParams, search: value });
    }, 2000);
  };

  const fetchBlogs = (payload) => {
    dispatch(getBlogs(payload));
  };

  return (
    <div className="home-layout">
      <section className="banner w-100">
        <Image src={banner} />
        <div className="banner__title">
          <p>My Blog</p>
        </div>
      </section>
      <Container>
        <section className="blog-action  mb-3">
          <Row className="justify-content-md-center">
            <Col md={12} lg={8}>
              <Stack direction="horizontal" gap={3}>
                <Form.Control
                  required
                  type="text"
                  placeholder="Blog title"
                  style={{ width: '10rem' }}
                  className="ms-auto"
                  onChange={(e) => onSearch(e.target.value.trim())}
                />
                <Form.Select
                  onChange={(e) => fetchBlogs({ ...tableParams, order: e.target.value })}
                  aria-label="Sort Blog"
                  defaultValue={order}
                  style={{ width: '8rem' }}>
                  <option key={1} value={'desc'}>
                    Newest
                  </option>
                  <option key={2} value={'asc'}>
                    Latest
                  </option>
                </Form.Select>
                <Button
                  variant="success"
                  className="ml-auto"
                  onClick={() => navigate('/create_blog')}>
                  New Blog
                </Button>
              </Stack>
            </Col>
          </Row>
        </section>
        <section className="blog-list">
          <Row className="justify-content-md-center">
            <Col md={12} lg={8}>
              <Stack gap={3}>
                {loading ? (
                  <Loading />
                ) : (
                  blogList.length > 0 &&
                  blogList.map((blog, index) => {
                    return (
                      <Card key={blog.id} index={index} className="card-blog">
                        <Stack direction="horizontal" gap={3} className="card-body">
                          <Image rounded={true} alt={blog.title} src={blog.image} />
                          <div>
                            <Card.Title>{blog.title}</Card.Title>
                            <Card.Text className="mb-2 text-muted">{blog.createdAt}</Card.Text>
                            <Card.Text>{blog.content}</Card.Text>

                            <Card.Text>
                              <Button
                                variant="success"
                                size="sm"
                                className="mx-auto"
                                onClick={() => navigate(`/blog/${blog.id}`)}>
                                Edit
                              </Button>
                            </Card.Text>
                          </div>
                        </Stack>
                      </Card>
                    );
                  })
                )}
              </Stack>
            </Col>
          </Row>
        </section>
        <div className="pagination">
          <Pagination>{getPaginationItems()}</Pagination>
        </div>
      </Container>
    </div>
  );
}
export default Home;
