import AdminRegFrom from "components/Forms/AdminsReg";
import EventUpdateForm from "components/Forms/EventUpdateForm";
import Dashboard from "views/Dashboard";
import EmpAtendHistory from "views/EmpAtendHistory";
import EmployeeDetails from "views/EmployeeDetails";
import Pgae404 from "views/Pgae404";
import UpdateEmployeeDetails from "views/UpdateEmpDetails";
import User from "views/User";


let c = true;
const routes = [
  {
    name :"Dashboard",
    path:"/",
    element:<Dashboard />

  },


  {
    name :"Employee Registration",
    path:"/employeeForm",
    element:<EmployeeDetails />
  },
  {
    name :"Update Employe",
    path:"/UpdateEmployee/:id",
    element:<UpdateEmployeeDetails/>
  },

  {
    name :"Employee History",
    path:"/EmpAtendHistory/:id",
    element:<EmpAtendHistory />
  },
  {
    name :" User Profile",
    path:"/userProfile",
    element:<User />
  },
  {
    name :"Uupdate Event Detail",
    path:"/updateEvent/:id",
    element:<EventUpdateForm />
  },

  {
    name :"Admins Registration",
    path:"/AdminsReg",
    element:<AdminRegFrom />
  },
  {
    name :"404 Error",
    path:"*",
    element:<Pgae404/>
  },
  ]
export default routes;
