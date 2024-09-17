import { useState, useEffect } from 'react';
import { Duty } from './models/Duty';
import { getDuties, createDuty, updateDuty, deleteDuty } from './services/service';


const App = () => {
  const [duties, setDuties] = useState<Duty[]>([]); // Status for duties
  const [newDutyName, setNewDutyName] = useState(''); // Status for the new duty to be added
  const [editingDuty, setEditingDuty] = useState<Duty | null>(null); // Status for the duty being edited
  const [editName, setEditName] = useState(''); // Status for the new duty name in edition

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
    setEditName(duty.name); // Fill the input with the current duty name
  };

  const handleSaveEdit = async () => {
    if (editingDuty) {
      const updatedDuty = { ...editingDuty, name: editName };
      await NewUpdateDuty(updatedDuty);
      setEditingDuty(null); // Clear the editing status
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
              // Show edit field if duty is being edited
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
              // Show normal duty if not in edit
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