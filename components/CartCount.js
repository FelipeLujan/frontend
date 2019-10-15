import React from 'react';
import styled from 'styled-components';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const AnimationStyles = styled.span`
  position: relative;
  * {
    display: block;
    position: relative;
    transition: transform 350ms;
    backface-visibility: hidden;
  }
  .enter {
    transform: rotateX(0.5turn) scaleX(4);
  }
  .enter-active {
    transform: rotateX(0 turn) scaleX(4);
  }
  .enter-done {
  }

  .exit {
    position: absolute;
    top: 0;
    transform: rotateX(0);
  }
  .exit-active {
    transform: rotateX(0.5turn) scaleX(4);
  }
`;

const Dot = styled.div`
  background: ${props => props.theme.red};
  color: white;
  border-radius: 50%;
  padding: 0.5rem;
  line-height: 2rem;
  max-width: 3rem;
  font-weight: 100;
  margin-left: 1rem;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
`;

const CartCount = ({ count }) => {
  return (
    <AnimationStyles>
      <TransitionGroup>
        <CSSTransition
          unmountOnExit
          classname="count"
          classnames="count"
          key={count}
          timeout={{ enter: 400, exit: 400 }}
        >
          <Dot>{count}</Dot>
        </CSSTransition>
      </TransitionGroup>
    </AnimationStyles>
  );
};

CartCount.propTypes = {};

export default CartCount;
