import React from 'react'
import { Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Card, CardHeader, FormFeedback, CardBody, CardTitle, Row, Table } from "reactstrap";
const EmpFormComp = (props) => {
  return (
    <Col lg="6" md="6" sm="8">
    <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label
            htmlFor="exampleEmail"
            className="mr-sm-2">{props.label}</Label>
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
  )
}

export default EmpFormComp