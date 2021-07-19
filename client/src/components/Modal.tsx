import { IconButton, Modal as MatModal } from '@material-ui/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { slideUp, wiggle } from './shared/animations/keyframes';
import CloseIcon from '@material-ui/icons/Close';

type Props = {
  width?: number;
  open: boolean;
  allowCommonExitStrategies?: boolean;
  children: any;
  onClose: () => void;
};

export const Modal = ({
  width,
  open,
  allowCommonExitStrategies,
  children,
  onClose,
}: Props) => {
  const [wiggle, setWiggle] = useState<boolean>(false);

  const modal = useRef<HTMLDivElement>(null);

  const handleKeyUp = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        if (allowCommonExitStrategies) {
          event.preventDefault();
          onClose();
        } else {
          onWiggle();
        }
      }
    },
    [allowCommonExitStrategies, onClose]
  );

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp, false);

    return () => {
      window.removeEventListener('keyup', handleKeyUp, false);
    };
  }, [handleKeyUp]);

  const handleOutsideClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = event.target as Node;
    if (
      !modal.current?.contains(target) &&
      !(target instanceof HTMLLIElement)
    ) {
      if (allowCommonExitStrategies) {
        onClose();
      } else {
        onWiggle();
      }
    }
  };

  const onWiggle = () => {
    setWiggle(true);
    setTimeout(() => setWiggle(false), 400);
  };

  return (
    <MatModal
      open={open}
      className="flex"
      onMouseDown={(event) => handleOutsideClick(event)}
    >
      <ModalWrapper
        ref={modal}
        className={wiggle ? 'wiggle' : ''}
        style={{
          maxWidth: width,
        }}
      >
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
        <ModalBody>{children}</ModalBody>
      </ModalWrapper>
    </MatModal>
  );
};

Modal.defaultProps = {
  width: 620,
  allowCommonExitStrategies: true,
};

const ModalWrapper = styled.div`
  background-color: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 100vw;
  max-height: 90%;
  width: 100%;
  margin: auto;
  overflow: hidden;
  border-radius: 8px;
  animation: ${slideUp} 300ms ease-out;

  &.wiggle {
    animation: ${slideUp} 300ms ease-out, ${wiggle} 400ms ease-out;
  }
`;

export const ModalHeader = styled.section`
  padding: 48px 48px 32px;
  border-bottom: 1px solid var(--primary-color20);
`;

export const ModalBody = styled.section`
  display: flex;
  flex-direction: column;
  overflow: auto;

  padding: 48px;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ModalFooter = styled.footer`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 48px;
`;

const CloseButton = styled(IconButton)`
  &&& {
    position: absolute;
    right: 1rem;
    top: 1xprem;
    z-index: 500;
  }
`;
