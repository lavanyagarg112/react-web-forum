import React, { ReactNode } from 'react';
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
