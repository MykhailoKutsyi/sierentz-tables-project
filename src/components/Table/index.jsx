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
import data from './testData.json';
import { nanoid } from 'nanoid';

export default function MainTable() {
  const yearsArray = ['2017', '2018', '2019'];
  const alphabetArray = ['XX', 'YY', 'ZZ'];

  const handleClick = () => {
    window.open('popup', 'popup', 'width=1100,height=600');
  };

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
                {yearsArray.map(year => {
                  return (
                    <TableCell
                      key={nanoid(5)}
                      colSpan={alphabetArray.length}
                      align="center"
                    >
                      {year}
                    </TableCell>
                  );
                })}
              </TableRow>

              <TableRow>
                {yearsArray.map(() => {
                  return alphabetArray.map(alphabetValue => {
                    return (
                      <React.Fragment key={nanoid(5)}>
                        <TableCell align="center">{alphabetValue}</TableCell>
                      </React.Fragment>
                    );
                  });
                })}
              </TableRow>
            </TableHead>

            <TableBody>
              {Object.entries(data).map(([region, values]) => {
                return (
                  <TableRow key={nanoid(5)}>
                    <TableCell align="center">{region}</TableCell>
                    {yearsArray.map(year => {
                      const yearValues = values.G[year];
                      return alphabetArray.map(alphabetValue => {
                        return (
                          <TableCell
                            key={nanoid(5)}
                            align="center"
                            onClick={handleClick}
                          >
                            {yearValues?.[alphabetValue]?.value ?? 0}
                          </TableCell>
                        );
                      });
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </React.Fragment>
  );
}
