import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usersignup } from '../Redux/AuthReducer/action';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { Box, Heading, Input, Button } from '@chakra-ui/react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
const Register = () => {
  const dispatch = useDispatch();
  const register_error = useSelector((state) => state.AuthReducer.register_error);
  const register_loading = useSelector((state) => state.AuthReducer.register_loading);

  const [formData, setFormData] = useState({
    tag:'Register',
    email: '',
    password: '',
    name: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch the registerUser action with the form data
    dispatch(usersignup(formData));
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <>
    <Navbar/>
    <div className="container mx-auto p-4">
      <Box p="4" bg="gray.100" rounded="lg" shadow="lg" data-aos="fade-up">
        <Heading as="h2" size="xl" mb="4">
          Register
        </Heading>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="text-lg">
              <FaEnvelope className="mr-2 inline-block" />
              Email
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-lg">
              <FaLock className="mr-2 inline-block" />
              Password
            </label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="text-lg">
              <FaUser className="mr-2 inline-block" />
              Username
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          {register_error && (
            <div className="text-red-500">{register_error}</div>
          )}
          {register_loading && (
            <div className="text-red-500">{register_loading}</div>
          )}
          <Button
            type="submit"
            colorScheme="blue"
            size="md"
            leftIcon={<FaUser />}
          >
            Register
          </Button>
        </form>
      </Box>
    </div>
    <Footer/>
    </>

  );
};

export default Register;
