import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// Manager Dashboard and Tabs
import ManagerDashboard from './modules/employees/ManagerDashboard';
import EmployeeListTab from './modules/employees/components/Manager/EmployeeListTab';
import LeaveRequestsTab from './modules/employees/components/Manager/LeaveRequestsTab';
import DutyRoasterTab from './modules/employees/components/Manager/DutyRoasterTab';
import AddEmployeeTab from './modules/employees/components/Manager/AddEmployeeTab';
import ChatTab from './modules/employees/components/Manager/ChatTab';
import ReportsTab from './modules/employees/components/Manager/ReportsTab';
import NoticesTab from './modules/employees/components/Manager/NoticesTab';

// Employee Dashboard and Tabs
import EmployeeDashboard from './modules/employees/EmployeeDashboard';
import ProfileTab from './modules/employees/components/Employee/ProfileTab';
import LeaveRequestsTabEmployee from './modules/employees/components/Employee/LeaveRequestsTab';
import DutyRoasterTabEmployee from './modules/employees/components/Employee/DutyRoasterTab';

// Other Modules
import Event from './modules/events/Event';
import Reservation from './modules/reservations/Reservation'; // Fixed typo
import Spa from './modules/spa/Spa';
import Guests from './modules/guests/Guests';
import Transport from './modules/transportation/Transportation'; // Fixed typo
// import Offers from './modules/offers/Offers';
import EmployeeNoticesTab from './modules/employees/components/Employee/notices';
import RoomBookingForm from './modules/reservations/components/RoomBookingForm';
import ProfileScreen from './modules/reservations/components/ProfileScreen';
import Navbar from './modules/reservations/components/Navbar';
import AddRoomForm from './modules/reservations/components/AddRoomForm';
import RoomTable from './modules/reservations/components/RoomTable';
import Reservationdetails from './modules/reservations/Reservationdetails';
import CancelBookingForm from './modules/reservations/components/CancelBookingForm';
import CancelBookingTable from './modules/reservations/components/CancelBookingTable';

import Restaurant from './modules/restuarent/restuarent/Restaurant';
import Menu from './modules/restuarent/restuarent/components/Menu/Menu';
// import HomePage from './modules/reservations/Homepage';
import ReserveTablePage from './modules/restuarent/restuarent/components/AcceptRejectBooking/ReserveTable';
import DrinksMenu from './modules/restuarent/restuarent/components/DrinksMenu/DrinksMenu';
import CancelTableBookingPage from './modules/restuarent/restuarent/components/CancelTableBookingPage/CancelTableBookingPage';
import MenuDetails from './modules/restuarent/restuarent/components/EditDeleteForm/MenuDetails';
import MenuReservation from './modules/restuarent/restuarent/components/Reservation/Reservation';
import ReservationDetailsPage from './modules/restuarent/restuarent/components/Reservation/ReservationDetailsPage';
import PaymentForm from './modules/restuarent/restuarent/components/Payment/PaymentForm';
import AdminCancelBookingTable from './modules/restuarent/restuarent/components/AdminCancelBookingTable/AdminCancelBookingTable';
import AboutUs from './modules/restuarent/restuarent/components/AboutUs/AboutUs';
import AddEditMenuItem from './modules/restuarent/restuarent/components/MenuForm/AddEditMenuItem';
import MenuHomePage from './modules/restuarent/restuarent/components/HomePage/HomePage';
import RManagerDashboard from './modules/restuarent/restuarent/components/Manager/RmanagerDashboard';
import AdminBookingsPage from './modules/transportation/components/adminBookingsPage';
import BookingForm from './modules/transportation/components/bookingForm';
import AdminVehiclePage from './modules/transportation/components/AdminVehiclePage';
import ManageDrivers from './modules/transportation/components/ManageDrivers';
import TransportBookings from './modules/transportation/components/TransportBookings';
import TManagerDashboard from './modules/transportation/components/ADMIN/TManagerDashboard';
import TManagerHeader from './modules/transportation/components/ADMIN/TManagerHeader';
import AddDriverForm from './modules/transportation/components/ADMIN/AddDriverForm';
import RoomManagerDashboard from './modules/reservations/components/RoomManager/RoomMDashboard';
import GuestProfileLoginPage from './modules/guests/components/GuestProfileLoginPage';
import AccountDetailsTable from './modules/guests/components/AccountDetailsTable';
import AdminView from './modules/guests/components/AdminView/AdminView';
import FeedbackRatingPage from './modules/guests/components/FeedbackRating/FeedbackRatingPage';
import AdminDashboard from './modules/guests/components/AdminDashboard/AdminDashboard';
import DisplayFeedbackPage from './modules/guests/components/DisplayFeedback/DisplayFeedbackPage';
import UserProfileComponent from './modules/guests/components/UserProfile/UserProfileComponent';
import GManagerDashboard from './modules/guests/components/Manager/GmanagerDashboard';
import AdminFeedbackManagement from './modules/guests/components/Manager/AdminFeedbackManagement';
import GAdminPage from './modules/guests/components/AdminPage/AdminPage';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Manager Routes */}
        <Route path='/hr' element={<ManagerDashboard />}>
          <Route path='employees' element={<EmployeeListTab />} />
          <Route path='leave-requests' element={<LeaveRequestsTab />} />
          <Route path='duty-roaster' element={<DutyRoasterTab />} />
          <Route path='add-employees' element={<AddEmployeeTab />} />
          <Route path='chat' element={<ChatTab />} />
          <Route path='reports' element={<ReportsTab />} />
          <Route path='notices' element={<NoticesTab />} />
        </Route>

        {/* Employee Routes */}
        <Route path='/staf' element={<EmployeeDashboard />}>
          <Route path='profile' element={<ProfileTab />} />
          <Route path='leave-requests' element={<LeaveRequestsTabEmployee />} />
          <Route path='duty-roaster' element={<DutyRoasterTabEmployee />} />
          <Route path='chat' element={<ChatTab />} />
          <Route path='notices' element={<EmployeeNoticesTab />} />
        </Route>
        
        {/* Other Routes */}
        <Route path='/event' element={<Event />} />
        
        
        <Route path='/restuarent' element={<Restaurant/>}/>
        <Route path="/menu" element={<Menu />} />
        <Route path="/menuhomepage" element={<MenuHomePage />} />
        <Route path="/drinks" element={<DrinksMenu/>} />
        <Route path="/cancelbooking" element={<CancelTableBookingPage/>} />
        <Route path="/form" element={<MenuReservation/>} />
        <Route path="/detailspage" element={<ReservationDetailsPage/>} />
        <Route path="/menupayment" element={<PaymentForm/>} />
        <Route path="/aboutus" element={<AboutUs/>} />
        <Route path="/reservation-details" element={<ReservationDetailsPage />} />

        <Route path="/Rmanager" element={<RManagerDashboard />}>
          <Route path="admincancel" element={<AdminCancelBookingTable />} />
          <Route path="editmenu" element={<MenuDetails />} />
          <Route path="addmenu" element={<AddEditMenuItem onSave={() => { /* your save logic */ }} />} />
          <Route path="tablereserve" element={<ReserveTablePage />} /> {/* Added route for Table Reserve */}
        </Route>







        {/* room Routes */}
        <Route path='/roomreservation' element={<Reservation />} />
        <Route path='/form' element={<RoomBookingForm />} />
        <Route path='/profilescreen' element={<ProfileScreen />} />
        <Route path='/navbar' element={<Navbar />} />
        <Route path='/cancelform' element={<CancelBookingForm/>} />
        

        <Route path="/roommanager" element={<RoomManagerDashboard />}>
          <Route path="addroom" element={<AddRoomForm />} />
          <Route path="roomdetails" element={<RoomTable />} />
          <Route path="reservations" element={<Reservationdetails />} />
          <Route path="cancelreservations" element={<CancelBookingTable />} />
          {/* <Route path="reports" element={<ReportsPage />} /> */}
        </Route>


        
        <Route path='/spa' element={<Spa />} />



      {/* Guest */}
      <Route path='/guests' element={<Guests />} />
        <Route path='/login' element={<GuestProfileLoginPage />} />
        <Route path='/loginDetails' element={<AccountDetailsTable />} />
        
        <Route path='/Feedbackrating' element={<FeedbackRatingPage/>}/>
        <Route path='/Adminpage' element={<GAdminPage/>}/>
        
        <Route path='/displayfeedback' element={<DisplayFeedbackPage/>}/>
        <Route path='/pr' element={<UserProfileComponent/>}/>

        <Route path="/GManager" element={<GManagerDashboard />}>
          <Route path="feedback" element={<AdminFeedbackManagement />} />
          <Route path='Dashboard' element={<AdminDashboard/>}/>
          <Route path='Adminview' element={<AdminView />} />
        </Route>

        {/* Shuttle Service */}
        <Route path='/transportation' element={<Transport/>}/>
        <Route path='/Tadmin' element={<AdminBookingsPage/>}/>
        <Route path='/Tbform' element={<BookingForm/>}/>

        
        <Route path="/Tmanager" element={<TManagerDashboard />}>
          <Route path="drivers" element={<ManageDrivers />} />
          <Route path="add-drivers" element={<AddDriverForm />} />
          <Route path="bookings" element={<TransportBookings />} />
        </Route>
  
        <Route path='/tbHeader' element={<TManagerHeader activeTab={''}/>}/>
        {/* Vehicle */}
        <Route path='/TadminV' element={<AdminVehiclePage/>}/>

        {/* Driver */}
        <Route path='/TadminD' element={<ManageDrivers/>}/>

        {/* <Route path='/offers' element={<Offers />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;