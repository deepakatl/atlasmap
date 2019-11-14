import { useCanvas } from '@src';
import React, {
  forwardRef,
  PropsWithChildren,
  ReactElement,
  HTMLAttributes,
} from 'react';
import { css, StyleSheet } from '@patternfly/react-styles';

const styles = StyleSheet.create({
  outer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexFlow: 'column',
    padding: '1rem',
    userSelect: 'none'
  },
  header: {
    flex: '0 1 0',
    paddingBottom: '0.5rem',
  },
  body: {
    flex: '0 0 1',
    display: 'flex',
    flexFlow: 'column',
    height: '100%',
  },
  bodyRightAligned: {
    transform: 'scaleX(-1)'
  },
  footer: {
    flex: '0 1 0',
    padding: '0.3rem 1rem',
    textAlign: 'right',
  },
});

export interface IBoxProps extends HTMLAttributes<HTMLDivElement> {
  header?: ReactElement | string;
  footer?: ReactElement | string;
  onLayout?: () => void;
  rightAlign?: boolean;
}

/**
 * `Box` sample doc
 */
export const Box = forwardRef<HTMLDivElement, PropsWithChildren<IBoxProps>>(
  ({ header, footer, children, onLayout, rightAlign = false, ...props }, ref) => {
    const { redraw } = useCanvas();
    return (
      <div className={css(styles.outer)}>
        <div className={css(styles.header)}>{header}</div>
        <div
          className={css(styles.body, rightAlign && styles.bodyRightAligned)}
          ref={ref}
          onWheel={redraw}
          onScroll={redraw}
          {...props}
        >
          {children}
        </div>
        <div className={css(styles.footer)}>{footer}</div>
      </div>
    );
  }
);