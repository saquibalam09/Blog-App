  import React from 'react'
  import {Container , Logo, LogoutBtn} from '../index'
  import { Link } from 'react-router-dom';
  import { UseSelector, useSelector } from 'react-redux';
  import { useNavigate } from 'react-router-dom';

  function Header() {
    const authService = useSelector((state) => state.auth.status)

    const navigate = useNavigate();

    

    return (
      <div>Header</div>
    )
        
  }
  
  export default Header;
  