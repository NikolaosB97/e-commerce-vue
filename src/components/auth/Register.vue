<!-- src/components/auth/Register.vue -->
<template>
  <div class="register-form">
    <h2>Registrati</h2>
    <Form :validation-schema="validationSchema" @submit="onSubmit">
      <div>
        <label for="email">Email</label>
        <Field id="email" name="email" type="email" placeholder="Inserisci la tua email" />
        <ErrorMessage name="email" />
      </div>

      <div>
        <label for="password">Password</label>
        <Field id="password" name="password" type="password" placeholder="Inserisci la tua password" />
        <ErrorMessage name="password" />
      </div>

      <div>
        <label for="confirmPassword">Conferma Password</label>
        <Field id="confirmPassword" name="confirmPassword" type="password" placeholder="Conferma la tua password" />
        <ErrorMessage name="confirmPassword" />
      </div>

      <button type="submit">Registrati</button>
    </Form>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
// Disabilita l'errore no-unused-vars solo per queste importazioni
/* eslint-disable no-unused-vars */
import { Form, Field, ErrorMessage } from 'vee-validate';
/* eslint-enable no-unused-vars */
import * as Yup from 'yup';
import axios from 'axios';
import { ref } from 'vue';

export default {
  name: "RegisterForm",
  setup() {
    // Definisce lo schema di validazione Yup per l'intero form
    const validationSchema = Yup.object({
      email: Yup.string().email('Email non valida').required('Email obbligatoria'),
      password: Yup.string().min(6, 'Minimo 6 caratteri').required('Password obbligatoria'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Le password devono coincidere')
        .required('Conferma password obbligatoria')
    });

    // Stato dei messaggi di successo/errore
    const successMessage = ref('');
    const errorMessage = ref('');

    // Funzione di submit per inviare i dati al server
    const onSubmit = async (values) => {
      try {
        const response = await axios.post('https://67210cea98bbb4d93ca73ee2.mockapi.io/user', values);
        console.log(response);
        successMessage.value = 'Registrazione completata con successo!';
        errorMessage.value = '';

        // Reindirizza alla dashboard dopo la registrazione
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1000);
      } catch (error) {
        errorMessage.value = 'Registrazione fallita. Riprova.';
        successMessage.value = '';
      }
    };

    return {
      validationSchema,
      onSubmit,
      successMessage,
      errorMessage
    };
  }
};
</script>

<style scoped>
.register-form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

button {
  margin-top: 15px;
}

.success {
  color: green;
  margin-top: 15px;
}

.error {
  color: red;
  margin-top: 15px;
}
</style>