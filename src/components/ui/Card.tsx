
/**
 * `Card` is a React component that represents a card-like container to wrap and style its children elements.
 *
 * Props:
 * - `children` (ReactNode): The content or elements to be displayed inside the card.
 *
 * @param {ReactNode} children - The content or elements to be displayed inside the card.
 * @returns {JSX.Element} A card container with styled children elements.
 */

import classes from './Card.module.css';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode; // ReactNode includes anything that can be rendered: numbers, strings, elements or an array (or fragment) containing these types.
  };

const Card = (props: Props) => {

    return (
        <div className={classes.card}>
            {props.children}
        </div>
    )

}

export default Card;