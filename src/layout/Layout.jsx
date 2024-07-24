import React from 'react'
import Header from '../components/Header/Header'
import './layout.css'; // CSS dosyasını import edelim

const Layout = ({children}) => {
  return (
    <div className="layout-container">
      <Header />
      <div className="content-container">
        {children}
      </div>
    </div>
  )
}

export default Layout;
