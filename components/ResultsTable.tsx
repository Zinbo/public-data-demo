import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import {visuallyHidden} from '@mui/utils';
import {TestCentreWithDistance} from "../lib/TestCentre";
import {Tooltip} from "@mui/material";
import HelpIcon from '@mui/icons-material/HelpOutline';
import MapIcon from '@mui/icons-material/Map';

interface Data {
    name: string
    passRate: number
    rating: string
    distance: number
    mapURL: string
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Test Centre',
    },
    {
        id: 'passRate',
        numeric: true,
        disablePadding: true,
        label: 'Pass Rate',
    },
    {
        id: 'rating',
        numeric: true,
        disablePadding: true,
        label: 'Rating'
    },
    {
        id: 'distance',
        numeric: true,
        disablePadding: true,
        label: 'Distance (miles)',
    }
];

interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const {order, orderBy, onRequestSort} =
        props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) =>
                    (<TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label !== 'Rating' ?
                                    headCell.label : <>{'Rating'} <Tooltip
                                        title="Ratings from Google"><HelpIcon sx={{ml: 1}}/></Tooltip></>}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
            </TableRow>
        </TableHead>
    );
}

interface ResultsTableProps {
    results: TestCentreWithDistance[]
}

export default function ResultsTable({results}: ResultsTableProps) {
    const [order, setOrder] = React.useState<Order>('desc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('passRate');

    const r = results.map(result => {
        return {
            name: result.name, passRate: result.passRate,
            rating: result.mapDetails.rating ? `${result.mapDetails.rating}⭐ (${result.mapDetails.userRatingsTotal} reviews)` : ``,
            mapURL: result.mapDetails.url,
            distance: result.distance
        };
    })

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table
                    size={"medium"}
                    aria-labelledby="tableTitle"
                    style={{ tableLayout: 'auto' }}
                    padding={'normal'}

                >
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={results.length}
                    />
                    <TableBody>
                        {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
                        {stableSort(r, getComparator(order, orderBy))
                            .map((row) => {
                                return (
                                    <TableRow
                                        hover
                                        tabIndex={-1}
                                        key={row.name}
                                    >
                                        <TableCell>{row.name}<MapIcon onClick={() => window.open(row.mapURL)}/></TableCell>
                                        <TableCell align="right">{row.passRate}%</TableCell>
                                        <TableCell align="right">{row.rating}</TableCell>
                                        <TableCell
                                            align="right">{Math.round((row.distance + Number.EPSILON) * 100) / 100}</TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
