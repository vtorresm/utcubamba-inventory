import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import AlertsReport from './components/reports/AlertsReport';
import FinancialReport from './components/reports/FinancialReport';
import InventoryReport from './components/reports/InventoryReport';
import MovementsReport from './components/reports/MovementsReport';
import PatientReport from './components/reports/PatientReport';
import TrendsReport from './components/reports/TrendsReport';
import RoleManagement from './components/RoleManagement';
import withRole from './components/withRole';
import { AuthProvider } from './context/AuthContext';
import AlertManagementPage from './pages/AlertManagementPage';
import Catalog from './pages/Catalog';
import Home from './pages/Home';
import MedicationAnalysisPage from './pages/MedicationAnalysisPage';
import MedicationPredictionPage from './pages/MedicationPredictionPage';
import OrderManagement from './pages/OrderManagement';
import Reports from './pages/Reports';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-100">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/orders" element={<OrderManagement />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/reports/inventory" element={<InventoryReport />} />
              <Route path="/reports/movements" element={<MovementsReport />} />
              <Route path="/reports/trends" element={<TrendsReport />} />
              <Route path="/reports/alerts" element={<AlertsReport />} />
              <Route path="/reports/financial" element={<FinancialReport />} />
              <Route path="/reports/patients" element={<PatientReport />} />
              <Route path="/predictions" element={<MedicationPredictionPage />} />
              <Route path="/analysis" element={<MedicationAnalysisPage />} />
              <Route path="/alert-management" element={<AlertManagementPage />} />
              <Route path="/admin" element={withRole(RoleManagement, 'admin')} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App