import React from 'react'
import Navbar from '../navbar/Navbar'
import { BrowserRouter } from "react-router-dom";
import { ProjectProvider } from '../../state/ProjectContext';
import { ContactProvider } from '../../state/ContactContext';

const MainLayout = ({children}) => {
  return (
    <div class="bg-charcoal w-screen min-h-screen flex flex-col text-alice font-poppins font-normal">
        <ProjectProvider>
            <ContactProvider>
            <BrowserRouter>
                <Navbar />
                <div className={'mt-10 sm:mx-2 md:mx-16 lg:mx-20 xl:mx-72 2xl:mx-80 3xl:mx-96 max-w-screen'}>
                    {children}
                </div>
            </BrowserRouter>
            </ContactProvider>
        </ProjectProvider>
    </div>
  )
}

export default MainLayout
