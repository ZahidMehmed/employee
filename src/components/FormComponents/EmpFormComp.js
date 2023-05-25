import React from 'react'
import { Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Card, CardHeader, FormFeedback, CardBody, CardTitle, Row, Table } from "reactstrap";
const EmpFormComp = (props) => {
  return (
    <Row className='sm-3 mt-3 d-flex align-items-center' >
      <Col sm="3">  <Label style={{ fontSize: "14px", fontWeight: "400px" }}
        htmlFor="exampleEmail"
        className="mr-sm-2">{props.label}
      </Label></Col>
      <Col lg={props.lg} md={props.md} sm={props.sm}>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Input
            bsSize="sm"
            type={props.typeof}
            name="email"
            id="exampleName"
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChangeEvent}
            invalid={props.invalid}
          />
          {props.errorMessage && <FormFeedback>{props.errorMessage}</FormFeedback>}

        </FormGroup>
      </Col>
    </Row>
  )
}

export default EmpFormComp