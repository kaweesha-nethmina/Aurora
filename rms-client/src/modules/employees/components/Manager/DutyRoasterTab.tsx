import React, { useState, useEffect } from 'react';
import useDutyRoaster from '../../hooks/Manager/useDutyRoaster';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Button, 
    CircularProgress, 
    Alert, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogTitle, 
    TextField, 
    Select, 
    MenuItem, 
    InputLabel, 
    FormControl 
} from '@mui/material';
import '../../components/Manager/ManagerCss/DutyRoaster.css';

interface DutyRoasterEntry {
    _id: string;
    date: string;
    employeeName: string;
    shift: string;
}

const DutyRoasterTab: React.FC = () => {
    const { dutyRoaster, loading, error } = useDutyRoaster();
    const [filteredDutyRoaster, setFilteredDutyRoaster] = useState<DutyRoasterEntry[]>(dutyRoaster);
    const [searchQuery, setSearchQuery] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [newEntry, setNewEntry] = useState<DutyRoasterEntry>({
        _id: '',
        date: '',
        employeeName: '',
        shift: 'Morning',
    });
    
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState<DutyRoasterEntry | null>(null);

    useEffect(() => {
        setFilteredDutyRoaster(
            dutyRoaster.filter(entry =>
                entry.employeeName.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, dutyRoaster]);

    const handleUpdate = async () => {
        if (!selectedEntry) return;

        try {
            const response = await fetch(`http://localhost:5000/api/duty-roaster/${selectedEntry._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(selectedEntry),
            });
            if (!response.ok) {
                throw new Error('Failed to update duty roaster');
            }
            const updatedEntry = await response.json();
            console.log('Entry updated:', updatedEntry);

            setFilteredDutyRoaster(prevDutyRoaster =>
                prevDutyRoaster.map(entry =>
                    entry._id === updatedEntry._id ? updatedEntry : entry
                )
            );
            setShowUpdateForm(false);
            setSelectedEntry(null);
        } catch (error) {
            console.error('Error updating duty roaster:', error);
        }
    };

    const handleCreate = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/duty-roaster`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newEntry),
            });
            if (!response.ok) {
                throw new Error('Failed to create duty roaster');
            }
            const createdEntry: DutyRoasterEntry = await response.json();
            setFilteredDutyRoaster(prevDutyRoaster => [...prevDutyRoaster, createdEntry]);
            setShowForm(false);
            setNewEntry({ _id: '', date: '', employeeName: '', shift: 'Morning' });
        } catch (error) {
            console.error('Error creating duty roaster:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:5000/api/duty-roaster/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete duty roaster');
            }

            setFilteredDutyRoaster(prevDutyRoaster =>
                prevDutyRoaster.filter(entry => entry._id !== id)
            );
        } catch (error) {
            console.error('Error deleting duty roaster:', error);
        }
    };

    return (
        <div className="roaster-containerM">
            <h2 className="roaster-header">Duty Roaster</h2>
            <div className="search-container1">
                <TextField
                    variant="outlined"
                    placeholder="Search by employee name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input1"
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setSearchQuery(searchQuery)}
                >
                    Search
                </Button>
            </div>

            <Button variant="contained" color="success" onClick={() => setShowForm(true)}>
                Create Duty Roaster
            </Button>

            {/* Create Duty Roaster Modal */}
            <Dialog open={showForm} onClose={() => setShowForm(false)}>
                <DialogTitle>Create New Duty Roaster</DialogTitle>
                <DialogContent>
                    <TextField
                        type="date"
                        value={newEntry.date}
                        onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        type="text"
                        placeholder="Employee Name"
                        value={newEntry.employeeName}
                        onChange={(e) => setNewEntry({ ...newEntry, employeeName: e.target.value })}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="shift-select-label">Shift</InputLabel>
                        <Select
                            labelId="shift-select-label"
                            value={newEntry.shift}
                            onChange={(e) => setNewEntry({ ...newEntry, shift: e.target.value })}
                        >
                            <MenuItem value="Morning">Morning</MenuItem>
                            <MenuItem value="Evening">Evening</MenuItem>
                            <MenuItem value="Night">Night</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowForm(false)}>Cancel</Button>
                    <Button onClick={handleCreate} color="primary">Create</Button>
                </DialogActions>
            </Dialog>

            {/* Update Duty Roaster Modal */}
            <Dialog open={showUpdateForm} onClose={() => setShowUpdateForm(false)}>
                <DialogTitle>Update Duty Roaster</DialogTitle>
                <DialogContent>
                    {selectedEntry && (
                        <>
                            <TextField
                                type="text"
                                value={selectedEntry.employeeName}
                                onChange={(e) => setSelectedEntry({ ...selectedEntry, employeeName: e.target.value })}
                                required
                                fullWidth
                                margin="normal"
                            />
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="shift-select-label">Shift</InputLabel>
                                <Select
                                    labelId="shift-select-label"
                                    value={selectedEntry.shift}
                                    onChange={(e) => setSelectedEntry({ ...selectedEntry, shift: e.target.value })}
                                >
                                    <MenuItem value="Morning">Morning</MenuItem>
                                    <MenuItem value="Evening">Evening</MenuItem>
                                    <MenuItem value="Night">Night</MenuItem>
                                </Select>
                            </FormControl>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowUpdateForm(false)}>Cancel</Button>
                    <Button onClick={handleUpdate} color="primary">Update</Button>
                </DialogActions>
            </Dialog>

            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Employee</TableCell>
                            <TableCell>Shift</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredDutyRoaster.map((entry) => (
                            <TableRow key={entry._id}>
                                <TableCell>{new Date(entry.date).toLocaleDateString()}</TableCell>
                                <TableCell>{entry.employeeName}</TableCell>
                                <TableCell>{entry.shift}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => {
                                            setSelectedEntry(entry);
                                            setShowUpdateForm(true);
                                        }}
                                    >
                                        View
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        onClick={() => handleDelete(entry._id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default DutyRoasterTab;
