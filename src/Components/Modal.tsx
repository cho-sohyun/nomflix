import React, { useState } from 'react';
import styled from 'styled-components';
import { IMovie } from '../api';
import { makeImagePath } from '../utils';
import { motion } from 'framer-motion';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContainer = styled(motion.div)`
  background-color: white;
  width: 80%;
  max-width: 900px;
  border-radius: 15px;
  overflow: hidden;
  display: flex;
`;

const ImgContainer = styled.div`
  flex: 1;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InfoContainer = styled.div`
  flex: 2;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

interface ModalProps {
  movie: IMovie | null;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <Overlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <ModalContainer initial={{ y: 50 }} animate={{ y: 0 }} exit={{ y: 50 }} onClick={(e) => e.stopPropagation()}>
        <ImgContainer>
          <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} />
        </ImgContainer>
        <InfoContainer>
          <h2>{movie.title}</h2>
          <p>평점: {movie.vote_average}</p>
          <p>출시일: {movie.release_date}</p>
          <p>장르: {movie.genre_ids.join(', ')}</p>
        </InfoContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
