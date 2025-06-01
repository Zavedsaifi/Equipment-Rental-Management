import { Routes, Route } from 'react-router-dom';
import EquipmentList from '../components/Equipment/EquipmentList';
import EquipmentForm from '../components/Equipment/EquipmentForm';
import EquipmentDetail from '../components/Equipment/EquipmentDetail';
import { EquipmentProvider } from '../contexts/EquipmentContext';

const EquipmentPage = () => {
  return (
    <EquipmentProvider>
      <Routes>
        <Route path="/" element={<EquipmentList />} />
        <Route path="/new" element={<EquipmentForm />} />
        <Route path="/:id" element={<EquipmentDetail />} />
        <Route path="/:id/edit" element={<EquipmentForm />} />
      </Routes>
    </EquipmentProvider>
  );
};

export default EquipmentPage; 