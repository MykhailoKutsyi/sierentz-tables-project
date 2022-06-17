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

export default function MainTable() {
  const Kyivska = data[0].Kyivska;
  const Odeska = data[1].Odeska;
  const Lvivska = data[2].Lvivska;

  function createData(name, region) {
    const firstX = region.G[2017].XX.value;
    const firstY = region.G[2017].YY.value;
    const firstZ = region.G[2017].ZZ.value;

    const secondX = region.G[2018].XX.value;
    const secondY = region.G[2018].YY.value;
    const secondZ = region.G[2018].ZZ.value;

    const thirdX = region.G[2019].XX.value;
    const thirdY = region.G[2019].YY.value;
    const thirdZ = region.G[2019].ZZ.value;

    const value = [
      firstX,
      firstY,
      firstZ,
      secondX,
      secondY,
      secondZ,
      thirdX,
      thirdY,
      thirdZ,
    ];
    return { name, value };
  }

  const rows = [
    createData('Kyivska', Kyivska),
    createData('Odeska', Odeska),
    createData('Lvivska', Lvivska),
  ];

  const handleClick = () => {
    window.open('popup', 'popup', 'width=1100,height=600');
  };

  return (
    <>
      <h1>Main Table</h1>
      <Paper sx={{ width: '100%' }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell rowSpan={2}>regions</TableCell>
                <TableCell colSpan={3} align="center">
                  2017
                </TableCell>
                <TableCell colSpan={3} align="center">
                  2018
                </TableCell>
                <TableCell colSpan={3} align="center">
                  2019
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>xx</TableCell>
                <TableCell>yy</TableCell>
                <TableCell>zz</TableCell>

                <TableCell>xx</TableCell>
                <TableCell>yy</TableCell>
                <TableCell>zz</TableCell>

                <TableCell>xx</TableCell>
                <TableCell>yy</TableCell>
                <TableCell>zz</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rows.map(row => {
                return (
                  <TableRow align="center" key={row.name}>
                    <TableCell component="th">{row.name}</TableCell>
                    <TableCell align="center" onClick={handleClick}>
                      {row.value[0]}
                    </TableCell>
                    <TableCell align="center" onClick={handleClick}>
                      {row.value[1]}
                    </TableCell>
                    <TableCell align="center" onClick={handleClick}>
                      {row.value[2]}
                    </TableCell>
                    <TableCell align="center" onClick={handleClick}>
                      {row.value[3]}
                    </TableCell>
                    <TableCell align="center" onClick={handleClick}>
                      {row.value[4]}
                    </TableCell>
                    <TableCell align="center" onClick={handleClick}>
                      {row.value[5]}
                    </TableCell>
                    <TableCell align="center" onClick={handleClick}>
                      {row.value[6]}
                    </TableCell>
                    <TableCell align="center" onClick={handleClick}>
                      {row.value[7]}
                    </TableCell>
                    <TableCell align="center" onClick={handleClick}>
                      {row.value[8]}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
