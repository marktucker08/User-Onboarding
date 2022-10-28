import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Yup from 'yup';




function Form () {

    const [formValues, setFormValues] = useState({
        fname: '', lname: '', email: '', terms: false, 
    })

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

// changeHandler



return (
    <div class="form-container">
        <form>
            <label>First Name:
                <input type="text" name="fname" value="" placeholder='First Name'></input>
            </label>
            <label>Last Name:
                <input type="text" name="lname" value="" placeholder='Last Name'></input>
            </label>
            <label>Email:
                <input type="text" name="email" value="" placeholder='Email'></input>
            </label>
            <label>
                Do you agree to the Terms of Service?
                <input id="termsInput" type="checkbox" name="terms" />
            </label>

            <button>Add User!</button>
        </form>
    </div>

)
}



export default Form;