import React from "react";
import { useFormik } from "formik";
import logo from "./logo.png";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";


const validate = values => {
  const errors = {};
  // validations
  if (!values.shop_id) {
    errors.shop_id = "Required";
  } else if (values.shop_id.length > 15) {
    errors.shop_id = "Must be 15 characters or less";
  }

  // if (!values.lastName) {
  //   errors.lastName = "Required";
  // } else if (values.lastName.length > 20) {
  //   errors.lastName = "Must be 20 characters or less";
  // }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  // if (!values.phone) {
  //   errors.phone = "Required";
  // } else if (values.phone.length > 10) {
  //   errors.phone = "Must be 11 digits Number";
  // }

  return errors;
};

const Formformik = () => {
  const navigate = useNavigate();
  const [isLoading,setIsLoading] = React.useState(false)
  let params = useParams();
//   React.useEffect(()=>{
// setIsLoading(false)
//   },[])
  const formik = useFormik({
    initialValues: {
      shop_id: params?.id,
      firstName: "",
      lastName: "",
      email: "",
      phone: ""
    },
    validate,
    onSubmit: async (values, actions) => {
      setIsLoading(true)
      // alert(JSON.stringify(values, null, 2));
      let data = {shop_id:values.shop_id,email:values.email,ph_no:values.phone}
    //   let data = {
    //     "ph_no":"121231211222",
    // "shop_id":"vfb_001",
    // "email":"test@gmail.com"
    //   }
       await axios.post("http://localhost:3000/customer",
        data
       ).then(res=>
        {
          navigate("/register/confirm")
          // setIsLoading(false)
          // console.log(res)
        }).catch(e=> 
         { setIsLoading(false)
          
          alert("email already registerd")})
          
   
      actions.resetForm({
        initialValues: {
          firstName: "",
          lastName: "",
          email: "",
          phone: ""
        }
      });
    }
  },[isLoading]);
  return (
    <div className="w-96 m-auto pt-28   relative ">
      <div className="absolute z-10 top-10 ml-20 h-56 w-56">
        <img className=" " src={logo} />
      </div>

      <form
        className=" pt-12 flex flex-col w-96 m-auto gap-3 p-5 rounded-2xl shadow-md bg-[#EBECF0]"
        onSubmit={formik.handleSubmit}
      >
        <h1 className="text-center text-2xl rounded-xl drop-shadow-lg  text-[#F3722C] font-bold p-2 bg-white  m-auto w-full">
          Register Account
        </h1>
        <label className="font-semibold mt-5" htmlFor="firstName">
          Shop ID
        </label>
        <input
        disabled
          id="shop_id"
          name="shop_id"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.shop_id}
          className="focus:outline-[#F3722C] bg-white p-2 rounded-xl  "
        />
        {formik.touched.shop_id && formik.errors.shop_id
          ? <div className="text-red-500">
              {formik.errors.shop_id}
            </div>
          : null}

        <label className="font-semibold" htmlFor="email">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="focus:outline-[#F3722C] bg-white p-2 rounded-xl "
        />
        {formik.touched.email && formik.errors.email
          ? <div className="text-red-500">
              {formik.errors.email}
            </div>
          : null}
        {/* <label className="font-semibold" htmlFor="phone">
          Phone Number
        </label> */}
        {/* <input
          id="phone"
          name="phone"
          type="phone"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
          className="focus:outline-[#F3722C] bg-white p-2 rounded-xl "
        />
        {formik.touched.phone && formik.errors.phone
          ? <div className="text-red-500">
              {formik.errors.phone}
            </div>
          : null} */}
        <button
          type="submit"
          className="bg-[#F3722C]  p-2 w-full text-white mt-6 rounded-full text-xl font-semibold"
        >
        <span>
          
          <ClipLoader color="#fff" loading={isLoading} size={20} />
          </span>
          Submit
        </button>

      </form>
    </div>
  );
};
export default Formformik;
