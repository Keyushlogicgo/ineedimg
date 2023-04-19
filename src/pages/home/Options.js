import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { functionList } from "./data";
import { Link } from "react-router-dom";

const Options = () => {
  return (
    <Row>
      {functionList.map((item, key) => {
        return (
          <Col lg={3} md={4} sm={6} xs={12} key={key} className="mb-3">
            <Link to={item.url}>
              <Card className="h-100 shadow border-0 bg-blur">
                <Card.Body>
                  {item.icon}
                  <h5 className="mt-3">{item.title}</h5>
                  <p className="text-muted fs-14 mb-0">{item.description}</p>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        );
      })}
    </Row>
  );
};

export default Options;
