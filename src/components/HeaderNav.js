import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { NAV_ITEMS } from '../modules/header';
import { scrollToHash } from '../utils/scrollToHash';

function parseNavPath(path) {
  if (!path) {
    return { pathname: null, hash: '' };
  }
  const [pathname, hashPart] = path.split('#');
  return {
    pathname: pathname || '/',
    hash: hashPart ? `#${hashPart}` : '',
  };
}

/**
 * Main navbar links. Items with children show a dropdown on hover (desktop)
 * and render their children inline inside the collapsed mobile menu.
 * Clicking a parent with a path navigates to it ("Who we are" -> home).
 * Hash paths (e.g. /whatwedo#shikshamrita) scroll to the matching section.
 */
function HeaderNav({ onNavigate }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (event, path) => {
    onNavigate?.();

    const { pathname, hash } = parseNavPath(path);
    if (!hash) {
      return;
    }

    // Ensure hash scroll works when already on the same pathname
    event.preventDefault();
    if (location.pathname === pathname && location.hash === hash) {
      scrollToHash(hash);
      return;
    }

    navigate({ pathname, hash });
  };

  // Top-level items navigate imperatively so they never show the router "active" highlight
  const handleParentClick = (event, item) => {
    event.preventDefault();
    onNavigate?.();

    if (item.external) {
      window.open(item.path, '_blank', 'noopener,noreferrer');
      return;
    }

    const { pathname, hash } = parseNavPath(item.path);
    if (hash) {
      if (location.pathname === pathname && location.hash === hash) {
        scrollToHash(hash);
      } else {
        navigate({ pathname, hash });
      }
      return;
    }

    navigate(pathname);
    if (location.pathname === pathname) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  };

  const renderChild = (child) => {
    if (!child.path) {
      return (
        <span key={child.key} className="dropdown-item header-nav-placeholder" aria-disabled="true">
          {child.label}
        </span>
      );
    }

    return (
      <Link
        key={child.key}
        to={child.path}
        className="dropdown-item"
        onClick={(event) => handleNavClick(event, child.path)}
      >
        {child.label}
      </Link>
    );
  };

  return (
    <Nav className="me-auto">
      {NAV_ITEMS.filter((item) => !item.hidden).map((item) => (
        <Nav.Item key={item.key} className={`header-nav-item ${item.children ? 'has-dropdown' : ''}`}>
          {item.path ? (
            <Nav.Link
              href={item.path}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              onClick={(event) => handleParentClick(event, item)}
            >
              {item.label}
              {item.children && <i className="fas fa-chevron-down header-nav-caret" aria-hidden="true"></i>}
            </Nav.Link>
          ) : (
            <Nav.Link as="button" type="button" className="header-nav-static">
              {item.label}
              {item.children && <i className="fas fa-chevron-down header-nav-caret" aria-hidden="true"></i>}
            </Nav.Link>
          )}

          {item.children && (
            <div className="dropdown-menu header-nav-menu">
              {item.children.map(renderChild)}
            </div>
          )}
        </Nav.Item>
      ))}
    </Nav>
  );
}

export default HeaderNav;
