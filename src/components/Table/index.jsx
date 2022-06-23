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

  const yearsArray = ['2017', '2018', '2019'];
  const alphabetArray = ['XX', 'YY', 'ZZ'];

  const handleClick = pathValues => {
    setTargetCel(pathValues);
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
                    alphabetArray.map(alphabetValue => (
                      <TableCell
                        key={nanoid(5)}
                        align="center"
                        onClick={() =>
                          handleClick({ region, year, alphabetValue })
                        }
                        sx={{
                          cursor: 'pointer',
                          '&:hover': {
                            background: '#8fc9f0',
                          },
                        }}
                      >
                        {values?.G[year]?.[alphabetValue]?.value ?? 0}
                      </TableCell>
                    ))
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </React.Fragment>
  );
}
