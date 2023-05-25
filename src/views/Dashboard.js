
import React, {useState, useEffect} from "react";
import { FiUsers} from 'react-icons/fi';
import { faEnvelope, faCalendarDays, faTasks } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";
// core components

import { Link } from "react-router-dom";
const authering = localStorage.getItem('user')
function Dashboard() {
  const [toalEmp, settoalEmp] = useState([])
  const handleOnGet = async () => {
    let result = await fetch(`http://localhost:350/EmployeeList_Get`)
    result = await result.json()
    settoalEmp(result)
  }
 
  useEffect(() => {
    handleOnGet()
  }, [])
  return (
    <>

      <div className="content">
        <Row>
          <Col lg="3" md="6" sm="6">
            <Link    to="/tables">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                     
                      <FiUsers className="text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                     
                      <p className="card-category">Employees</p>
                      <CardTitle tag="p">70</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
             
              </CardFooter>
            </Card>
            </Link>
          </Col>


          <Col lg="3" md="6" sm="6">
          <Link >
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center ">
                   
                      <FontAwesomeIcon icon={faTasks} className="text-primary" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Projects</p>
                      <CardTitle tag="p">16</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
               
                </div>
              </CardFooter>
            </Card>
            </Link>
          </Col>


          <Col lg="3" md="6" sm="6">
            <Link   to="/Leaves">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Leaves</p>
                      <CardTitle tag="p">23</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                </div>
              </CardFooter>
            </Card>
            </Link>
          </Col>

          <Col lg="3" md="6" sm="6">
          <Link     to="/events">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">    
                      <FontAwesomeIcon icon={faCalendarDays} className ="text-primary" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Events</p>
                      <CardTitle tag="p">+45K</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
               

                </div>
              </CardFooter>
            </Card>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Users Behavior</CardTitle>
                <p className="card-category">24 Hours performance</p>
              </CardHeader>
              <CardBody>
              
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fa fa-history" /> Updated 3 minutes ago
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
        
      </div>

    </>
  );
}

export default Dashboard;