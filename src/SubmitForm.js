import React from 'react';
import { useState } from 'react';
import formData from "./formData.json";
import PropTypes from 'prop-types';

SubmitForm.propTypes = {
    name: PropTypes.string
}

export default function SubmitForm(props) {

    const [name, setName] = useState("");
    const [male, setMale] = useState("male");
    const [female, setFemale] = useState("female");
    const [food, setFood] = useState("food");
    const [value, setValue] = useState("value");

    const handleChange = (e, field) => {
        if (field.type === "Input") {
            setValue(e.target.value);
        }
        if (field.type === "Radio") {
            setValue(e.target.value);
        }
        if (field.type === "Dropdown") {
            setValue(e.target.value);
        }
    }

    // const handleChangeRadio = (e) => {
    //     setMale(e.target.value);
    //     setFemale(e.target.value);
    // }

    // const handleChangeDropdown = (e) => {
    //     setFood(e.target.value);
    // }

    const submitForm = () => {
        // if(props.data.fields.name && )

        if (value !== "") {
            alert("Successfully submitted")
        }
        else {
            alert('fcwrf')
        }
    }

    return (
        <form style={{ margin: '2rem' }}  onSubmit="submitForm()">
            <h2>{props.data.name}</h2>
            {props.data.fields.map((field, index) => {
                return (
                    <div>

                        <label>{field.name} : </label>
                        {field.type === "Input" ?
                            <input type={field.type.toLowerCase()} onChange={(e) => handleChange(e, field)} defaultValue="" required={field.isMandatory} maxLength={field.max}></input>
                            : field.type === "Radio" ?
                                <span>
                                    <input type={field.type.toLowerCase()} id="male" name="gender" value="male" required={field.isMandatory} onchange={(e) => handleChange(e, field)} checked={{ male } ? true : false}></input>
                                    <label>Male</label>
                                    <input type={field.type.toLowerCase()} id="female" name="gender" value="female" required={field.isMandatory} onchange={(e) => handleChange(e, field)} checked={{ female } ? true : false}></input>
                                    <label>Female</label><br /><br />
                                </span>
                                :
                                <span>
                                    <select name="food" id="food" value={food} required={field.isMandatory}>
                                        <option value="pizza">Pizza</option>
                                        <option value="burger">Burger</option>
                                        <option value="khichdi">Khichdi</option>
                                    </select>
                                </span>}
                    </div>
                )
            })}

            <input type="submit" style={{ marginTop:'1rem' ,padding: '0.5rem', fontWeight: 'bold', backgroundColor: 'white' }}/>
        </form>
    )
}