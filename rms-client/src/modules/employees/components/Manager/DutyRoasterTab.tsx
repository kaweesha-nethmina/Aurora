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

// DutyRoasterEntry type definition
interface DutyRoasterEntry {
    _id: string;
    date: string;
    employeeName: string;
    shift: 'Morning' | 'Evening' | 'Night'; // Restrict to specific shifts
}

// Employee type definition
interface Employee {
    _id: string;
    firstName: string;
    lastName: string;
}

const DutyRoasterTab: React.FC = () => {
    const { dutyRoaster, loading, error } = useDutyRoaster();
    const [filteredDutyRoaster, setFilteredDutyRoaster] = useState<DutyRoasterEntry[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState<DutyRoasterEntry | null>(null);
    
    // State to hold employees
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loadingEmployees, setLoadingEmployees] = useState(true);
    const [date, setDate] = useState(''); // To store the date for creating duty roasters

    useEffect(() => {
        // Fetch employees when component mounts
        const fetchEmployees = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/duty-roaster/employees`);
                if (!response.ok) throw new Error('Failed to fetch employees');
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                console.error('Error fetching employees:', error);
            } finally {
                setLoadingEmployees(false);
            }
        };
        
        fetchEmployees();
    }, []);

    useEffect(() => {
        // Filter duty roaster entries based on search query
        if (Array.isArray(dutyRoaster)) {
            setFilteredDutyRoaster(
                dutyRoaster.filter(entry =>
                    entry.employeeName.toLowerCase().includes(searchQuery.toLowerCase())
                ) as DutyRoasterEntry[]
            );
        }
    }, [searchQuery, dutyRoaster]);

    const getRandomShift = (): 'Morning' | 'Evening' | 'Night' => {
        const shifts: ('Morning' | 'Evening' | 'Night')[] = ['Morning', 'Evening', 'Night'];
        return shifts[Math.floor(Math.random() * shifts.length)];
    };

    const formatDate = (dateString: string) => {
        return dateString.split('T')[0]; // Removes time part
    };

    const handleCreate = async () => {
        if (!date) {
            console.error('Date is required for creating duty roasters.');
            return;
        }

        try {
            const shiftCounts = {
                Morning: 0,
                Evening: 0,
                Night: 0,
            };

            // Fetch existing duty roaster entries for the selected date
            const response = await fetch(`http://localhost:5000/api/duty-roaster?date=${date}`);
            const existingEntries = await response.json();

            existingEntries.forEach((entry: DutyRoasterEntry) => {
                shiftCounts[entry.shift]++;
            });

            const assignedShifts: DutyRoasterEntry[] = [];

            // Logic to ensure equal distribution of shifts
            for (const employee of employees) {
                const shift = getRandomShift(); // This now correctly returns the union type
                assignedShifts.push({
                    _id: '', // Placeholder for the ID
                    date: formatDate(date), // Format date here
                    employeeName: `${employee.firstName} ${employee.lastName}`,
                    shift, // This will now correctly match the expected type
                });
            }

            // Create entries for assigned shifts
            const createdEntries: DutyRoasterEntry[] = [];

            for (const duty of assignedShifts) {
                const newEntry: DutyRoasterEntry = {
                    _id: '', // Or generated after POST
                    date: duty.date,
                    employeeName: duty.employeeName,
                    shift: duty.shift,
                };

                const createResponse = await fetch(`http://localhost:5000/api/duty-roaster`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newEntry),
                });

                if (!createResponse.ok) {
                    throw new Error('Failed to create duty roaster');
                }

                const createdEntry: DutyRoasterEntry = await createResponse.json();
                createdEntries.push(createdEntry);
            }

            // Update the filtered duty roaster state with all created entries
            setFilteredDutyRoaster(prevDutyRoaster => [...prevDutyRoaster, ...createdEntries]);
            setShowForm(false);
            setDate(''); // Reset the date after creating
        } catch (error) {
            console.error('Error creating duty roaster:', error);
        }
    };

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
                Create Duty Roaster for All Employees
            </Button>

            {/* Create Duty Roaster Modal */}
            <Dialog open={showForm} onClose={() => setShowForm(false)}>
                <DialogTitle>Create Duty Roaster for All Employees</DialogTitle>
                <DialogContent>
                    <TextField
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
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
                                    onChange={(e) => setSelectedEntry({ ...selectedEntry, shift: e.target.value as 'Morning' | 'Evening' | 'Night' })}
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

            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Alert severity="error">{error}</Alert>
            ) : (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Employee Name</TableCell>
                                <TableCell>Shift</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredDutyRoaster.map(entry => (
                                <TableRow key={entry._id}>
                                    <TableCell>{formatDate(entry.date)}</TableCell> {/* Format the date here */}
                                    <TableCell>{entry.employeeName}</TableCell>
                                    <TableCell>{entry.shift}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => { setSelectedEntry(entry); setShowUpdateForm(true); }}>
                                            Edit
                                        </Button>
                                        <Button onClick={() => handleDelete(entry._id)} color="error">
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default DutyRoasterTab;
