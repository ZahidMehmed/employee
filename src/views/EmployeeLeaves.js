import React, { useEffect, useState } from 'react'
import { ExclamationCircleFilled } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckSquare,
  faInfoCircle,
  faTrashCan,
  faXmarkSquare
} from
  '@fortawesome/free-solid-svg-icons'
import {
  Container,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  ModalHeader,
  ModalBody,
  Button,

} from "reactstrap";
import { Modal, Image, Space } from 'antd';
import '../assets/css/Leave.css'

const { confirm } = Modal;


const EmployeeLeaves = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [SelectedLeave, setSelectedLeave] = useState(null)
  const [DeletePermission, setDeletePermission] = useState(true)
  const [LeaveAprove, setLeaveAprove] = useState(true)
  const [Delete, setDelete] = useState("")
  const showDeleteConfirm = (id) => {
    console.log("Id: "+id)
    setDelete(id)
    confirm({
      title: 'Are you sure delete this task?',
      icon: <ExclamationCircleFilled />,
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {   
      handleDelete(Delete)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  useEffect((id) => {
    // Fetch all leave requests from the server
    const fetchLeaveRequests = async () => {
      try {
        const response = await fetch('https://employee-backend-one.vercel.app/Leave');
        const data = await response.json();
        setLeaveRequests(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    const getLeaveRequest = async (id) => {
      try {
        const response = await fetch(`https://employee-backend-one.vercel.app/leave/${id}`);
        const data = await response.json();
        console.log(data);
        // Handle the response data here
      } catch (error) {
        console.error(error);
        // Handle the error here
      }
    }
    fetchLeaveRequests();
    getLeaveRequest()
  }, []);
  const handleStatusUpdate = async (id, status) => {
    try {
      const response = await fetch(`https://employee-backend-one.vercel.app/leave/${id}/${status}`,
        { method: 'PUT' });
      const data = await response.json();
      setLeaveRequests(prevState => {
        const index = prevState.findIndex(request => request._id === id);
        if (index !== -1) {
          const updatedRequest = { ...prevState[index], status };
          return [...prevState.slice(0, index), updatedRequest, ...prevState.slice(index + 1)];
        } else {
          return prevState;
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    let result = fetch(`https://employee-backend-one.vercel.app/leaveDelete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setLeaveRequests(prevState => prevState.filter(request => request._id !== id));
      })
      .catch(error => console.error(error));
  };

  const showDetailsModal = (id) => {
    setSelectedLeave(id);
    setIsDetailsModalOpen(true);
  };
  console.log(SelectedLeave)
  const handleCancelDetailsModal = () => {
    setSelectedLeave(null);
    setIsDetailsModalOpen(false);
  };

  let value = localStorage.getItem('user')
  const authV = JSON.parse(value)
  let id = authV.user._id

  const getAdminRequest = async () => {
    let result = await fetch(`https://employee-backend-one.vercel.app/AdminPermisionsId/${id}`)
    result = await result.json()
    console.log(result)
    setDeletePermission(result.Delete)
    setLeaveAprove(result.leaveApprrove)
  }
  const getSuperAdminRequest = async () => {
    try {
      let response = await fetch(`https://employee-backend-one.vercel.app/userGetId/${id}`);
      response = await response.json();

    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getAdminRequest()
    getSuperAdminRequest()
  }, [])

  return (
    <>

      <div className="content">
        <Row>
          <Col md="12">
            <Card className="text-center">
              <CardHeader className="d-flex align-items-center">
                <CardTitle tag="h4">Emplyees Leaves Requests</CardTitle>
              </CardHeader>
              <pre>
                <CardBody >
                  {loading ? <p>Loading leave requests...</p> : (
                    <Table responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>sr.No</th>
                          <th>Email</th>
                          <th>Leave For</th>
                          <th>Leave Details</th>
                          <th>Status</th>
                          <th>Approve</th>
                          <th>Reject</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leaveRequests.map((request, index) => (
                          <tr key={request._id}>
                            <td>{index + 1}</td>
                            <td></td>
                            <td>{request.leaveFor}</td>
                            <td><FontAwesomeIcon icon={faInfoCircle}
                              className='icon'
                              style={{
                                fontSize: "24px",
                                color: "lightblue",
                                marginLeft: 10,
                                cursor: "pointer"
                              }}
                              onClick={(item) => {
                                showDetailsModal(request);
                              }}
                            />
                            </td>
                            <td>{request.status}</td>
                            <td>
                              {LeaveAprove !== true ? <></>
                                :
                                <div>
                                  <FontAwesomeIcon icon={faCheckSquare}
                                    className='iconCheck'
                                    onClick={() =>
                                      handleStatusUpdate(request._id, 'Approved',)} />
                                </div>
                              }
                            </td>
                            <td>
                              {LeaveAprove !== true ? <></>
                                :
                                <div>
                                  <FontAwesomeIcon icon={faXmarkSquare}
                                    className='iconCross'
                                    onClick={() => {
                                      handleStatusUpdate(request._id, 'Rejected')

                                    }} />
                                </div>
                              }
                            </td>
                            <td>
                              {
                                DeletePermission !== true ? <>  </> :
                                  <FontAwesomeIcon
                                    onClick={() =>
                                      showDeleteConfirm(request._id)
                                    }
                                    style={{
                                      fontSize: 25,
                                      color: "darkred",
                                      cursor: "pointer"
                                    }}
                                    icon={faTrashCan} />
                              }
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </CardBody>
              </pre>
            </Card>
          </Col>
        </Row>
        <Row>
          {SelectedLeave && (<Modal
            open={isDetailsModalOpen}
            onOk={handleCancelDetailsModal}
            onCancel={handleCancelDetailsModal}>
              
          
            <ModalBody>
              <Container>
                <Row>
                  <Col xs={12} sm={12}>
                    <Card className="card mb-3">
                      <div className="card-body">
                        <Row>
                          <Col sm="5">
                            <h6 className="mb-0">Full Name</h6>
                          </Col>
                          <Col sm="5" className="text-info">
                            {SelectedLeave.fullName}
                          </Col>
                        </Row>
                        <hr />
                        <Row>
                          <Col sm="5">
                            <h6 className="mb-0">Email</h6>
                          </Col>
                          <Col sm="5" className="text-info">
                            {SelectedLeave.email}
                          </Col>
                        </Row>
                        <hr />

                        <Row>
                          <Col sm="5">
                            <h6 className="mb-0">Duration</h6>
                          </Col>
                          <Col sm="5" className="text-info">
                            {SelectedLeave.duration}
                          </Col>
                        </Row>
                        <hr />

                        <Row>
                          <Col sm="5">
                            <h6 className="mb-0">Applied Date</h6>
                          </Col>
                          {SelectedLeave.applyDate && (
                            <>
                              {SelectedLeave.applyDate.substring(0, 10)}
                            </>
                          )}
                        </Row>
                        <hr />

                        <Row className="row">
                          <Col sm="5">
                            <h6 className="mb-0">Leave Date</h6>
                          </Col>
                          <Col sm="5" className="text-info">
                            {SelectedLeave.date && (
                              <>
                                {SelectedLeave.date.substring(0, 10)}
                              </>
                            )}
                          </Col>
                        </Row>
                        <hr />
                        <Row className="row">
                          <Col sm="5">
                            <h6 className="mb-0">From</h6>
                          </Col>
                          <Col sm="5" className="text-info">
                            {SelectedLeave.fromDate && (
                              <>
                                {SelectedLeave.fromDate.substring(0, 10)}
                              </>
                            )}
                          </Col>
                        </Row>
                        <hr />
                        <Row className="row">
                          <Col sm="5">
                            <h6 className="mb-0">To</h6>
                          </Col>
                          <Col sm="5" className="text-info">
                            {SelectedLeave.toDate && (
                              <>
                                {SelectedLeave.toDate.substring(0, 10)}
                              </>
                            )}
                          </Col>
                        </Row>
                        <hr />
                        <Row className="row">
                          <Col sm="5">
                            <h6 className="mb-0">Status</h6>
                          </Col>
                          <Col sm="5" className="text-info">
                            {SelectedLeave.status}
                          </Col>
                        </Row>
                        <hr />
                      </div>
                    </Card>
                  </Col>

                </Row>
              </Container>
            </ModalBody>
          </Modal>
          )}
        </Row>
      </div>
    </>
  )
}


export default EmployeeLeaves


