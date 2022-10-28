import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Yup from 'yup';




function Form () {

    const [formValues, setFormValues] = useState({
        fname: '', lname: '', email: '', terms: false, 
    })
    const [errors, setErrors] = useState({
        fname: '', lname: '', email: '', terms: '', 
      });
    const [disabled, setDisabled] = useState(true);

    const [users, setUsers] = useState([]);

    const formSchema = Yup.object().shape({
        fname: Yup
          .string()
          .required("First Name is Required")
          .min(1, "Names must be at least 1 characters long."),
        lname: Yup
          .string()
          .required("Last Name is Required")
          .min(1, "Names must be at least 1 characters long."),
        email: Yup
          .string()
          .email("Must be a valid email address.")
          .required("Must include email address."),
        terms: Yup
          .boolean()
          .oneOf([true], "You must accept the Terms")
      });

      const handleChange = event => {
        const { name, type, value, checked } = event.target;
        const updatedInfo = type === 'checkbox' ? checked : value;
        setFormErrors(name, updatedInfo);
        setFormValues({ ...formValues, [name]: updatedInfo });
      }

      useEffect(() => {
        formSchema.isValid(formValues)
        .then(valid => {
          setDisabled(!valid);
        });
      }, [formValues]);

     const setFormErrors = (name, value) => {
      Yup
      .reach(formSchema, name)
      .validate(value)
      .then(valid => {
        setErrors({
          ...errors, [name]: ""
        });
      })
      .catch(err => {
        setErrors({
          ...errors, [name]: err.errors[0]
        });
      });

    setFormValues({
      ...formValues, [name]: value
    });
  };

      const formSubmit = event => {
        event.preventDefault();
        const newUser = { fname: formValues.fname.trim(), lname: formValues.lname.trim(), email: formValues.email.trim(), terms: formValues.terms }
        axios
        .post("https://reqres.in/api/users", newUser)
        .then(result => {
            console.log(result.data);
            setUsers([result.data, ...users ])
        })
        .catch(err => {
            console.log(err);
        })
        .finally(setFormValues({fname: '', lname: '', email: '', terms: false}))
      }

return (
    <div className="form-container">
        <form onSubmit={formSubmit}>
            <label>First Name:
                <input onChange={handleChange} type="text" name="fname" value={formValues.fname} placeholder='First Name'/>
            </label>
            <label>Last Name:
                <input onChange={handleChange} type="text" name="lname" value={formValues.lname} placeholder='Last Name'/>
            </label>
            <label>Email:
                <input onChange={handleChange} type="text" name="email" value={formValues.email} placeholder='Email'/>
            </label>
            <label>
                Do you agree to the Terms of Service?
                <input onChange={handleChange} type="checkbox" name="terms" checked={formValues.terms}/>
            </label>
            <button disabled={disabled}>Add User!</button>
        </form>
        <div style={{color: "red"}}>
            <div>{errors.fname}</div><div>{errors.lname}</div><div>{errors.email}</div><div>{errors.terms}</div>
        </div>
        <div>
            {users.map(user => {
                return (
                <div key={user.id}>
                    <p>{user.createdAt}</p> 
                    <p>{user.fname}</p> <p>{user.lname}</p><p>{user.email}</p> 
                </div>
            )})}
        </div>
    </div>

)
}



export default Form;