import styled from "styled-components";
import { createContext, useContext, useState, cloneElement } from "react";
import { createPortal } from "react-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";

import useFocusTrapping from "../hooks/useFocusTrapping";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }
`;

const ModalContext = createContext();

export default function Modal({ children }) {
  const [target, setTarget] = useState("");

  function open(e, target) {
    // - ISSUE
    // -- OVERVIEW
    // when initially creating the app, there's a super strange behavior
    // caused by event propagtion (capturing, target, and bubbling phase) in
    // conjunction with React's event pooling (basically registering all
    // event handlers to the root element)
    // -- REPRODUCTION
    // when clicking Add Cabin button, modal window seems to not be opened,
    // the truth is it's opened already, but closed immediately due to the
    // invocation of close() registered to Button component, although it's
    // registered to Button component, but because of the event pooling
    // enacted by React, the two click events will happen at the same time
    // when the particular click event bubbles up to the document element.
    // the default behavior of event invocation is in target phase, and
    // bubbling phase (parent events), Jonas changed it from bubbling phase
    // to capturing phase by setting useCapture to true in order to resolve
    // the strange behavior I did it initially but soon I found out
    // e.stopPropagation() is more intuitive for me and it doesn't introduce
    //  another operation/concept, so that I chose to use e.stopPropagation
    // everywhere I need
    // - ASIDE
    // I believe if I don't use React in the first place, this behavior won't
    // happen due to the fact that none target event handler will only be
    // invoked when they are registered the target event's element's parents
    e.stopPropagation();

    setTarget(target);
  }

  function close() {
    setTarget("");
  }

  return (
    <ModalContext.Provider value={{ target, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Toggler({ children, target }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: e => open(e, target) });
}

function Window({ children, name }) {
  const { target, close } = useContext(ModalContext);
  const ref = useFocusTrapping(close, false);

  if (name !== target) return;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <XMarkIcon />
        </Button>
        {/* children below, most of the time, is a form (createCabinForm) */}
        {cloneElement(children, { onCloseModal: close })}
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Toggler = Toggler;
Modal.Window = Window;
