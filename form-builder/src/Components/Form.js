import  React,{useEffect,useState} from "react";
import {Form, Field,withFormik} from "formik";
import * as Yup from 'yup';
import axios from  'axios'

function FormBuilder({value,errors,touched,status}) {
  const[user,setUser] =useState([])
 
  useEffect(() => {
  if (status) {
    setUser([...user, status ])
  }

  }, [status]);


 return (
   <div className="">

    <Form>
     <div> 
     {touched.name && errors.name && <p>{errors.name}</p>}  
      <Field type="text" name="username" placeholder="Username"/>
  
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
      <Field type="checkbox" name="tos"  checked={value}/>
      Accept TOS
      </label>
      <br/>
      <button type="submit" >Submit!</button>
    </Form>
  
  
  
    {user.map(eachUser => (
      
        <p key={eachUser.id}>
          Username: {eachUser.username} <br />
          Email: {eachUser.email}<br />
          TOS: {eachUser.tos}<br/>
          ID:{eachUser.id}
         
        </p>
        
  ))}
      
      </div>
 )
};
  



const FormikOnBoardForm = withFormik({
  mapPropsToValues({username,password,email,tos}){
      return{
          username:username || "",
          password:password || "",
          email:email || "",
          tos:tos || false
          
      }
  }, 

    validationSchema: Yup.object().shape({
      username: Yup.string().required("Put Yo!!! Name In Man!!!!!"),
      password: Yup.string().min(6,"6 or more fool").required("Really?"),
      email: Yup.string().email("Wrong,Wrong").required("You need to get it right"),
   
   

  }),
  handleSubmit(values,  {setError,resetForm, setStatus }) {
     
      axios
        .post("https://reqres.in/api/users", values)
        .then(res => {
          setStatus(res.data)
          resetForm()
          console.log("Server says",res.data)
        })
        .catch(err => {
          setError(err)
          console.log("You messed Up,",err); // There was an error creating the data and logs to console
        })

    
  }
})(FormBuilder);


export default FormikOnBoardForm