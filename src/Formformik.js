import React from 'react';
import { useFormik } from 'formik';
import logo from './logo.png';

const validate = (values) => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = 'Required';
  } else if (values.firstName.length > 15) {
    errors.firstName = 'Must be 15 characters or less';
  }

  if (!values.lastName) {
    errors.lastName = 'Required';
  } else if (values.lastName.length > 20) {
    errors.lastName = 'Must be 20 characters or less';
  }

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

const Formformik = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <div className="w-96 m-auto pt-28   relative ">
      <div className="absolute z-10 top-10 ml-20 h-56 w-56">
        <img className=" " src={logo} />
      </div>

      <form
        className=" pt-12 flex flex-col w-96 m-auto gap-3 p-5 rounded-2xl shadow-md bg-[#EBECF0]"
        onSubmit={formik.handleSubmit}
      >
        <h1 className="m-auto text-2xl text-[#F3722C] font-bold pb-5 ">
          Login
        </h1>
        <label className="font-semibold" htmlFor="firstName">
          First Name
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
          className="outline-none bg-white p-2 rounded-xl  "
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div className="text-red-500">{formik.errors.firstName}</div>
        ) : null}

        <label className="font-semibold" htmlFor="lastName">
          Last Name
        </label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
          className="outline-none bg-white p-2 rounded-xl "
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div className="text-red-500">{formik.errors.lastName}</div>
        ) : null}

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
          className="outline-none bg-white p-2 rounded-xl "
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500">{formik.errors.email}</div>
        ) : null}
        <label className="font-semibold" htmlFor="phone">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="phone"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
          className="outline-none bg-white p-2 rounded-xl "
        />
        <button className="bg-[#F3722C]  p-2 w-full text-white mt-6 rounded-full text-xl font-semibold">
          Submit
        </button>
      </form>
    </div>
  );
};
export default Formformik;