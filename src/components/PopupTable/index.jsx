import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  Select,
  MenuItem,
} from '@mui/material';
import useStyles from './styles';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { nanoid } from 'nanoid';

export default function PopupTable() {
  const { formStyles, tableCellStyles, buttonsBlockStyles } = useStyles();

  function createData(value, date, user, comment) {
    return { value, date, user, comment };
  }

  const rows = [createData(1, '2022-6-16', 'Mango', 'online')];

  async function onSubmitForm(values, actions) {
    await actions.setSubmitting(false);
    const today = new Date();
    values.date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();

    rows.push(values);
    actions.resetForm();
  }

  const popupTableForm = (
    <Formik
      initialValues={{ value: '', date: null, user: '', comment: '' }}
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
        <form onSubmit={formik.handleSubmit} className={formStyles}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Value</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">User</TableCell>
                  <TableCell align="center">Comment</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.map(row => {
                  return (
                    <TableRow key={nanoid(5)}>
                      <TableCell align="center" className={tableCellStyles}>
                        {row.value}
                      </TableCell>
                      <TableCell align="center" className={tableCellStyles}>
                        {row.date}
                      </TableCell>
                      <TableCell align="center" className={tableCellStyles}>
                        {row.user}
                      </TableCell>
                      <TableCell align="center" className={tableCellStyles}>
                        {row.comment}
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow align="center">
                  <TableCell align="center">
                    <TextField
                      id="value"
                      disabled={formik.isSubmitting}
                      value={formik.values.values}
                      onChange={formik.handleChange}
                      type="text"
                      required
                    />
                    {formik.touched.value && formik.errors.value ? (
                      <div>{formik.errors.value}</div>
                    ) : null}
                  </TableCell>
                  <TableCell align="center">Date (today)</TableCell>

                  <TableCell className={tableCellStyles}>
                    <Select
                      labelId="user-label"
                      id="user"
                      name="user"
                      value={formik.values.user}
                      label="user"
                      onChange={formik.handleChange}
                      required
                      className={tableCellStyles}
                    >
                      <MenuItem value={'Alona'}>Alona</MenuItem>
                      <MenuItem value={'Mykhailo'}>Mykhailo</MenuItem>
                      <MenuItem value={'Yelyzaveta'}>Yelyzaveta</MenuItem>
                    </Select>
                  </TableCell>

                  <TableCell>
                    <TextField
                      id="comment"
                      disabled={formik.isSubmitting}
                      value={formik.values.comment}
                      onChange={formik.handleChange}
                      type="text"
                    />
                    {formik.touched.comment && formik.errors.comment ? (
                      <div>{formik.errors.comment}</div>
                    ) : null}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div className={buttonsBlockStyles}>
            <Button
              variant="contained"
              sx={{ marginBottom: '20px' }}
              onClick={() => window.close()}
            >
              Close
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Adding...' : 'Add'}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
  return (
    <>
      <h1>Popup Table</h1>

      <Paper>{popupTableForm}</Paper>
    </>
  );
}
