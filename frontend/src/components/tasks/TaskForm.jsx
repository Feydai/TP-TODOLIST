import { useState } from 'react';
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';

import AppButton from '../common/AppButton.jsx';

const TaskForm = ({
  initialValues = {},
  onSubmit,
  onCancel,
  loading = false,
  mode = 'create',
}) => {
  const [form, setForm] = useState({
    title: initialValues.title || '',
    status: initialValues.status || 'todo',
    dueDate: initialValues.dueDate || '',
    description: initialValues.description || '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: '',
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = 'Le titre est obligatoire';
    } else if (form.title.trim().length > 120) {
      newErrors.title = 'Le titre ne doit pas dépasser 120 caractères';
    }

    if (form.description.length > 1000) {
      newErrors.description =
        'La description ne doit pas dépasser 1000 caractères';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit({
      ...form,
      title: form.title.trim(),
      dueDate: form.dueDate || null,
    });
  };

  const isEdit = mode === 'edit';

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      elevation={1}
      sx={{
        p: { xs: 2.5, md: 3 },
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      {/* Titre */}
      <TextField
        name="title"
        label="Titre"
        placeholder="Ex. Préparer la démo"
        value={form.title}
        onChange={handleChange}
        error={Boolean(errors.title)}
        helperText={
          errors.title || `${form.title.length}/120 · Entre 1 et 120 caractères`
        }
        required
        fullWidth
        size="small"
        slotProps={{
          htmlInput: {
            maxLength: 120,
          },
        }}
      />

      {/* Statut + date */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: '1fr 1fr',
          },
          gap: 2,
          mt: 2,
        }}
      >
        <FormControl required size="small">
          <InputLabel>Statut</InputLabel>

          <Select
            name="status"
            label="Statut"
            value={form.status}
            onChange={handleChange}
          >
            <MenuItem value="todo">À faire</MenuItem>
            <MenuItem value="doing">En cours</MenuItem>
            <MenuItem value="done">Terminée</MenuItem>
          </Select>

          <FormHelperText>
            Sélectionnez l'état actuel de la tâche.
          </FormHelperText>
        </FormControl>

        <TextField
          name="dueDate"
          label="Date d'échéance"
          type="date"
          value={form.dueDate}
          onChange={handleChange}
          helperText="Facultative"
          fullWidth
          size="small"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
      </Box>

      {/* Description */}
      <TextField
        name="description"
        label="Description"
        placeholder="Détails, étapes, liens utiles..."
        value={form.description}
        onChange={handleChange}
        error={Boolean(errors.description)}
        helperText={
          errors.description || `${form.description.length}/1000 · Facultative`
        }
        multiline
        rows={4}
        fullWidth
        sx={{ mt: 2 }}
        slotProps={{
          htmlInput: {
            maxLength: 1000,
          },
        }}
      />

      {/* Actions */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 1.5,
          mt: 3,
        }}
      >
        <AppButton
          text="ANNULER"
          variant="text"
          onClick={onCancel}
          disabled={loading}
        />

        <AppButton
          text={isEdit ? 'ENREGISTRER' : 'CRÉER LA TÂCHE'}
          type="submit"
          icon={isEdit ? <SaveIcon /> : <AddIcon />}
          disabled={loading}
        />
      </Box>
    </Paper>
  );
};

export default TaskForm;
