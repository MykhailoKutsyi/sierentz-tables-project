import * as React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import dataFromJson from './testData.json';
import { useGlobalState } from 'hooks/hooks';
import { nanoid } from 'nanoid';

export default function MainTable() {
  const [data, setData] = useGlobalState('data', []);
  const [targetCell, setTargetCel] = useGlobalState('targetCell', []);

  React.useEffect(() => {
    setData(dataFromJson);
  }, []);

  const yearsArray = [];
  const alphabetArray = [];

  const handleClick = pathValues => {
    setTargetCel(pathValues);
    window.open('popup', 'popup', 'width=1100,height=600');
  };

  const handleAddArray = (array, element) => {
    array.indexOf(element) === -1 && array.push(element);
  };

  const handleFillArray = () => {
    Object.values(data).map(values =>
      Object.values(values).map(value =>
        Object.entries(value).map(([year, yearValues]) => {
          handleAddArray(yearsArray, year);
          Object.entries(yearValues).map(([alphabet]) =>
            handleAddArray(alphabetArray, alphabet)
          );
        })
      )
    );
  };
  handleFillArray();

  return (
    <React.Fragment>
      <h1>Main Table</h1>
      <Paper sx={{ width: '100%' }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell rowSpan={2} align="center">
                  Regions
                </TableCell>
                {yearsArray.map(year => (
                  <TableCell
                    key={nanoid(5)}
                    colSpan={alphabetArray.length}
                    align="center"
                  >
                    {year}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow>
                {yearsArray.map(() =>
                  alphabetArray.map(alphabetValue => (
                    <React.Fragment key={nanoid(5)}>
                      <TableCell align="center">{alphabetValue}</TableCell>
                    </React.Fragment>
                  ))
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {Object.entries(data).map(([region, values]) => (
                <TableRow key={nanoid(5)}>
                  <TableCell align="center">{region}</TableCell>
                  {yearsArray.map(year =>
                    alphabetArray.map(alphabet => (
                      <TableCell
                        key={nanoid(5)}
                        align="center"
                        onClick={() =>
                          values?.G[year]?.[alphabet] &&
                          handleClick({ region, year, alphabet })
                        }
                        sx={{
                          cursor: 'pointer',
                          '&:hover': {
                            background: '#8fc9f0',
                          },
                        }}
                      >
                        {values?.G[year]?.[alphabet]?.value ?? '0*'}
                      </TableCell>
                    ))
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p> * - Can't edit this value</p>
        </TableContainer>
      </Paper>
    </React.Fragment>
  );
}
