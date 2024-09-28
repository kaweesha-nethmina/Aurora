import React, { useState, useEffect } from 'react';
import useDutyRoaster from '../../hooks/Manager/useDutyRoaster'; // Adjust the path if needed
import { 
    TextField, 
    Button, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    CircularProgress, 
    Typography, 
    Paper 
} from '@mui/material';
import '../../components/Employee/DutyRoasterTab.css'; // Adjust the path if needed
// import SmokeEffect from '../../../core/components/effect/SmokeEffect';

interface DutyRoasterEntry {
    date: string;
    employeeName: string;
    shift: string;
}

const DutyRoasterTab: React.FC = () => {
    const { dutyRoaster, loading, error } = useDutyRoaster();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredDutyRoaster, setFilteredDutyRoaster] = useState<DutyRoasterEntry[]>([]);

    useEffect(() => {
        setFilteredDutyRoaster(
            dutyRoaster.filter(entry =>
                entry.employeeName.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, dutyRoaster]);

    return (
        <div className="roaster-container">
            {/* <SmokeEffect /> */}
            <Typography variant="h4" className="roaster-header">
                Duty Roaster
            </Typography>
            <div className="search-container">
                <TextField
                    label="Search by employee name..."
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                    style={{ marginRight: 8 }}
                />
                <Button 
                    variant="contained"
                    className='search-button' 
                    color="primary" 
                    onClick={() => setSearchQuery(searchQuery)}
                >
                    Search
                </Button>
            </div>
            {loading && <CircularProgress />}
            {error && <Typography color="error">Error: {error}</Typography>}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Employee</TableCell>
                            <TableCell>Shift</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredDutyRoaster.map((entry, index) => (
                            <TableRow key={index}>
                                <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
                                <TableCell>{entry.employeeName}</TableCell>
                                <TableCell>{entry.shift}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default DutyRoasterTab;
