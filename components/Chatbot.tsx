'use client';

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const ChatbotContainer = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    bottom: 10px;
    right: 10px;
  }
`;

const ChatButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: ${props => props.theme.colors.gradient1};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${props => props.theme.shadows.large};
  color: white;
  font-size: 1.5rem;
  position: relative;
  
  &:hover {
    transform: scale(1.1);
  }
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: ${props => props.theme.colors.gradient1};
    opacity: 0.5;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.2);
      opacity: 0;
    }
  }
`;

const ChatWindow = styled(motion.div)`
  position: absolute;
  bottom: 80px;
  right: 0;
  width: 380px;
  height: 500px;
  background: rgba(20, 20, 32, 0.95);
  backdrop-filter: blur(20px);
  border-radius: ${props => props.theme.shapes.borderRadius};
  border: 1px solid rgba(139, 92, 246, 0.3);
  box-shadow: ${props => props.theme.shadows.large};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
  @media (max-width: ${props => props.theme.breakpoints.md}) {
    width: calc(100vw - 20px);
    height: 450px;
    right: -10px;
  }
`;

const ChatHeader = styled.div`
  padding: 1rem;
  background: ${props => props.theme.colors.gradient1};
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
  }
  
  button {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    
    &:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary};
    border-radius: 3px;
  }
`;

const Message = styled(motion.div)<{ $isUser: boolean }>`
  display: flex;
  justify-content: ${props => props.$isUser ? 'flex-end' : 'flex-start'};
  
  .message-bubble {
    max-width: 80%;
    padding: 0.75rem 1rem;
    border-radius: ${props => props.theme.shapes.borderRadiusSmall};
    background: ${props => props.$isUser 
      ? props.theme.colors.gradient2 
      : 'rgba(255, 255, 255, 0.1)'};
    color: white;
    font-size: 0.9rem;
    line-height: 1.5;
    word-wrap: break-word;
  }
`;

const InputContainer = styled.div`
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  gap: 0.5rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem;
  border-radius: ${props => props.theme.shapes.borderRadiusSmall};
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  font-size: 0.9rem;
  outline: none;
  
  &:focus {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px rgba(139, 92, 246, 0.2);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SendButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: ${props => props.theme.shapes.borderRadiusSmall};
  background: ${props => props.theme.colors.gradient2};
  border: none;
  color: white;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s;
  
  &:hover {
    transform: scale(1.05);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Resume knowledge base
const resumeData = {
  name: "Matin Gathani",
  title: "Computer Science Student & AI Engineer",
  education: {
    degree: "B.S. Computer Science",
    university: "Arizona State University",
    location: "Tempe, AZ",
    graduation: "Expected May 2026",
    gpa: "3.67",
    coursework: "Data Structures and Algorithms, Object-Oriented Programming & Design, Software Analysis and Design, Software QA and Testing, Operating Systems, Applied Linear Algebra, Human-Computer Interaction"
  },
  experience: [
    {
      role: "Engineering Tutor / Learning Assistant",
      company: "Arizona State University",
      period: "Jan 2024 – Present",
      highlights: [
        "Mentored 180+ students in programming (Java, Assembly, C++)",
        "Emphasized debugging, testing, and problem-solving",
        "Guided learners on software lifecycle concepts"
      ]
    },
    {
      role: "Project Intern",
      company: "Musikaar",
      period: "May 2024 – Aug 2024",
      highlights: [
        "Built and optimized ML models using Python, NLP, and tokenization",
        "Improved HR data processing workflows",
        "Developed front-end pages with API integration"
      ]
    },
    {
      role: "UGTA – CSE 460 (Software Engineering)",
      company: "Arizona State University",
      period: "Fall 2025",
      highlights: [
        "Guided capstone teams on requirements and architecture",
        "Introduced CI basics and deployment checklists",
        "Mentored students on writing maintainable tests"
      ]
    }
  ],
  skills: {
    programming: ["Java", "Python", "C/C++", "JavaScript", "Assembly"],
    technologies: ["Machine Learning", "NLP", "REST APIs", "Docker", "Git/GitHub", "SQL"],
    tools: ["Postman", "Docker", "Linux/Unix", "Windows", "MacOS"]
  },
  projects: [
    "Medical Record System - Full-stack system using JavaScript, SQL, and Docker",
    "Maze-Solving Car - Automation system with block coding and decision logic",
    "Digital Design Key Fob Circuit - Logic gate circuit using K-map and state diagrams"
  ]
};

const getChatbotResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();
  
  // Resume-related queries
  if (lowerMessage.includes('resume') || lowerMessage.includes('cv') || lowerMessage.includes('background')) {
    return `I'm ${resumeData.name}, a ${resumeData.title} at ${resumeData.education.university}. I'm currently pursuing a ${resumeData.education.degree} with a GPA of ${resumeData.education.gpa}, expected to graduate in ${resumeData.education.graduation}. I have experience in ML/AI, software development, and teaching. Would you like to know more about my experience, skills, or projects?`;
  }
  
  if (lowerMessage.includes('education') || lowerMessage.includes('degree') || lowerMessage.includes('gpa')) {
    return `I'm studying ${resumeData.education.degree} at ${resumeData.education.university} (${resumeData.education.location}) with a GPA of ${resumeData.education.gpa}. I'm expected to graduate in ${resumeData.education.graduation}. My coursework includes: ${resumeData.education.coursework}.`;
  }
  
  if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('job')) {
    const exp = resumeData.experience[0];
    return `I'm currently working as ${exp.role} at ${exp.company} (${exp.period}). ${exp.highlights[0]}. I've also worked as a Project Intern at Musikaar where I built ML models and optimized HR data processing workflows. Would you like more details about any specific role?`;
  }
  
  if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech stack')) {
    return `My technical skills include:\n\nProgramming: ${resumeData.skills.programming.join(', ')}\n\nTechnologies: ${resumeData.skills.technologies.join(', ')}\n\nTools: ${resumeData.skills.tools.join(', ')}\n\nI'm particularly strong in Machine Learning, Python, Java, and software testing.`;
  }
  
  if (lowerMessage.includes('project') || lowerMessage.includes('portfolio')) {
    return `Some of my key projects include:\n\n1. ${resumeData.projects[0]}\n\n2. ${resumeData.projects[1]}\n\n3. ${resumeData.projects[2]}\n\nYou can see more details in the Projects section of my portfolio!`;
  }
  
  if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
    return `You can reach me at mgathan1@asu.edu or call me at 480-572-2372. I'm also on LinkedIn at linkedin.com/in/matin-gathani-185a7a192. Feel free to send me a message!`;
  }
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return `Hello! I'm Matin's portfolio chatbot. I can help you learn about Matin's resume, experience, skills, education, and projects. What would you like to know?`;
  }
  
  if (lowerMessage.includes('help') || lowerMessage.includes('what can you')) {
    return `I can help you with information about:\n\n• Resume/CV details\n• Education and GPA\n• Work experience\n• Technical skills\n• Projects\n• Contact information\n\nJust ask me anything! For example, try "resume" or "experience".`;
  }
  
  // Default response
  return `I'm here to help you learn about Matin! Try asking about:\n\n• "resume" - Get an overview\n• "experience" - Work history\n• "skills" - Technical abilities\n• "education" - Academic background\n• "projects" - Portfolio projects\n• "contact" - How to reach out\n\nOr type "help" for more options!`;
};

interface MessageType {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([
    {
      text: "Hello! I'm Matin's portfolio chatbot. I can help you learn about his resume, experience, skills, and more. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    const userMessage: MessageType = {
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Simulate thinking delay
    setTimeout(() => {
      const response = getChatbotResponse(inputValue);
      const botMessage: MessageType = {
        text: response,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  return (
    <ChatbotContainer>
      <AnimatePresence>
        {isOpen && (
          <ChatWindow
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <ChatHeader>
              <h3>💬 Portfolio Assistant</h3>
              <button onClick={() => setIsOpen(false)}>×</button>
            </ChatHeader>
            <MessagesContainer>
              {messages.map((msg, idx) => (
                <Message
                  key={idx}
                  $isUser={msg.isUser}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="message-bubble">{msg.text}</div>
                </Message>
              ))}
              <div ref={messagesEndRef} />
            </MessagesContainer>
            <InputContainer>
              <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about resume, experience, skills..."
              />
              <SendButton onClick={handleSend} disabled={!inputValue.trim()}>
                Send
              </SendButton>
            </InputContainer>
          </ChatWindow>
        )}
      </AnimatePresence>
      <ChatButton
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        💬
      </ChatButton>
    </ChatbotContainer>
  );
};

export default Chatbot;

