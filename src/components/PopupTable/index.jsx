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
import { useGlobalState } from 'hooks/hooks';

export default function PopupTable() {
  const { formStyles, tableCellStyles, buttonsBlockStyles } = useStyles();

  const [rows, setRows] = React.useState([
    {
      id: 1,
      value: '20000',
      date: '2022-6-16',
      user: 'Mango',
      comment: 'Good price',
    },
    {
      id: 2,
      value: '30000',
      date: '2022-6-16',
      user: 'Mango',
      comment: 'Price up',
    },
  ]);

  const specificationArray = ['Value', 'Date', 'User', 'Comment'];
  const usersArray = ['Alona', 'Mykhailo', 'Yelyzaveta', 'Max'];

  const [data, setData] = useGlobalState('data', []);
  const [targetCell, setTargetCel] = useGlobalState('targetCell', []);

  const handleSubmit = value => {
    const alphabetValue = targetCell.alphabetValue;
    const region = targetCell.region;
    const year = targetCell.year;
    data[region].G[year][alphabetValue].value = value;
  };

  async function onSubmitForm(values, actions) {
    handleSubmit(values.value);
    await actions.setSubmitting(false);

    const today = new Date();
    values.date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    setRows(prevState => [...prevState, values]);
    actions.resetForm();
  }

  const popupTableForm = (
    <Formik
      initialValues={{
        id: nanoid(5),
        value: '',
        date: null,
        user: '',
        comment: '',
      }}
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
      {({
        handleSubmit,
        isSubmitting,
        values,
        handleChange,
        errors,
        touched,
      }) => (
        <form onSubmit={handleSubmit} className={formStyles}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {specificationArray.map(specValue => (
                    <TableCell align="center" key={nanoid(5)}>
                      {specValue}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.map(({ value, date, user, comment }) => (
                  <TableRow key={nanoid(5)}>
                    <TableCell align="center" className={tableCellStyles}>
                      {value}
                    </TableCell>
                    <TableCell align="center" className={tableCellStyles}>
                      {date}
                    </TableCell>
                    <TableCell align="center" className={tableCellStyles}>
                      {user}
                    </TableCell>
                    <TableCell align="center" className={tableCellStyles}>
                      {comment}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow align="center">
                  <TableCell align="center">
                    <TextField
                      id="value"
                      disabled={isSubmitting}
                      value={values.value}
                      onChange={handleChange}
                      type="text"
                      required
                    />
                    {touched.value && errors.value ? (
                      <div>{errors.value}</div>
                    ) : null}
                  </TableCell>

                  <TableCell align="center">Date (today)</TableCell>

                  <TableCell className={tableCellStyles}>
                    <Select
                      labelId="user-label"
                      id="user"
                      name="user"
                      value={values.user}
                      label="user"
                      onChange={handleChange}
                      required
                      className={tableCellStyles}
                    >
                      {usersArray.map(user => (
                        <MenuItem value={user} key={nanoid(5)}>
                          {user}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>

                  <TableCell>
                    <TextField
                      id="comment"
                      disabled={isSubmitting}
                      value={values.comment}
                      onChange={handleChange}
                      type="text"
                    />
                    {touched.comment && errors.comment ? (
                      <div>{errors.comment}</div>
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
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {isSubmitting ? 'Adding...' : 'Add'}
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );

  return (
    <React.Fragment>
      <h1>Popup Table</h1>
      <Paper>{popupTableForm}</Paper>
    </React.Fragment>
  );
}
