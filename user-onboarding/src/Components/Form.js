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
        setFormValues({ ...formValues, [name]: updatedInfo });
      }

      useEffect(() => {
        formSchema.isValid(formValues).then(valid => {
          setDisabled(!valid);
        });
      }, [formValues]);

return (
    <div className="form-container">
        <form>
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
    </div>

)
}



export default Form;