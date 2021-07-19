import { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const slideUp = keyframes`
  0% {
    transform: translateY(50px);
  }

  100% {
    transform: translateY(0);
  }
`;

export const shake = keyframes`
  0%,
  25%,
  83%,
  100% {
    transform: rotatez(0deg);
  }
  32.5%,
  62.5% {
    transform: rotatez(-5deg);
  }
  47.5%,
  75.5% {
    transform: rotatez(5deg);
  }
`;

export const wiggle = keyframes`
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(2deg);
  }
  50% {
    transform: rotate(-2deg);
  }
  75% {
    transform: rotate(2deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;
