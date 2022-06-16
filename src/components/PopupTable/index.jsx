import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Button,
  Input,
  InputLabel,
} from '@mui/material';

import { makeStyles } from '@mui/styles';
import users from './users.json';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

export default function PopupTable() {
  const useStyles = makeStyles(() => ({
    formGroupStyles: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    boxInput: {
      marginBottom: '50px',
      width: '375px',
      height: '60px',
      background: 'rgba(0, 0, 0, 0.09)',
      padding: '0px 12px',
      backgroundColor: 'rgba(0, 0, 0, 0.09)',
      borderRadius: '4px 4px 0px 0px',
    },
    inputLabelStyles: {
      marginTop: '9px',
      fontSize: '12px',
      letterSpacing: '0.15px',
    },
    buttonSubmitStyles: {
      width: '375px',
      height: '40px',
      backgroundColor: '#F50057',
      color: '#fff',
      borderRadius: '4px',
      boxShadow:
        '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)',
      '&:hover': {
        background: '#F50057',
        color: '#fff',
      },
    },
  }));
  const { formGroupStyles, boxInput, inputLabelStyles, buttonSubmitStyles } =
    useStyles();

  const [params, setParams] = useState(false);

  console.log(users);

  function createData(value, date, user, comment) {
    return { value, date, user, comment };
  }

  const rows = [createData(1, '2022-06-16', 'Mango', 'online')];
  console.log(rows);
  async function onSubmitForm(values, actions) {
    console.log('values', values.user);
    console.log('submit');
    await actions.setSubmitting(false);

    const today = new Date();
    const date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    const value = values.value;

    const user = values.user;
    const comment = values.comment;

    rows.push({ value, date, user, comment });
    setParams(true);
    console.log(params);
    console.log(rows);
    values.value = '';
  }
  const addInfo = (
    <Formik
      initialValues={{ value: '', user: '', comment: '' }}
      validationSchema={Yup.object({
        value: Yup.number()
          .min(1, 'Must be more than 1 characters')
          .required('Requried'),
        user: Yup.string()
          .min(3, 'Must be 3 characters or more')
          .required('Required'),
      })}
      onSubmit={onSubmitForm}
    >
      {formik => (
        <form onSubmit={formik.handleSubmit} className={formGroupStyles}>
          <Box className={boxInput}>
            <InputLabel htmlFor="value" className={inputLabelStyles}>
              Value
            </InputLabel>
            <Input
              id="value"
              disabled={formik.isSubmitting}
              value={formik.values.values}
              onChange={formik.handleChange}
              fullWidth
              type="text"
              disableUnderline
              required
            />
            {formik.touched.value && formik.errors.value ? (
              <div>{formik.errors.value}</div>
            ) : null}
          </Box>

          <Box className={boxInput}>Date</Box>

          <Box className={boxInput}>
            <InputLabel htmlFor="user" className={inputLabelStyles}>
              User
            </InputLabel>
            <Input
              id="user"
              disabled={formik.isSubmitting}
              value={formik.values.user}
              onChange={formik.handleChange}
              fullWidth
              type="text"
              disableUnderline
              required
            />
            {formik.touched.user && formik.errors.user ? (
              <div>{formik.errors.user}</div>
            ) : null}
          </Box>

          <Box className={boxInput}>
            <InputLabel htmlFor="comment" className={inputLabelStyles}>
              Comment
            </InputLabel>
            <Input
              id="comment"
              disabled={formik.isSubmitting}
              value={formik.values.comment}
              onChange={formik.handleChange}
              fullWidth
              type="text"
              disableUnderline
            />
            {formik.touched.comment && formik.errors.comment ? (
              <div>{formik.errors.comment}</div>
            ) : null}
          </Box>

          <Button
            type="submit"
            className={buttonSubmitStyles}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? 'Submiting...' : 'Submit'}
          </Button>
        </form>
      )}
    </Formik>
  );
  return (
    <>
      <h1>Popup Table</h1>

      <Paper sx={{ width: '100%' }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Value</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">User</TableCell>
                <TableCell align="center">Commect</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map(row => (
                <TableRow align="center" key={row.date}>
                  <TableCell align="center">{row.value}</TableCell>
                  <TableCell align="center">{row.date}</TableCell>
                  <TableCell align="center">{row.user}</TableCell>
                  <TableCell align="center">{row.comment}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {addInfo}
    </>
  );
}
PopupTable.propTypes = {
  onClose: PropTypes.func.isRequired,
  link: PropTypes.string.isRequired,
};
