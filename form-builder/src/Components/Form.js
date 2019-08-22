import React from "react";
import {Formik, Form, Field,withFormik} from "formik";

function OnBoardForm() {
    
  return (
      <Formik>
    <Form>
      <Field type="text" name="username" placeholder="Name" />
      <Field type="email" name="email" placeholder="email"/>
      <Field type="password" name="password" placeholder="Password" />
      <label>
      <Field type="checkbox" name="tos" />
      Accept TOS
      </label>
      <button type="submit">Submit!</button>
    </Form>
    </Formik>
  );
}
const FormikOnBoardForm = withFormik({
    mapPropsToValues({username,password,email,tos}){
        return{
            username:username || "",
            password:password || "",
            email:email || "",
            tos:tos || false
            
        };

    },
    handleSubmit(values) {
        console.log(values);
        //THIS IS WHERE YOU DO YOUR FORM SUBMISSION CODE... HTTP REQUESTS, ETC.
      }
    
})(OnBoardForm);
export default FormikOnBoardForm