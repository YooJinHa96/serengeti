import Spacing from '@/components/Spacing';
import { USER_PROFILE } from '@/constants/useProfile';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';
import { useRef } from 'react';
const Section5 = () => {
  const form = useRef<HTMLFormElement>(null);
  const { githubLink } = USER_PROFILE;
  const onClick = () => {
    window.open(githubLink);
  };
  const sendEmail = (e: any) => {
    e.preventDefault();
    emailjs
      .sendForm('service_xfchowa', 'template_fmp6qff', form.current as string | HTMLFormElement, '0Xw9olsRsWOERgnq8')
      .then(
        result => {
          console.log(result.text);
        },
        error => {
          console.log(error.text);
        }
      );
  };
  return (
    <div style={{ position: 'absolute', zIndex: 2, right: 0 }}>
      <Spacing direction="horizontal" size={900} />
      <SectionTitle> Contact Us</SectionTitle>
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="name" />
        <label>Email</label>
        <input type="email" name="email" />
        <label>number</label>
        <input type="number" name="number" />
        <label>Message</label>
        <textarea name="message" />
        <input type="submit" value="Send" />
      </form>
      {/* <ContactInfo>연락처 : {number}</ContactInfo>
      <ContactInfo>mail : {email}</ContactInfo> */}
      <ButtonContainer>
        <Button onClick={onClick}>
          <Img src={'/github-mark.png'} />
          <ButtonLabel> {'GIT 바로가기'}</ButtonLabel>
        </Button>
      </ButtonContainer>
      <Spacing size={400} />
    </div>
  );
};

export default Section5;
const SectionTitle = styled.h1`
  color: #fffdd0;
`;
const ContactInfo = styled.h3`
  color: #fffdd0;
`;
const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
`;

const Button = styled.button`
  width: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  background-color: #fffdd0;
  &:focus {
    outline: none;
  }
`;
const Img = styled.img`
  width: 20px;
  height: 20px;
`;
const ButtonLabel = styled.span`
  width: 100px;
  height:'100%;
`;
