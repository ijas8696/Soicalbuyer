// JobList.js
import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';

const getImageForPlatform = (social_type) => {
  switch (social_type) {
    case 'instagram':
      return 'https://usr.dokan-cdn.com/instagram.png';
    case 'tiktok':
      return 'https://usr.dokan-cdn.com/tiktok.png';
    case 'twitter':
      return 'https://usr.dokan-cdn.com/twitter.png';
    case 'steam':
      return 'https://usr.dokan-cdn.com/steam.png';
    default:
      return 'https://usr.dokan-cdn.com/default.png';
  }
};

const JobList = ({ jobs }) => {
  return (
    <Row>
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <Col xs={12} sm={6} md={4} lg={3} key={job.id} className="mb-4">
             <Card style={{backgroundColor:'#F2F3F4'}} key={job.id}>
                <Nav.Link href='/social-media-accounts-view'><Card.Img variant="top" src={getImageForPlatform(job.social_type)} /></Nav.Link>
                <Card.Body>
                <Card.Title>@{job.social_username}</Card.Title>
                <Card.Text>
                <span><div class="card__author  card__author--verified  ">
                <img src="https://usr.dokan-cdn.com/public/avatars/e334bb8a73397609e060efed2fb27f96.gif" alt="" /><a href="https://usr.gg/meshari">@Ijas Ahamed</a></div></span>
                </Card.Text>
                </Card.Body>
                <Card.Body>
                <Card.Link href="#"><div className='card__likes'><span className='card__likes1'>🚀بوست</span></div></Card.Link>
                <Card.Link href="#">
                <div class="card__price">
                <span>السعر</span>
                <span dir="rtl">
                <span class="account_price_previe">${job.social_amount} </span>
                </span>
                </div>
                </Card.Link>
                </Card.Body>
                </Card>
          </Col>
        ))
      ) : (
        <Col xs={12}>
          <p className="text-center">No jobs available</p>
        </Col>
      )}
    </Row>
  );
};

export default JobList;
