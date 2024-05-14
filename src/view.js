document.addEventListener('DOMContentLoaded', function() {
  const hamburgerButton = document.querySelector('.hamburger-button');
  const sidebarCloseButton = document.querySelector('.sidebar-close-button')
  const menuContent = document.querySelector('.menu-sidebar'); // Ensure this matches the HTML
  const overlay = document.createElement('div');
  overlay.className = 'overlay';

  // Append overlay only if menuContent exists
  if (menuContent) {
      document.body.appendChild(overlay);

      if (hamburgerButton) {
          hamburgerButton.addEventListener('click', () => {
              menuContent.classList.toggle('open');
              overlay.classList.toggle('open');
          });
      }

      if(sidebarCloseButton) {
        sidebarCloseButton.addEventListener('click', () => {
          menuContent.classList.remove('open');
          overlay.classList.remove('open');
        })
      }

      overlay.addEventListener('click', () => {
          menuContent.classList.remove('open');
          overlay.classList.remove('open');
      });
  } else {
      console.error('Menu content not found!');
  }
});
