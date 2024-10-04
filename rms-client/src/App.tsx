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
import LeaveRequestsTabEmployee from './modules/employees/components/Employee/LeaveRequestsTab';
import DutyRoasterTabEmployee from './modules/employees/components/Employee/DutyRoasterTab';

// Other Modules
import Event from './modules/events/Event';
import Reservation from './modules/reservations/Reservation'; // Fixed typo

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
import GManagerDashboard from './modules/guests/components/Manager/GmanagerDashboard';
import AdminFeedbackManagement from './modules/guests/components/Manager/AdminFeedbackManagement';
import GAdminPage from './modules/guests/components/AdminPage/AdminPage';
import Offers from './modules/offers/offers/Offers';
import HomePage1 from './modules/offers/offers/components/OffersHome/HomePage';
import OffersTable from './modules/offers/offers/components/OffersTable/OffersTable';
import OfferCard from './modules/offers/offers/components/OffersHome/OfferCard';
import AddOffer from './modules/offers/offers/components/AddOffer/AddOffer';
import OManagerDashboard from './modules/offers/offers/components/Manager/OManagerDashboard';
import MainHome from './modules/core/components/MainHome';
import SpaApp from './modules/spa/Spa';
import HomePage from './modules/spa/components/Employee/Home/HomePage';
import GymPage from './modules/spa/components/Employee/Gym/GymPage';
import GymAppointmentForm from './modules/spa/components/Employee/Gymform/GymAppointmentForm';
import MedicalPage from './modules/spa/components/Employee/Medical/MedicalPage';
import MedicalAppointmentForm from './modules/spa/components/Employee/Medicalform/MedicalAppointmentForm';
import SpaPage from './modules/spa/components/Employee/Spa/SpaPage';
import SpaAppointmentForm from './modules/spa/components/Employee/Spaform/SpaAppointmentForm';
import CustomerDetailsTable from './modules/spa/components/Manager/CustomerDetailsTable';
import InventoryTable from './modules/spa/components/Manager/Inventory/InventoryTable';
import AppointmentPage from './modules/spa/components/Employee/Appoinment/AppointmentPage';
import SManagerDashboard from './modules/spa/components/Admin/SmanagerDashboard';
import AdminAppointment from './modules/spa/components/Admin/AdminAppointment';
import EventHome from './modules/events/pages/eventhome/EventHome';
import EventCard from './modules/events/components/EventCard';
import EventDetails from './modules/events/components/EventDetails';
import BookingEventForm from './modules/events/components/BookingForm';
import PaymentEventForm from './modules/events/components/PaymentForm';
import EManagerDashboard from './modules/events/components/ADMIN/EmanagerDashboard';
import AddEvent from './modules/events/components/ADMIN/AddEvent';
import Table from './modules/offers/offers/components/CustomerTable/Table';
import TermsAndConditions from './modules/offers/offers/components/TermsAndConditions/TermsAndConditions';
import DailyReportGenerationForm from './modules/offers/offers/components/DailyReport/DailyReportGenerationForm';
import DataTable from './modules/offers/offers/components/ApproveBookings/DataTable';
import OfferPaymentForm from './modules/offers/offers/components/Paynment/PaymentForm';
import FormBook from './modules/offers/offers/components/BookingForm/Form';
import LoginPageN from './modules/guests/Login/LoginPage';
import ProfileComponent from './modules/guests/components/ProfileComponent/ProfileComponent';
import ManagerLoginPage from './modules/employees/components/Login/ManagerLoginPage';
import ManagerProfile from './modules/employees/components/Login/ManagerProfile';
import EmployeeLogin from './modules/employees/components/Login/EmployeeLogin';
import EmployeeProfile from './modules/employees/components/Login/EmployeeProfile';



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
          <Route path='manager-profile' element={<ManagerProfile />} />
        </Route>

        {/* Employee Routes */}
        <Route path='/staf' element={<EmployeeDashboard />}>
          <Route path='profile' element={<EmployeeProfile />} />
          <Route path='leave-requests' element={<LeaveRequestsTabEmployee />} />
          <Route path='duty-roaster' element={<DutyRoasterTabEmployee />} />
          <Route path='chat' element={<ChatTab />} />
          <Route path='notices' element={<EmployeeNoticesTab />} />
          {/* <Route path='employee-profile' element={<EmployeeProfile/>} /> */}
        </Route>

        <Route path="/manager-login" element={<ManagerLoginPage/>} />
        <Route path="/employee-login" element={<EmployeeLogin/>} />
        
        <Route path='/' element={<LoginPageN />} />
        <Route path='/homeMain' element={<MainHome />} />

        Other Routes
        
        <Route path="/eventhome" element={<EventHome/>} />
        <Route path="/eventcard" element={<EventCard/>}/>
        <Route path="/events/:id" element={<EventDetails/>}/>
        <Route path="/events/:id/book" element={<BookingEventForm/>}/>
        <Route path="events/:id/payment" element={<PaymentEventForm />} />
        <Route path="/eventcard" element={<EventCard />} />

        <Route path='/EManager' element={<EManagerDashboard />}>
          <Route path='event' element={<Event />} />
          <Route path='addevent' element={<AddEvent />} />
        </Route>


        
        
        {/* Restuarent */}
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
        <Route path='/formroom' element={<RoomBookingForm />} />
        <Route path='/profilescreen' element={<ProfileScreen />} />
        <Route path='/navbar' element={<Navbar />} />
        <Route path='/cancelform' element={<CancelBookingForm/>} />
        

        <Route path="/roommanager" element={<RoomManagerDashboard />}>
          <Route path="addroom" element={<AddRoomForm />} />
          <Route path="roomdetails" element={<RoomTable />} />
          <Route path="reservations" element={<Reservationdetails />} />
          {/* <Route path="reports" element={<ReportsPage />} /> */}
        </Route>


        {/*customer routes spa*/}
        <Route path='/spa' element={<SpaApp />} />
        <Route path='/Home' element={<HomePage />} />
        <Route path='/Gympage' element={<GymPage />} />
        <Route path='/GymAppointmentForm' element={<GymAppointmentForm />} />
        <Route path='/MedicalPage' element={<MedicalPage />} />
        <Route path='/MedicalAppointmentForm' element={<MedicalAppointmentForm />} />
        <Route path='/apoinments' element={<AppointmentPage />} />
        <Route path='/SpaPage' element={<SpaPage />} /> 
        <Route path='/SpaAppointmentForm ' element={<SpaAppointmentForm />} /> 
        <Route path='/appointments' element={<AppointmentPage />} /> 

        <Route path='/SManager' element={<SManagerDashboard />}>
          
          <Route path='Sappointments' element={<AdminAppointment />} />{/* Correct path and nesting */}
        </Route>



          {/*Manager routes  spa*/}
        <Route path='/CustomerDetailsTable ' element={<CustomerDetailsTable />} /> 
        <Route path='InventoryTable ' element={<InventoryTable />} /> 
        
        



      {/* Guest */}
      <Route path='/guests' element={<Guests />} />
        <Route path='/loginG' element={<GuestProfileLoginPage />} />
        <Route path='/loginDetails' element={<AccountDetailsTable />} />
        
        <Route path='/Feedbackrating' element={<FeedbackRatingPage/>}/>
        <Route path='/Adminpage' element={<GAdminPage/>}/>
        
        <Route path='/displayfeedback' element={<DisplayFeedbackPage/>}/>
        <Route path='/pr' element={<ProfileComponent/>}/>

        <Route path='/login' element={<LoginPageN/>}/>

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






        {/* Offers */}
        <Route path='/offers' element={<Offers/>}/>
        <Route path="/HomePage1" element={<HomePage1/>} />
        
       
         <Route path="/Navbar" element={<Navbar/>} />
         
        
        
        <Route path="/OfferCard" element={<OfferCard offer={{
        id: 0,
        name: '',
        description: '',
        image: ''
      }}/>} />
       <Route path="/Table" element={<Table/>} />
       <Route path="/FormBook" element={<FormBook/>} />
       <Route path="/TermsAndConditions" element={<TermsAndConditions/>} />
       <Route path="/DailyReportGenerationForm" element={<DailyReportGenerationForm/>} />
       <Route path="/OfferPaymentForm" element={<OfferPaymentForm/>} />
       

       <Route path="/OManager" element={<OManagerDashboard />}>
       <Route path="AddOffer" element={<AddOffer onSave={() => { console.log(); }} />} />
       <Route path="DataTable" element={<DataTable/>} />
        <Route path="OffersTable" element={<OffersTable />} />
        <Route path="DailyReportGenerationForm" element={<DailyReportGenerationForm/>} />
      </Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;