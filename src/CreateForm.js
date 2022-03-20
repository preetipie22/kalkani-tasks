import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import SubmitForm from './SubmitForm';

export default function CreateForm(props) {

    const [formData, setFormData] = useState("");
    const [data, setData] = useState(null);
    const [submit, setSubmit] = useState(false);
    const [error, setError] = useState("");

    const handleData = (e) => {
        setFormData(e.target.value);
    }

    const createFormBtn = (e) => {
        try {
            const jsonObject = JSON.parse(formData);
            setData(jsonObject);

        } catch (e) {
            setError(e.message);
        }
    }

    const validateData = async() => {
        const validateFormName = await isFormNameValid();
        const validateFormField = await isFormFieldValid();
        const validateFieldType = await isFieldTypeValid();
        // const validateIsMandatory = await isMandatoryValid();
        // const validateInputLength = await isInputLengthValid();
        const validateFieldName = await isFieldNameValid();

        let errorMessage = "";
        if(!errorMessage && validateFormName){
            errorMessage = "Form name is mandatory";
        }
        if(!errorMessage && validateFormField){
            errorMessage = "Form field should be mandatory";
        }
        if(!errorMessage && validateFieldType){
            errorMessage = "Field type should be Input, Radio or Dropdown";
        }
        // if(!errorMessage && validateIsMandatory){
        //     errorMessage = "Field is mandatory";
        // }
        // if(!errorMessage && validateInputLength){
        //     errorMessage = "Input field length should be 200";
        // }
        if(!errorMessage && validateFieldName){
            errorMessage = "Field name is mandatory";
        }
        if(!errorMessage){
            setSubmit(true);
        } else {
            setError(errorMessage);
            setSubmit(false);
        }

       
    }


    useEffect(() => {
        if (data) {
            validateData();
        }
        if(error === "") {

        }
    }, [JSON.stringify(data), error]);

    const isFormNameValid = () => {
        if (data.name === undefined || data.name === "") {
            return true;
        }
        else {
            return false;
        }
    }

    const isFormFieldValid = () => {
        if (!Array.isArray(data.fields))  
        return true;
        else return false;
    }

    const isFieldTypeValid = () => {
        let isValidType = true;
        data.fields.forEach((element) => {
            if (element.type && (element.type === "Input" || element.type === "Radio" || element.type === "Dropdown")) {
                isValidType = false;
                return;
            }
        });
        return isValidType;
    }

    const isMandatoryValid = () => {
        let isMandatory = true;
        data.fields.forEach((element) => {
            if (element.isMandatory) {
                isMandatory = false;
                return;
            }
        });
        return isMandatory;
    }

    const isInputLengthValid = () => {
        let isInputLength = true;
        data.fields.forEach((element) => {
            if (element.max === 200 && element.type === "Input") {
                    isInputLength = false;
                    return;
            }
        });
        return isInputLength;
    }

    const isFieldNameValid = () => {
        let isFieldName = true;
        data.fields.forEach((element) => {
            if (element.name) {
                isFieldName = false;
                return;
            }
        });
        return isFieldName;
    }

    return (
        <div>
            {submit === false ?
                <div>
                    <textarea rows="40" cols="100" style={{ marginTop: '1rem' }}
                        onChange={handleData} defaultValue="">
                    </textarea><br />
                    {formData.trim() === "" ? <div>Please enter json</div> :
                        <div style={{ color: 'red' }}>{error}</div>}

                    <button style={{ marginLeft: '-40rem', padding: '0.5rem', fontWeight: 'bold', backgroundColor: 'white' }} onClick={() => createFormBtn(data)}>Create Form</button>
                </div>
                : <SubmitForm data={data} />}
        </div>
    )
}