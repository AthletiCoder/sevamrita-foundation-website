import React, { useState, useEffect, useCallback } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Container, Button, Dropdown } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';
import HeaderNav from './HeaderNav';
import ThemeToggle from './ThemeToggle';
import {
  HEADER_ACTIONS,
  EMPTY_VISIBLE_ACTIONS,
  resolveVisibleHeaderActions,
  areVisibleActionsEqual,
  shouldAlwaysShowHeaderActions,
} from '../modules/header';
import './CSS/Header.css';

function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authView, setAuthView] = useState('login');
  const [visibleActions, setVisibleActions] = useState(EMPTY_VISIBLE_ACTIONS);

  const alwaysShowActions = shouldAlwaysShowHeaderActions(location.pathname);

  const updateHeaderActions = useCallback(() => {
    const headerEl = document.querySelector('.header');
    const headerBottom = headerEl ? headerEl.getBoundingClientRect().bottom : 96;

    const next = resolveVisibleHeaderActions({
      pathname: location.pathname,
      headerBottom,
    });

    setVisibleActions((prev) => (areVisibleActionsEqual(prev, next) ? prev : next));
  }, [location.pathname]);

  useEffect(() => {
    updateHeaderActions();

    if (alwaysShowActions) {
      return undefined;
    }

    window.addEventListener('scroll', updateHeaderActions, { passive: true });
    window.addEventListener('resize', updateHeaderActions);
    return () => {
      window.removeEventListener('scroll', updateHeaderActions);
      window.removeEventListener('resize', updateHeaderActions);
    };
  }, [updateHeaderActions, alwaysShowActions]);

  useEffect(() => {
    const handleOpenAuthModal = (event) => {
      const { view } = event.detail || {};
      if (view) {
        setAuthView(view);
      }
      setShowAuthModal(true);
    };

    window.addEventListener('openAuthModal', handleOpenAuthModal);
    return () => {
      window.removeEventListener('openAuthModal', handleOpenAuthModal);
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const pendingEventId = sessionStorage.getItem('pendingEventJoin');
      if (pendingEventId) {
        console.log('Pending event join detected:', pendingEventId);
      }
    }
  }, [isAuthenticated]);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleLinkClick = () => {
    setExpanded(false);
  };

  const handleLoginClick = () => {
    setAuthView('login');
    setShowAuthModal(true);
    setExpanded(false);
  };

  const handleRegisterClick = () => {
    setAuthView('register');
    setShowAuthModal(true);
    setExpanded(false);
  };

  const handleLogout = () => {
    logout();
    setExpanded(false);
    navigate('/');
  };

  const handleHeaderAction = (action) => {
    setExpanded(false);
    if (action === 'donate') {
      // Clear home hash so Back from donate lands at top
      if (location.pathname === '/' && location.hash) {
        navigate({ pathname: '/', hash: '' }, { replace: true });
      }
      navigate('/contribute');
    } else if (action === 'volunteer') {
      handleRegisterClick();
    } else if (action === 'events') {
      navigate('/events-calender');
    }
  };

  const getRoleBadgeClass = (role) => {
    switch (role) {
      case 'SUPERUSER':
        return 'badge bg-danger';
      case 'ADMIN':
        return 'badge bg-warning text-dark';
      case 'VOLUNTEER':
        return 'badge bg-success';
      default:
        return 'badge bg-secondary';
    }
  };

  const hasVisibleActions =
    visibleActions.donation || visibleActions.volunteer || visibleActions.events;

  return (
    <>
      <Navbar
        expand="lg"
        className={`sticky-top header ${hasVisibleActions ? 'scrolled' : ''}`}
        expanded={expanded}
        aria-label="Main navigation"
      >
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            <img
              src="/images/sevamrita-text-inline-small.png"
              width="250"
              height="80"
              className="d-inline-block align-top header-logo header-logo--light"
              alt="Sevamrita Foundation Logo"
            />
            <img
              src="/images/sevamrita-text-inline-small-dark.png"
              width="250"
              height="80"
              className="d-inline-block align-top header-logo header-logo--dark"
              alt="Sevamrita Foundation Logo"
            />
          </Navbar.Brand>
          <div className="header-mobile-controls">
            <ThemeToggle />
            <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} aria-label="Toggle navigation" />
          </div>
          <Navbar.Collapse id="basic-navbar-nav">
            <HeaderNav onNavigate={handleLinkClick} />

            <div className="header-right-cluster">
              <div className={`header-scroll-actions ${hasVisibleActions ? 'is-visible' : ''}`}>
                {HEADER_ACTIONS.map(({ key, icon, label, shortLabel, action }) => (
                  <button
                    key={key}
                    type="button"
                    className={`header-action-btn header-action-btn--${key} ${visibleActions[key] ? 'is-visible' : ''}`}
                    onClick={() => handleHeaderAction(action)}
                    aria-label={label}
                    title={label}
                    tabIndex={visibleActions[key] ? 0 : -1}
                  >
                    <i className={icon} aria-hidden="true"></i>
                    <span className="header-action-label">{shortLabel}</span>
                  </button>
                ))}
              </div>

              {isAuthenticated ? (
                <Dropdown align="end">
                  <Dropdown.Toggle variant="outline-primary" className="rounded-pill px-4 d-flex align-items-center gap-2">
                    <i className="fas fa-user-circle"></i>
                    <span>{user?.username}</span>
                    {user?.role && (
                      <span className={getRoleBadgeClass(user.role)}>
                        {user.role}
                      </span>
                    )}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item as={NavLink} to="/dashboard" onClick={handleLinkClick}>
                      <i className="fas fa-tachometer-alt me-2"></i>
                      Dashboard
                    </Dropdown.Item>
                    <Dropdown.Item as={NavLink} to="/profile" onClick={handleLinkClick}>
                      <i className="fas fa-user me-2"></i>
                      Profile
                    </Dropdown.Item>
                    {(user?.role === 'ADMIN' || user?.role === 'SUPERUSER') && (
                      <>
                        <Dropdown.Divider />
                        <Dropdown.Item as={NavLink} to="/admin/users" onClick={handleLinkClick}>
                          <i className="fas fa-users-cog me-2"></i>
                          Manage Users
                        </Dropdown.Item>
                        <Dropdown.Item as={NavLink} to="/admin/events" onClick={handleLinkClick}>
                          <i className="fas fa-calendar-plus me-2"></i>
                          Manage Events
                        </Dropdown.Item>
                        <Dropdown.Item as={NavLink} to="/admin/organizations" onClick={handleLinkClick}>
                          <i className="fas fa-building me-2"></i>
                          Organization Management
                        </Dropdown.Item>
                      </>
                    )}
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout} className="text-danger">
                      <i className="fas fa-sign-out-alt me-2"></i>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Button
                  variant="outline-primary"
                  className="header-login-btn rounded-pill px-4"
                  onClick={handleLoginClick}
                >
                  Log in
                </Button>
              )}

              <ThemeToggle className="theme-toggle-btn--desktop" />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <AuthModal
        show={showAuthModal}
        onHide={() => setShowAuthModal(false)}
        initialView={authView}
      />
    </>
  );
}

export default Header;
