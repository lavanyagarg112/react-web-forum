  /**
 * `Layout` is a React component that provides a consistent layout structure for your application.
 *
 * This component includes the `MainNavigation` component as the header and wraps the main content area.
 * It helps maintain a consistent user interface across your application pages.
 *
 * Props:
 * - `children` (ReactNode): The content to be rendered within the layout. It can include any valid React elements or components.
 *
 * Returns:
 * - A layout structure with a header containing the main navigation and a main content area for rendering child components.
 *
 * @param {object} props - The props object containing `children`.
 * @returns {JSX.Element} The main layout structure for your application.
 */

import { ReactNode } from 'react';
import MainNavigation from './MainNavigation'
import classes from './Layout.module.css'

type LayoutProps = {
    children: ReactNode; // ReactNode includes anything that can be rendered: numbers, strings, elements or an array (or fragment) containing these types.
  };


const Layout = (props: LayoutProps) => {
  return (
    <div>
        <div>
            <MainNavigation />
            <main className={classes.main}>
                {props.children} 
            </main>
        </div>
      
    </div>
  )
}

export default Layout
