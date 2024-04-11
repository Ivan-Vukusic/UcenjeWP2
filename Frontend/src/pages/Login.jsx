import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useAuth from '../hooks/useAuth';

export default function Login() {
  const { login } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);
    login({
      email: podaci.get('email'),
      password: podaci.get('lozinka'),
    });
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='text'
            name='email'
            placeholder='ivan.vukusic@yahoo.com'
            maxLength={255}
            required
          />
        </Form.Group>
        <Form.Group controlId='lozinka'>
          <Form.Label>Lozinka</Form.Label>
          <Form.Control type='password' name='lozinka' required />
        </Form.Group>
        <Button variant='primary' className='gumb' type='submit'>
          Autoriziraj
        </Button>
      </Form>
    </Container>
  );
}