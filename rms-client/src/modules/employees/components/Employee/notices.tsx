import React, { useState, useEffect } from 'react';
import { fetchNotices } from '../../services/Manager/noticeService';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  CircularProgress,
  Alert,
  Container,
} from '@mui/material';

const EmployeeNoticesTab: React.FC = () => {
  const [notices, setNotices] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotices = async () => {
      try {
        const data = await fetchNotices();
        setNotices(data);
      } catch (error) {
        console.error('Failed to fetch notices:', error);
        setError('Failed to fetch notices');
      } finally {
        setLoading(false);
      }
    };
    loadNotices();
  }, []);

  return (
    <Container style={{ marginTop: '80px' }}> {/* Adjust this margin to the height of your header */}
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {notices.length === 0 && !loading && (
        <Typography>No notices available</Typography>
      )}
      {notices.length > 0 && (
        <List>
          {notices.map((notice) => (
            <ListItem key={notice._id} disableGutters>
              <Card
                style={{
                  width: '100%',
                  marginBottom: '15px',
                  borderRadius: '10px',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                }}
              >
                <CardContent>
                  <Typography variant="h6" component="h3" noWrap>
                    {notice.title}
                  </Typography>
                  <Typography variant="body2">
                    {notice.description}
                  </Typography>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default EmployeeNoticesTab;
