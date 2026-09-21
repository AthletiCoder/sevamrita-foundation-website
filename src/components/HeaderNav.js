import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { NAV_ITEMS } from '../modules/header';
import { scrollToHash } from '../utils/scrollToHash';

function NavGlyph({ icon }) {
  if (!icon) {
    return null;
  }
  return <i className={`${icon} header-nav-icon`} aria-hidden="true" />;
}

function NavLabel({ icon, label }) {
  return (
    <span className="header-nav-label">
      <NavGlyph icon={icon} />
      <span>{label}</span>
    </span>
  );
}

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
  /* After choosing a dropdown item, force-close until the pointer leaves/re-enters */
  const [closedDropdownKey, setClosedDropdownKey] = useState(null);

  const closeDropdown = (itemKey, target) => {
    setClosedDropdownKey(itemKey);
    if (target instanceof HTMLElement) {
      target.blur();
    }
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const handleNavClick = (event, path, itemKey) => {
    onNavigate?.();
    closeDropdown(itemKey, event.currentTarget);

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
    closeDropdown(item.key, event.currentTarget);

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

  const renderChild = (child, itemKey) => {
    if (child.children?.length) {
      return (
        <div key={child.key} className="header-nav-subitem">
          {child.path ? (
            <Link
              to={child.path}
              className="dropdown-item header-nav-subitem-link"
              onClick={(event) => handleNavClick(event, child.path, itemKey)}
            >
              <NavLabel icon={child.icon} label={child.label} />
              <i className="fas fa-chevron-right header-nav-subcaret" aria-hidden="true" />
            </Link>
          ) : (
            <span className="dropdown-item header-nav-subitem-link" aria-disabled="true">
              <NavLabel icon={child.icon} label={child.label} />
              <i className="fas fa-chevron-right header-nav-subcaret" aria-hidden="true" />
            </span>
          )}
          <div className="dropdown-menu header-nav-submenu">
            {child.children.map((nested) => renderChild(nested, itemKey))}
          </div>
        </div>
      );
    }

    if (!child.path) {
      return (
        <span key={child.key} className="dropdown-item header-nav-placeholder" aria-disabled="true">
          <NavLabel icon={child.icon} label={child.label} />
        </span>
      );
    }

    return (
      <Link
        key={child.key}
        to={child.path}
        className="dropdown-item"
        onClick={(event) => handleNavClick(event, child.path, itemKey)}
      >
        <NavLabel icon={child.icon} label={child.label} />
      </Link>
    );
  };

  return (
    <Nav className="me-auto">
      {NAV_ITEMS.filter((item) => !item.hidden).map((item) => (
        <Nav.Item
          key={item.key}
          className={`header-nav-item ${item.children ? 'has-dropdown' : ''}${
            closedDropdownKey === item.key ? ' is-dropdown-closed' : ''
          }`}
          onMouseEnter={() => {
            if (closedDropdownKey === item.key) {
              setClosedDropdownKey(null);
            }
          }}
          onMouseLeave={() => {
            if (closedDropdownKey === item.key) {
              setClosedDropdownKey(null);
            }
          }}
        >
          {item.path ? (
            <Nav.Link
              href={item.path}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              onClick={(event) => handleParentClick(event, item)}
            >
              <NavLabel icon={item.icon} label={item.label} />
              {item.children && <i className="fas fa-chevron-down header-nav-caret" aria-hidden="true"></i>}
            </Nav.Link>
          ) : (
            <Nav.Link as="button" type="button" className="header-nav-static">
              <NavLabel icon={item.icon} label={item.label} />
              {item.children && <i className="fas fa-chevron-down header-nav-caret" aria-hidden="true"></i>}
            </Nav.Link>
          )}

          {item.children && (
            <div className="dropdown-menu header-nav-menu">
              {item.children.map((child) => renderChild(child, item.key))}
            </div>
          )}
        </Nav.Item>
      ))}
    </Nav>
  );
}

export default HeaderNav;
