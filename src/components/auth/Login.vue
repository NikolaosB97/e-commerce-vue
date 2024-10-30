<template>
  <div class="login-form">
    <h2>Login</h2>
    <Form @submit="onSubmit">
      <div>
        <label for="email">Email</label>
        <Field id="email" name="email" type="email" :rules="emailRules" placeholder="Inserisci la tua email" />
        <ErrorMessage name="email" />
      </div>

      <div>
        <label for="password">Password</label>
        <Field id="password" name="password" type="password" :rules="passwordRules" placeholder="Inserisci la tua password" />
        <ErrorMessage name="password" />
      </div>

      <!-- Messaggio di errore per il login -->
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <button type="submit">Login</button>
    </Form>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import { Form, Field, ErrorMessage } from 'vee-validate';
/* eslint-enable no-unused-vars */
import * as Yup from 'yup';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  name: "LoginForm",

  setup() {
    const router = useRouter();


    const emailRules = Yup.string().email('Email non valida').required('Email obbligatoria');
    const passwordRules = Yup.string().min(6, 'Minimo 6 caratteri').required('Password obbligatoria');

   
    const errorMessage = ref('');

 
    const onSubmit = async (values) => {
      try {
        
        const response = await axios.get(`https://67210cea98bbb4d93ca73ee2.mockapi.io/user`);

    
        const user = response.data.find(
          user => user.email === values.email && user.password === values.password
        );

        if (user) {
  
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('userName', user.email); 

          
          router.push('/dashboard');
        } else {
          
          errorMessage.value = 'Email o password non sono corretti.';
        }
      } catch (error) {
        console.error(error);
        errorMessage.value = 'Errore durante il login. Riprova più tardi.';
      }
    };

    return {
      emailRules,
      passwordRules,
      errorMessage,
      onSubmit
    };
  }
};
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

button {
  margin-top: 15px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>