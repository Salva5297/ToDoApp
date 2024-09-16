import { useState, useEffect } from 'react';
import { Duty } from '../../backend/src/types/Duty';
import { getDuties, createDuty, updateDuty, deleteDuty } from './controllers/controller';


const App = () => {
  const [duties, setDuties] = useState<Duty[]>([]);
  const [newDutyName, setNewDutyName] = useState('');
  const [editingDuty, setEditingDuty] = useState<Duty | null>(null); // Estado para el duty que está siendo editado
  const [editName, setEditName] = useState(''); // Estado para el nuevo nombre del duty en edición

  useEffect(() => {
    NewGetDuties();
  }, []);

  const NewGetDuties = async () => {
    try {
      const fetchedDuties = await getDuties();
      setDuties(fetchedDuties);
    } catch (error) {
      alert('Failed to fetch duties');
    }
  };

  const NewCreateDuty = async () => {
    if (!newDutyName.trim()) {
      alert('Please enter a duty title');
      return;
    }

    try {
      const newDuty = await createDuty({ name: newDutyName });
      setDuties([...duties, newDuty]);
      setNewDutyName('');
      alert('Duty added successfully');
    } catch (error) {
      alert('Failed to add duty');
    }
  };

  const NewUpdateDuty = async (updatedDuty: Duty) => {
    try {
      await updateDuty(updatedDuty);
      setDuties(duties.map(duty => duty.id === updatedDuty.id ? updatedDuty : duty));
      alert('Duty updated successfully');
    } catch (error) {
      alert('Failed to update duty');
    }
  };

  const NewDeleteDuty = async (id: number) => {
    try {
      await deleteDuty(id);
      setDuties(duties.filter(duty => duty.id !== id));
      alert('Duty deleted successfully');
    } catch (error) {
      alert('Failed to delete duty');
    }
  };

  const handleEdit = (duty: Duty) => {
    setEditingDuty(duty);
    setEditName(duty.name); // Rellenar el input con el nombre actual del duty
  };

  const handleSaveEdit = async () => {
    if (editingDuty) {
      const updatedDuty = { ...editingDuty, name: editName };
      await NewUpdateDuty(updatedDuty);
      setEditingDuty(null); // Limpiar el estado de edición
      setEditName('');
    }
  };


  return (
    <div>
      <center>
      <h1>ToDo APP</h1>
      <input
        type="text"
        value={newDutyName}
        onChange={(e) => setNewDutyName(e.target.value)}
        placeholder="Enter duty description"
      /> &nbsp;
      <button onClick={NewCreateDuty}>Add Duty</button>
      <ul>
        {duties.map((duty) => (
          <li key={duty.id}>
            {editingDuty && editingDuty.id === duty.id ? (
              // Mostrar campo de edición si el duty está siendo editado
              <>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Edit duty"
                />
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={() => setEditingDuty(null)}>Cancel</button>
              </>
            ) : (
              // Mostrar el duty normal si no está en edición
              <>
                <p>
                  {duty.name} &nbsp;
                  <button onClick={() => handleEdit(duty)}>Edit Duty</button> &nbsp;
                  <button onClick={() => NewDeleteDuty(duty.id)}>Delete Duty</button>
                </p>
              </>
            )}
          </li>
        ))}
      </ul>
      </center>
    </div>
  );
};

export default App;