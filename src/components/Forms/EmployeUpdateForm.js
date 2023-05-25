import { Result } from 'antd';
import React, { useState, useEffect } from 'react'
import { useNavigate,useParams } from 'react-router-dom';
import EmpFormComp from 'components/FormComponents/EmpFormComp';
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Button, Row, Col } from 'reactstrap';
const EmoloyeesUpdateForm = () => {

  const [proPhoto, setproPhoto] = useState("")
  const [fullName, setfullName] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [CNIC, setCNIC] = useState("")
  const [designation, setdesignation] = useState("")
  const [salary, setsalary] = useState("")
  const [lastDegree, setlastDegree] = useState("")
  const [address, setaddress] = useState("")
  const [joiningDate, setjoiningDate] = useState("")
  const [Err, setErr] = useState(false)
  const Navigate = useNavigate()
  const params = useParams(); 

  const validateForm = () => {
    const errors = {};

    if (!fullName) {
      errors.fullName = "Full name is required";
    }

    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (!CNIC) {
      errors.CNIC = "CNIC is required";
    }

    if (!designation) {
      errors.designation = "Designation is required";
    }

    if (!salary) {
      errors.salary = "Salary is required";
    } else if (!/^\d+$/.test(salary)) {
      errors.salary = "Salary is invalid";
    }

    if (!lastDegree) {
      errors.lastDegree = "Last degree is required";
    }

    if (!address) {
      errors.address = "Address is required";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    const errors = validateForm();
    if (errors) {
      setErr(errors);
      return;
    }

    let result = await fetch(`https://employee-backend-one.vercel.app/EmployeeList_Updatedy_Id/${params.id}`, {
      method: 'put',
      headers: {
        'Content-Type': "Application/Json"
      },
      body: JSON.stringify({
        fullName,
        email,
        password,
        CNIC,
        designation,
        salary,
        lastDegree,
        address,
        joiningDate
      }),
    })

    result = await result.json()
   if(result){
    Navigate("/tables")
   }
  }
   const getAPIbyID =async ()=>{
    console.log(params.id)
    let result = await fetch(`https://employee-backend-one.vercel.app/EmployeeListById/${params.id}`)
    result = await result.json()
    console.log(result)
    setfullName(result.fullName)
    setemail(result.email)
    setpassword(result.password)
    setCNIC(result.CNIC)
    setdesignation(result.designation)
    setsalary(result.salary)
    setlastDegree(result.lastDegree)
    setaddress(result.address)
    setjoiningDate(result.joiningDate)
  
  }
 useEffect(() => {
    console.log("Zahid")
 getAPIbyID()
 }, [])

  return (
    <Form onSubmit={handleOnSubmit} className='EmpForm'>
        <Row className='mt-3 justify-content-around' >
          <EmpFormComp
            label={'Full Name'}
            value={fullName}
            placeholder={'Full Name'}
            typeof ={'text'}
            onChangeEvent={(e) => {
              setfullName(e.target.value);
              if (Err && Err.fullName) {
                setErr({ ...Err, fullName: null });
              }
            }}
            invalid={Err && Err.fullName ? true : false}
            errorMessage={Err && Err.fullName ? Err.fullName : null}
          />
          <EmpFormComp
            label={'Email'}
            placeholder={'email'}
            typeof ={'text'}
            value={email}
            onChangeEvent={(e) => {
              setemail(e.target.value);
              if (Err && Err.email) {
                setErr({ ...Err, email: null });
              }
            }}
            invalid={Err && Err.email ? true : false}
            errorMessage={Err && Err.email ? Err.email : null}
          />
        </Row>

        <Row className='mt-3 justify-content-around' >
          <EmpFormComp
            label={'password'}
            placeholder={'Passowrd'}
            typeof ={'text'}
            value={password}
            onChangeEvent={(e) => {
              setpassword(e.target.value);
              if (Err && Err.password) {
                setErr({ ...Err, password: null });
              }
            }}
            invalid={Err && Err.password ? true : false}
            errorMessage={Err && Err.password ? Err.password : null}
          />
          <EmpFormComp
            label={'CNIC'}
            placeholder={'CNIC'}
            typeof ={'text'}
            value={CNIC}
            onChangeEvent={(e) => {
              setCNIC(e.target.value);
              if (Err && Err.CNIC) {
                setErr({ ...Err, CNIC: null });
              }
            }}
            invalid={Err && Err.CNIC ? true : false}
            errorMessage={Err && Err.CNIC ? Err.CNIC : null}
          />
        </Row>

        <Row className='mt-3 justify-content-around' >
          <EmpFormComp
            label={'Desigination'}
            placeholder={'Desigination'}
            typeof ={'text'}
            value={designation}
            onChangeEvent={(e) => {
              setdesignation(e.target.value);
              if (Err && Err.designation) {
                setErr({ ...Err, designation: null });
              }
            }}
            invalid={Err && Err.designation ? true : false}
            errorMessage={Err && Err.designation ? Err.designation : null}
          />
          <EmpFormComp
            label={'Salary'}
            placeholder={'Salary'}
            typeof ={'text'}
            value={salary}
            onChangeEvent={(e) => {
              setsalary(e.target.value);
              if (Err && Err.salary) {
                setErr({ ...Err, salary: null });
              }
            }}
            invalid={Err && Err.salary ? true : false}
            errorMessage={Err && Err.salary ? Err.salary : null}
          />
        </Row>

        <Row className='mt-3 justify-content-around' >
          <EmpFormComp
            label={'Joining date'}
            placeholder={'Joining Date'}
            typeof ={'date'}
            value={joiningDate}
            onChangeEvent={(e) => {
              setjoiningDate(e.target.value);
              if (Err && Err.joiningDate) {
                setErr({ ...Err, joiningDate: null });
              }
            }}
            invalid={Err && Err.joiningDate ? true : false}
            errorMessage={Err && Err.joiningDate ? Err.joiningDate : null}
          />
          <EmpFormComp
            label={'Last Degree'}
            placeholder={'Degree Name'}
            typeof ={'text'}
            value={lastDegree}
            onChangeEvent={(e) => {
              setlastDegree(e.target.value);
              if (Err && Err.lastDegree) {
                setErr({ ...Err, lastDegree: null });
              }
            }}
            invalid={Err && Err.lastDegree ? true : false}
            errorMessage={Err && Err.lastDegree ? Err.lastDegree : null}
          />
        </Row>

        <Row 
          className='justify-content-end mt-3'>
          <EmpFormComp
            label={'Address'}
            value={address}
            onChangeEvent={(e) => {
              setaddress(e.target.value);
              if (Err && Err.address) {
                setErr({ ...Err, address: null });
              }
            }}
            invalid={Err && Err.address ? true : false}
            errorMessage={Err && Err.address ? Err.address : null}

          />
        </Row>
        <Row style={{ marginLeft: "8%" }} className='justify-content-end mt-3 mb-3'>
          <Col lg="4" md="4" sm="8">
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
              <Button type='submit' color='primary'>Submit</Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>
  )
}

export default EmoloyeesUpdateForm