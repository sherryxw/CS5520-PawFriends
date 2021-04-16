import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../Demand components/controls/Controls.js";
import { useForm, Form } from "../../Demand components/useForm.js";
import * as employeeService from "src/pages/Demand/employeeService.js";

const drivetrainItems = [
  { id: "allwheeldrive", title: "All-Wheel Drive" },
  { id: "frontwheeldrive", title: "Front-Wheel Drive" },
  { id: "rearwheeldrive", title: "Rear-Wheel Drive" },
];

const initialFValues = {
  id: 0,
  carMake: "",
  carModel: "",
  year: "",
  zip: "",
  mileage: "",
  drivetrain: "",
  radius: "",
  trim: "",
  color: "",
  price: "",
  comment: "",
  vin: "",
  isCorrect: false,
};

export default function EmployeeForm() {
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("carMake" in fieldValues)
      temp.carMake = fieldValues.carMake ? "" : "This field is required.";
    if ("carModel" in fieldValues)
      temp.carModel = fieldValues.carModel ? "" : "This field is required.";
    if ("zip" in fieldValues)
      temp.zip =
        fieldValues.zip.length > 4 ? "" : "Minimum 5 numbers required.";
    if ("mileage" in fieldValues)
      temp.mileage = fieldValues.mileage ? "" : "This field is required.";
    if ("price" in fieldValues)
      temp.price = fieldValues.price ? "" : "This field is required.";
    if ("year" in fieldValues)
      temp.year =
        fieldValues.year.length > 3 ? "" : "Minimum 4 numbers required.";
    if ("radius" in fieldValues)
      temp.radius =
        fieldValues.radius.length != 0 ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      employeeService.insertEmployee(values);
      resetForm();
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          <Controls.Input
            name='carMake'
            label='Car Make'
            value={values.carMake}
            onChange={handleInputChange}
            error={errors.carMake}
          />
          <Controls.Input
            label='Car Model'
            name='carModel'
            value={values.carModel}
            onChange={handleInputChange}
            error={errors.carModel}
          />
          <Controls.Input
            label='Year'
            name='year'
            value={values.year}
            onChange={handleInputChange}
            error={errors.year}
          />
          <Controls.Input
            label='Mileage'
            name='mileage'
            value={values.mileage}
            onChange={handleInputChange}
            error={errors.mileage}
          />
          <Controls.Select
            name='radius'
            label='Radius'
            value={values.radius}
            onChange={handleInputChange}
            options={employeeService.getRadiusCollection()}
            error={errors.radius}
          />
          <Controls.Input
            label='Zip'
            name='zip'
            value={values.zip}
            onChange={handleInputChange}
            error={errors.zip}
          />
          <Controls.Input
            label='Out-the-door price'
            name='price'
            value={values.price}
            onChange={handleInputChange}
            error={errors.price}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.RadioGroup
            name='drivetrain'
            label='Drivetrain'
            value={values.drivetrain}
            onChange={handleInputChange}
            items={drivetrainItems}
          />
          <Controls.Input
            label='Trim(Optional)'
            name='trim'
            value={values.trim}
            onChange={handleInputChange}
          />
          <Controls.Input
            label='Color(Optional)'
            name='color'
            value={values.color}
            onChange={handleInputChange}
          />
          <Controls.Input
            label='VIN(Optional)'
            name='vin'
            value={values.vin}
            onChange={handleInputChange}
          />
          <Controls.Input
            label='Comment Box(Additional Details)'
            name='comment'
            value={values.comment}
            onChange={handleInputChange}
          />
          <Controls.Checkbox
            name='isCorrect'
            label='Once submitted, it cannot be modified.'
            value={values.isCorrect}
            onChange={handleInputChange}
          />
          <div>
            <Controls.Button type='submit' text='Submit' />
            <Controls.Button
              text='Cancel'
              color='default'
              onClick={resetForm}
            />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
