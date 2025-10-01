import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';

const ContactSection = styled.section`
  padding: 100px 5%;
  position: relative;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  margin-bottom: 3rem;
  background: linear-gradient(90deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2.5rem;
    text-align: center;
    margin-bottom: 2rem;
  }
`;

const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: ${props => props.theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const ContactInfo = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  i {
    font-size: 1.5rem;
    background: linear-gradient(45deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  a {
    color: ${props => props.theme.colors.textSecondary};
    font-size: 1.1rem;
    transition: color 0.3s ease;
    
    &:hover {
      color: ${props => props.theme.colors.secondary};
      text-decoration: underline;
    }
  }
`;

const ContactFormContainer = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
`;

const Input = styled.input`
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  
  &:focus {
    border-color: ${props => props.theme.colors.secondary};
    box-shadow: 0 0 0 2px rgba(0, 194, 255, 0.2);
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  color: ${props => props.theme.colors.text};
  font-size: 1rem;
  min-height: 150px;
  outline: none;
  transition: all 0.3s ease;
  resize: vertical;
  
  &:focus {
    border-color: ${props => props.theme.colors.secondary};
    box-shadow: 0 0 0 2px rgba(0, 194, 255, 0.2);
  }
`;

const SubmitButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: linear-gradient(45deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  align-self: flex-start;
  
  &:hover {
    box-shadow: 0 5px 15px rgba(110, 87, 224, 0.4);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const FloatingContactInfo = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={2} />
      
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text
          position={[0, 0, 0]}
          fontSize={0.6}
          color="#6e57e0"
          maxWidth={2}
          lineHeight={1}
          textAlign="center"
          font="/fonts/inter_bold.json"
        >
          Get In Touch
        </Text>
      </Float>
    </Canvas>
  );
};

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
      alert('Thank you for your message! I will get back to you soon.');
    }, 1500);
  };
  
  return (
    <ContactSection id="contact" ref={ref}>
      <SectionTitle
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
        transition={{ duration: 0.5 }}
      >
        Contact Me
      </SectionTitle>
      
      <ContactContainer>
        <ContactInfo
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ContactItem>
            <i className="fas fa-envelope"></i>
            <a href="mailto:mgathan1@asu.edu">mgathan1@asu.edu</a>
          </ContactItem>
          <ContactItem>
            <i className="fas fa-phone"></i>
            <a href="tel:4805722372">480.572.2372</a>
          </ContactItem>
          <ContactItem>
            <i className="fab fa-linkedin"></i>
            <a href="https://www.linkedin.com/in/matin-gathani-185a7a192" target="_blank" rel="noopener noreferrer">
              LinkedIn Profile
            </a>
          </ContactItem>
          
          <div style={{ height: '300px', marginTop: '2rem' }}>
            <FloatingContactInfo />
          </div>
        </ContactInfo>
        
        <ContactFormContainer
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <Input 
                type="text" 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="message">Message</Label>
              <TextArea 
                id="message" 
                name="message" 
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required 
              />
            </FormGroup>
            <SubmitButton 
              type="submit" 
              disabled={isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </SubmitButton>
          </Form>
        </ContactFormContainer>
      </ContactContainer>
    </ContactSection>
  );
};

export default Contact;
