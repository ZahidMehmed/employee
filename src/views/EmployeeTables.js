import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, Image } from 'antd';
import { FcViewDetails } from 'react-icons/fc';
import '../assets/css/EmpProfile.css'
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  Nav,
  Container,
  ModalHeader, UncontrolledAlert
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faHistory, faTrash } from '@fortawesome/free-solid-svg-icons'
const EmployeeTables = () => {

  const [Employee, setcategory] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [AddPermission, setAddPermission] = useState(true)
  const [UpdatePermsission, setUpdatePermsission] = useState(true)
  const [DeletePermission, setDeletePermission] = useState(true)
  const Navigate = useNavigate();
  const handleOnGet = async () => {
    let result = await fetch(`https://employee-backend-one.vercel.app/EmployeeList_Get`)
    result = await result.json()
    console.log(result)
    setcategory(result)
  }
  useEffect(() => {
    handleOnGet()
  }, [])

  const deleteData = async (id) => {
    setIsModalOpen(false);
    let result = await fetch(`https://employee-backend-one.vercel.app/EmployeeList_Delete/${id}`, {
      method: "delete"
    }
    )
    result = await result.json()
    if (result) {
      handleOnGet()
    }
  }
  const showModal = (id) => {
    setProductToDelete(id)
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setProductToDelete(null); // reset the selected product to delete
    setIsModalOpen(false);
  };
  const showDetailsModal = (id) => {
    console.log(id)
    setSelectedEmployee(id);
    setIsDetailsModalOpen(true);
  };
  const handleCancelDetailsModal = () => {
    setSelectedEmployee(null);
    setIsDetailsModalOpen(false);
  };

  let value = localStorage.getItem('user')
  const authV = JSON.parse(value)
  let id = authV.user._id



  const getAPIbyID = async (item) => {
    let result = await fetch(`https://employee-backend-one.vercel.app/AdminPermisionsId/${id}`)
    result = await result.json()
    console.log(result)
    setAddPermission(result.Add)
    setUpdatePermsission(result.Update)
    setDeletePermission(result.Delete)
  }
 
  useEffect(() => {
    getAPIbyID()
  }, [])
  return (
    <>
      <div className="content">
        <Row>
          <Col className="ml-auto mr-auto" md="12" sm="11">
            <Card
              className="text-center">
              <CardHeader>
                <div className="row d-flex align-itmes-center justify-content-between">
                  <Col lg="4" md="4" sm="8">
                    <CardTitle tag="h4">Emplyees Details</CardTitle>
                  </Col>
                  <Col lg="4" md="4" sm="8">
                    {AddPermission !== true ?
                      <UncontrolledAlert className=" " color="danger" >
                        Autherization Denied!
                      </UncontrolledAlert>

                      :
                      <Link
                        to="/employeeForm"
                        className=" m-2">
                        <Button>Add New</Button>
                      </Link>
                    }
                  </Col>
                </div>
              </CardHeader>
              <pre>
                <CardBody className="" >
                  <Table bordered responsive>
                    <thead className="text-primary ">
                      <tr>
                        <th>Sr.No</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>More About Employee</th>
                        <th>Joining Date</th>
                        <th>History</th>
                        <th>Operations</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        Array.isArray(Employee) && Employee.length > 0
                        &&
                        Employee.map((item, index) => {

                          return (

                            <tr key={index + 1} scope="row" >
                              <td>{index + 1}</td>
                              <td>{item.fullName}</td>
                              <td>{item.email}</td>
                              <td><Link>
                                <FcViewDetails
                                  style={{ fontSize: "30px" }}
                                  onClick={() => {
                                    showDetailsModal(item);
                                  }}
                                />
                              </Link></td>

                              <td>{item.joiningDate}</td>
                              <td>
                                <Link
                                  to={`/EmpAtendHistory/${item._id}`}
                                >
                                  <FontAwesomeIcon
                                    className="text-secondary"
                                    icon={faHistory}
                                    style={{
                                      cursor: "pointer",
                                      fontSize: "20px"
                                    }}
                                  />
                                </Link>
                              </td>
                              <td className="p-1 m-0">
                                {
                                  UpdatePermsission !== true ? <></> :
                                    <Link
                                      to={`/UpdateEmployee/${item._id}`}
                                    >
                                      <FontAwesomeIcon
                                        icon={faEdit}
                                      />
                                    </Link>
                                }
                                {
                                  DeletePermission !== true ? <></> :
                                    <FontAwesomeIcon
                                      icon={faTrash}
                                      style={{ marginLeft: "15px", color: "red", cursor: "pointer" }}
                                      onClick={() => {
                                        showModal(item._id)
                                      }}
                                    />
                                }
                              </td>
                            </tr>
                          )
                        })

                      }
                    </tbody>
                  </Table>
                </CardBody>
              </pre>
            </Card>

          </Col>
        </Row>
        <Row>
          <Col lg="8" md="8" sm="8">
            <Modal title="Basic Modal" open={isModalOpen} onOk={() => {
              let deleted = deleteData(productToDelete)
              if (deleted) {
                Navigate('/tables')
              }
            }}
              onCancel={handleCancel}>
              <p>Are You sure Want to Delete</p>
            </Modal>

            <Modal open={isDetailsModalOpen}
              onCancel={handleCancelDetailsModal}>
              <ModalHeader
              >Employee Details</ModalHeader>
              {selectedEmployee && (
                <div>
                  <Container className="mt-5 empProfile">
                    <div className="">
                      <Row>
                        <Col className="flex-column justify-content-center align-items-center" lg="8" md="6">
                          <Card className="d-flex align-items-center justify-content-center card-user">
                            <Image alt="..." className="avatar border-gray" src={require("assets/img/mike.jpg")} />
                          </Card>
                          <Nav aria-label="breadcrumb" className="main-breadcrumb d-flex justify-content-center">
                            <h5 className="breadcrumb-item text-center mt-0" aria-current="page">
                              {selectedEmployee.fullName}'s Profile</h5>

                          </Nav>
                        </Col>
                      </Row>
                      <div className="row justify-content-center ">
                        <Col lg="12" md="12">
                          <Card className="card mb-3">
                            <div className="card-body">

                              <Row>
                                <Col sm="5">
                                  <h6 className="mb-0">Full Name</h6>
                                </Col>
                                <Col sm="5" className="text-info">
                                  {selectedEmployee.fullName}
                                </Col>
                              </Row>
                              <hr />

                              <Row>
                                <Col sm="5">
                                  <h6 className="mb-0">Email</h6>
                                </Col>
                                <Col sm="5" className="text-info">
                                  {selectedEmployee.email}
                                </Col>
                              </Row>
                              <hr />

                              <Row>
                                <Col sm="5">
                                  <h6 className="mb-0">CNIC</h6>
                                </Col>
                                <Col sm="5" className="text-info">
                                  {selectedEmployee.CNIC}
                                </Col>
                              </Row>
                              <hr />

                              <Row className="row">
                                <Col sm="5">
                                  <h6 className="mb-0">Joined Date</h6>
                                </Col>
                                <Col sm="5" className="text-info">
                                  {selectedEmployee.joiningDate}
                                </Col>
                              </Row>
                              <hr />

                              <Row className="row">
                                <Col sm="5">
                                  <h6 className="mb-0">Desigination</h6>
                                </Col>
                                <Col sm="5" className="text-info">
                                  {selectedEmployee.designation}
                                </Col>
                              </Row>
                              <hr />

                              <Row className="row">
                                <Col sm="5">
                                  <h6 className="mb-0">Salary</h6>
                                </Col>
                                <Col sm="5" className="text-info">
                                  {selectedEmployee.salary}
                                </Col>
                              </Row>
                              <hr />

                              <Row className="row">
                                <Col sm="5">
                                  <h6 className="mb-0">Password</h6>
                                </Col>
                                <Col sm="5" className="text-info">
                                  {selectedEmployee.password}
                                </Col>
                              </Row>
                              <hr />

                              <Row className="row">
                                <Col sm="5">
                                  <h6 className="mb-0">Last Degree</h6>
                                </Col>
                                <Col sm="5" className="text-info">
                                  {selectedEmployee.lastDegree}
                                </Col>
                              </Row>
                              <hr />

                              <Row className="row">
                                <Col sm="5">
                                  <h6 className="mb-0">Address</h6>
                                </Col>
                                <Col sm="5" className="text-info">
                                  {selectedEmployee.address}
                                </Col>
                              </Row>
                            </div>
                          </Card>
                        </Col>
                      </div>
                    </div>

                  </Container>
                </div>
              )}
            </Modal>

          </Col>
        </Row>
      </div>
    </>
  );
}

export default EmployeeTables;