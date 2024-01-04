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