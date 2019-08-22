import React,{useState} from "react";
import {Form, Field,withFormik} from "formik";
import * as Yup from 'yup';
import axios from  'axios'

function FormBuilder({values,errors,touched}) {
    
  return (
   
    <Form>
     <div> 
     {touched.name && errors.name && <p>{errors.name}</p>}  
      <Field type="text" name="name" placeholder="name"/>
  
  </div>
  <div>
  {touched.email && errors.email && <p>{errors.email}</p>}
      <Field type="email" name="email" placeholder="email"/>

      </div>
      <div>
      {touched.password && errors.password && <p>{errors.password}</p>} 
      <Field type="password" name="password" placeholder="Password" />
 
      </div>
      <label>
      <Field type="checkbox" name="tos" checked={values.tos}/>
      Accept TOS
      </label>
      <button type="submit" >Submit!</button>
    </Form>
  
    
  );
}
const FormikOnBoardForm = withFormik({
  mapPropsToValues({name,password,email,tos}){
      return{
          name:name || "",
          password:password || "",
          email:email || "",
          tos:tos || false
          
      }
  }, 

    validationSchema: Yup.object().shape({
      name: Yup.string().required("Put Yo!!! Name In Man!!!!!"),
      password: Yup.string().min(6,"6 or more fool").required("Really?"),
      email: Yup.string().email("Wrong,Wrong").required("You need to get it right"),

   

  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    if (values.email === "info@mike-harley.me") {
      setErrors({ email: "That email is already taken" });
    } else {
      axios
        .post("https://reqres.in/api/users", values)
        .then(res => {
          console.log(res); // Data was created successfully and logs to console
          resetForm();
          setSubmitting(false);
        })
        .catch(err => {
          console.log(err); // There was an error creating the data and logs to console
          setSubmitting(false);
        });

    }
  }
})(FormBuilder);

export default FormikOnBoardForm